import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'

function FichaPaciente() {
    const { matricula } = useParams()
    const navigate = useNavigate()
    const [paciente, setPaciente] = useState(null)
    const [pressao, setPressao] = useState('')
    const [temperatura, setTemperatura] = useState('')
    const [queixa, setQueixa] = useState('')

    useEffect(() => {
        const carregarPaciente = async () => {
            try {
                const token = localStorage.getItem('token')
                const resposta = await fetch(`http://localhost:3000/api/funcionarios/${matricula}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (resposta.ok) {
                    const dados = await resposta.json()
                    setPaciente(dados)
                }
            } catch (err) {
                console.error(err)
            }
        }
        carregarPaciente()
    }, [matricula])

    const salvarTriagem = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const resposta = await fetch('http://localhost:3000/api/atendimentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ funcionario_matricula: matricula, pressao, temperatura, queixa })
            })
            if (resposta.ok) {
                navigate('/consultar-paciente')
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (!paciente) {
        return (
            <DashboardLayout>
                <div className="text-center p-8 text-gray-500 font-medium">Buscando ficha médica...</div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-azulEscuro">Ficha de Triagem</h1>
                    <p className="text-gray-500 mt-1">Prontuário de atendimento de emergência</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Paciente</span>
                        <span className="text-base font-semibold text-cinzaTexto">{paciente.nome}</span>
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Matrícula</span>
                        <span className="text-base font-semibold text-azulEscuro">{paciente.matricula}</span>
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Cargo</span>
                        <span className="text-base font-semibold text-gray-600">{paciente.cargo}</span>
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Setor</span>
                        <span className="text-base font-semibold text-gray-600">{paciente.setor}</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <form onSubmit={salvarTriagem} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-cinzaTexto mb-2">Sinais Vitais: Pressão Arterial (PA)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: 120/80"
                                    value={pressao}
                                    onChange={(e) => setPressao(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-cinzaTexto focus:outline-none focus:ring-2 focus:ring-azulEscuro focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-cinzaTexto mb-2">Sinais Vitais: Temperatura (°C)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: 36.5"
                                    value={temperatura}
                                    onChange={(e) => setTemperatura(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-cinzaTexto focus:outline-none focus:ring-2 focus:ring-azulEscuro focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-cinzaTexto mb-2">Queixa Principal / Sintomas</label>
                            <textarea
                                required
                                rows="4"
                                value={queixa}
                                onChange={(e) => setQueixa(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-cinzaTexto focus:outline-none focus:ring-2 focus:ring-azulEscuro focus:border-transparent resize-none"
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/consultar-paciente')}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-azulEscuro text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition shadow-sm"
                            >
                                Concluir Triagem
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default FichaPaciente