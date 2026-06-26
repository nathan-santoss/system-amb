import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'

function ConsultarPaciente() {
    const navigate = useNavigate()
    const [pesquisa, setPesquisa] = useState('')
    const [pacientes, setPacientes] = useState([])
    const [carregando, setCarregando] = useState(false)

    const buscarPacientes = async () => {
        setCarregando(true)
        try {
            const token = localStorage.getItem('token')
            const url = pesquisa
                ? `http://localhost:3000/api/funcionarios?busca=${pesquisa}`
                : 'http://localhost:3000/api/funcionarios'
            const resposta = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (resposta.ok) {
                const dados = await resposta.json()
                setPacientes(dados)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarPacientes()
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-azulEscuro">Consultar Funcionários</h1>
                        <p className="text-gray-500 mt-1">Busque pacientes por nome ou matrícula</p>
                    </div>
                </div>
                <div className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <input
                        type="text"
                        placeholder="Digite o nome ou matrícula..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-azulEscuro focus:border-transparent text-cinzaTexto"
                    />
                    <button
                        onClick={buscarPacientes}
                        className="bg-azulEscuro text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition shadow-sm"
                    >
                        Pesquisar
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {carregando ? (
                        <div className="p-8 text-center text-gray-500 font-medium">Buscando informações...</div>
                    ) : pacientes.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 font-medium">Nenhum funcionário cadastrado ou encontrado.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Matrícula</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Nome completo</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Cargo / Função</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Setor</th>
                                        <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pacientes.map((paciente) => (
                                        <tr key={paciente.matricula} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 text-sm font-semibold text-azulEscuro">{paciente.matricula}</td>
                                            <td className="px-6 py-4 text-sm text-cinzaTexto font-medium">{paciente.nome}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{paciente.cargo}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{paciente.setor}</td>
                                            <td className="px-6 py-4 text-sm text-right">
                                                <button
                                                    onClick={() => navigate(`/ficha-paciente/${paciente.matricula}`)}
                                                    className="bg-blue-50 text-azulEscuro font-semibold px-4 py-2 rounded-lg hover:bg-azulEscuro hover:text-white transition"
                                                >
                                                    Abrir Prontuário
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ConsultarPaciente