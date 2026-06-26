import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { Activity, Plus, MousePointerClick, HeartPulse, ClipboardList, UserCheck, CalendarCheck, ListVideo, BarChart3, Clock, Gauge, Thermometer, X } from 'lucide-react';

export default function Dashboard() {
    const [isObservationModalOpen, setIsObservationModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Efeito para verificar autenticação e carregar dados
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/'); // Se não houver token, volta para o Login
            return;
        }

        async function verificarAcesso() {
            try {
                // Aqui você pode fazer a chamada para buscar seus dados ou apenas validar o token
                const resposta = await fetch('http://localhost:3000/auth/validar', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (resposta.ok) {
                    setLoading(false); // Tudo certo, libera a renderização
                } else {
                    localStorage.removeItem('token');
                    navigate('/'); // Token inválido, força login
                }
            } catch (erro) {
                console.error("Erro na validação:", erro);
                navigate('/');
            }
        }

        verificarAcesso();
    }, [navigate]);

    if (loading) {
        return <div className="p-10 text-center">Carregando painel...</div>;
    }

    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-slate-800">Ambulatório Ativo</h1>
                <p className="text-slate-600 mb-6">O monitoramento clínico está a correr. Inicie um novo atendimento rapidamente.</p>

                <button
                    onClick={() => navigate('/consultar-paciente')}
                    className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 transform hover:scale-105"
                >
                    <Plus size={20} />
                    Nova Triagem Rápida
                </button>

                {isObservationModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h2 className="text-lg font-bold">Pacientes em Observação</h2>
                            <button onClick={() => setIsObservationModalOpen(false)} className="text-slate-400 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}