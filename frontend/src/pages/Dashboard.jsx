import { useState, useEffect } from 'react'
import '../styles/global.css'

function Dashboard() {
    const [atendimentos, setAtendimentos] = useState([])
    const [metricas, setMetricas] = useState({ pendentes: 0, observacao: 0, concluidos: 0 })

    useEffect(() => {
        async function buscarDadosDaAPI() {
            try {
                const token = localStorage.getItem('token')
                const resposta = await fetch('http://localhost:3000/buscarAtendimentos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                })
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

    function obterClasseStatus(status) {
        if (status === 'Em Observação') return 'observacao';
        if (status === 'Concluído') return 'concluido';
        return 'pendente';
    }

    function montarLinhasDaTabela() {
        if (atendimentos.length === 0) {
            return (
                <tr>
                    <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                        Nenhum atendimento na fila.
                    </td>
                </tr>
            )
        }

        return atendimentos.map(paciente => {
            const statusAtual = paciente.status || 'Pendente'
            const classeStatus = obterClasseStatus(statusAtual)

            return (
                <tr key={paciente.id}>
                    <td>{paciente.matricula || 'Sem matrícula'}</td>
                    <td>
                        <span className={`badge badge-${classeStatus}`}>
                            {statusAtual}
                        </span>
                    </td>
                </tr>
            )
        })
    }

    return (
        <main className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Painel do Ambulatório</h1>
                    <p>Controle geral de atendimentos, triagens e funcionários.</p>
                </div>
            </header>

            <div className="cards-row">
                <div className="card">
                    <h3>Pendentes</h3>
                    <div className="numero">{metricas.pendentes}</div>
                </div>
                <div className="card">
                    <h3>Em Observação</h3>
                    <div className="numero">{metricas.observacao}</div>
                </div>
                <div className="card">
                    <h3>Concluídos</h3>
                    <div className="numero">{metricas.concluidos}</div>
                </div>
            </div>

            <section className="lista-section">
                <h2>Fila de Atendimento Atual</h2>
                <table className="tabela-projetos">
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