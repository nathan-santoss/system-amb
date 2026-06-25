import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { ArrowLeft, Activity, AlertCircle, Save, Plus } from 'lucide-react';

export default function FichaPaciente() {
    const { matricula } = useParams();
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [triagem, setTriagem] = useState({
        pressao: '',
        temperatura: '',
        queixa: ''
    });
    useEffect(() => {
        async function buscarDetalhes() {
            try {
                const token = localStorage.getItem('token');
                const resposta = await fetch(`http://localhost:3000/funcionarios/${matricula}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (resposta.ok) {
                    const dados = await resposta.json();
                    setPaciente(dados);
                }
            } catch (erro) {
                console.error("Erro ao buscar detalhes do paciente:", erro);
            } finally {
                setCarregando(false);
            }
        }
        buscarDetalhes();
    }, [matricula]);

    function handleChange(e) {
        const { name, value } = e.target;
        setTriagem(prev => ({ ...prev, [name]: value }));
    }
    if (carregando) {
        return (
            <DashboardLayout titulo="Prontuário Médico" subtitulo="A aceder à base Nexa Logos...">
                <div className="flex items-center justify-center h-full p-12">
                    <div className="w-8 h-8 border-4 border-azulEscuro border-t-transparent rounded-full animate-spin"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!paciente) {
        return (
            <DashboardLayout titulo="Erro" subtitulo="Paciente não localizado">
                <div className="p-8">
                    <p className="text-red-500 font-medium">Não foi possível carregar os dados deste funcionário.</p>
                    <button
                        onClick={() => navigate('/consultar-paciente')}
                        className="mt-4 text-azulEscuro underline font-bold text-sm"
                    >
                        Voltar para a busca
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout titulo="Prontuário Médico" subtitulo={`Atendimento de ${paciente.nome}`}>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate('/consultar-paciente')}
                        className="flex items-center gap-2 text-slate-500 hover:text-azulEscuro transition-colors font-bold text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para Consulta
                    </button>
                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-sm font-bold text-slate-700">
                        Matrícula: <span className="font-mono text-azulEscuro">{paciente.matricula}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-azulEscuro" />
                                <h3 className="font-bold text-slate-700">Nova Triagem / Atendimento</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Pressão Arterial (mmHg)</label>
                                        <input
                                            type="text"
                                            name="pressao"
                                            value={triagem.pressao}
                                            onChange={handleChange}
                                            placeholder="120/80"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-azulEscuro focus:ring-2 focus:ring-azulEscuro/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Temperatura (°C)</label>
                                        <input
                                            type="number"
                                            name="temperatura"
                                            value={triagem.temperatura}
                                            onChange={handleChange}
                                            placeholder="36.5"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-azulEscuro focus:ring-2 focus:ring-azulEscuro/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Queixa Principal / Observações</label>
                                    <textarea
                                        rows="4"
                                        name="queixa"
                                        value={triagem.queixa}
                                        onChange={handleChange}
                                        placeholder="Descreva detalhadamente os sintomas relatados pelo paciente..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-azulEscuro focus:ring-2 focus:ring-azulEscuro/20 transition-all resize-none"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end pt-2">
                                    <button className="bg-azulEscuro hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-900/10 transition-all flex items-center gap-2">
                                        <Save className="w-4 h-4" />
                                        Registrar Atendimento
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                            <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                    <h3 className="font-bold text-slate-700 text-sm">Alergias Conhecidas</h3>
                                </div>
                                <button className="text-red-600 hover:bg-red-100 p-1 rounded transition-colors" title="Adicionar Alergia">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-400 italic text-center py-4">Nenhuma alergia registada até ao momento.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}