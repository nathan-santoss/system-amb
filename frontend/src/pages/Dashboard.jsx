import { useState, useEffect } from 'react'
import CardsStatus from '../components/CardsStatus'

function Dashboard() {
    const [atendimentos, setAtendimentos] = useState([])
    const [metricas, setMetricas] = useState({ pendentes: 0, observacao: 0, concluidos: 0 })

    useEffect(() => {
        async function buscarDadosDaAPI() {
            try {
                const resposta = await fetch('http://localhost:3000/atendimentos')
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
            let matricula = paciente.matricula

            if (!matricula) {
                matricula = 'Sem matrícula'
            }

            return (
                <tr key={paciente.id}>
                    <td>{matricula}</td>
                    <td>{paciente.status}</td>
                </tr>
            )
        })
    }

    return (
        <main className="conteudo-principal">
            <section className="secao-apresentacao">
                <h2>Painel do Ambulatório</h2>
                <p>Controle geral de atendimentos, triagens e funcionários.</p>
            </section>

            <CardsStatus
                pendentes={metricas.pendentes}
                observacao={metricas.observacao}
                concluidos={metricas.concluidos}
            />

            <section className="secao-atendimentos-recentes">
                <h2>Fila de Atendimento Atual</h2>

                <div className="tabela-container">
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
                </div>
            </section>
        </main>
    )
}

export default Dashboard