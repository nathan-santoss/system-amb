import { useState, useEffect } from 'react'
import CardsStatus from '../components/CardsStatus.jsx'
import '../styles/global.css'

function Dashboard() {
    const [atendimentos, setAtendimentos] = useState([])
    const [metricas, setMetricas] = useState({ pendentes: 0, observacao: 0, concluidos: 0 })

    useEffect(() => {
        async function buscarDadosDaAPI() {
            try {
                const resposta = await fetch('http://localhost:3000/buscarAtendimentos')
                const dadosQueVieramDoBanco = await resposta.json()

                setAtendimentos(dadosQueVieramDoBanco)

                setMetricas({
                    pendentes: dadosQueVieramDoBanco.filter(a => a.status === 'Pendente').length,
                    observacao: dadosQueVieramDoBanco.filter(a => a.status === 'Em Observação').length,
                    concluidos: dadosQueVieramDoBanco.filter(a => a.status === 'Concluído').length
                })
            } catch (erro) {
                console.error("Ocorreu um erro ao comunicar com o Backend:", erro)
            }
        }
        buscarDadosDaAPI()
    }, [])

    function montarLinhasDaTabela() {
        if (atendimentos.length === 0) {
            return (
                <tr>
                    <td colSpan="2">Nenhum atendimento na fila.</td>
                </tr>
            )
        }

        return atendimentos.map(paciente => {
            // Converte status para classe CSS (ex: "Em Observação" vira "badge-em-observacao")
            const statusClass = paciente.status.toLowerCase().replace(' ', '-')

            return (
                <tr key={paciente.id}>
                    <td>{paciente.matricula || 'Sem matrícula'}</td>
                    <td>
                        <span className={`badge badge-${statusClass}`}>
                            {paciente.status}
                        </span>
                    </td>
                </tr>
            )
        })
    }

    return (
        <main className="dashboard-container">
            <header className="header-dashboard">
                <div>
                    <h1>Painel do Ambulatório</h1>
                    <p>Controle geral de atendimentos, triagens e funcionários.</p>
                </div>
            </header>

            <CardsStatus
                pendentes={metricas.pendentes}
                observacao={metricas.observacao}
                concluidos={metricas.concluidos}
            />

            <section className="card">
                <h2>Fila de Atendimento Atual</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {montarLinhasDaTabela()}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Dashboard