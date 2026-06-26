import { useState, useEffect } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

function Dashboard() {
    const [dados, setDados] = useState({ totalAtendimentos: 0, emObservacao: 0, altasHoje: 0 })

    useEffect(() => {
        const carregarIndicadores = async () => {
            try {
                const token = localStorage.getItem('token')
                const resposta = await fetch('http://localhost:3000/api/atendimentos/indicadores', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (resposta.ok) {
                    const resultado = await resposta.json()
                    setDados(resultado)
                }
            } catch (err) {
                console.error(err)
            }
        }
        carregarIndicadores()
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-azulEscuro">Painel de Atendimentos</h1>
                    <p className="text-gray-500 mt-1">Visão geral do ambulatório em tempo real</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Atendimentos Hoje</span>
                        <span className="text-4xl font-extrabold text-azulEscuro mt-4">{dados.totalAtendimentos}</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Em Observação</span>
                        <span className="text-4xl font-extrabold text-vermelhoAlerta mt-4">{dados.emObservacao}</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Altas Concedidas</span>
                        <span className="text-4xl font-extrabold text-green-600 mt-4">{dados.altasHoje}</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard