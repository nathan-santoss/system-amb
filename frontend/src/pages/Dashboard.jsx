import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function Dashboard() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [metricas, setMetricas] = useState({
        pendentes: 0,
        observacao: 0,
        concluidos: 0
    });

    const [abaAtiva, setAbaAtiva] = useState('atendimentos');

    const navegar = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navegar('/');
            return;
        }

        async function buscarAtendimentos() {
            try {
                const resposta = await fetch('http://localhost:3000/buscarAtendimentos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    }
                });

                if (resposta.status === 401 || resposta.status === 403) {
                    localStorage.removeItem('token');
                    navegar('/');
                    return;
                }

                const dados = await resposta.json();

                if (Array.isArray(dados)) {
                    setAtendimentos(dados);

                    setMetricas({
                        pendentes: dados.filter(a => a.status === 'Pendente').length,
                        observacao: dados.filter(a => a.status === 'Em Observação').length,
                        concluidos: dados.filter(a => a.status === 'Concluído').length
                    });
                }

            } catch (erro) {
                console.error('Erro ao buscar dados:', erro);
            }
        }

        buscarAtendimentos();

    }, [navegar]);

    function handleLogout() {
        localStorage.removeItem('token');
        navegar('/');
    }

    function obterClasseStatus(status) {
        if (status === 'Em Observação') {
            return 'observacao';
        }

        if (status === 'Concluído') {
            return 'concluido';
        }

        return 'pendente';
    }

    function formatarTitulo(texto) {
        if (!texto) {
            return '';
        }

        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }

    function obterClasseBotao(nomeAba) {
        if (abaAtiva === nomeAba) {
            return 'active';
        }

        return '';
    }

    let conteudo;

    if (abaAtiva === 'atendimentos') {
        conteudo = (
            <React.Fragment>
                <div className="cards-row">
                    <div className="card card-blue">
                        <h3>Pendentes</h3>
                        <div className="numero">{metricas.pendentes}</div>
                    </div>

                    <div className="card card-red">
                        <h3>Em Observação</h3>
                        <div className="numero">{metricas.observacao}</div>
                    </div>

                    <div className="card card-white">
                        <h3>Concluídos</h3>
                        <div className="numero">{metricas.concluidos}</div>
                    </div>
                </div>

                <section className="lista-section">
                    <div className="lista-header">
                        <h2>Fila de Atendimento</h2>
                        <button className="btn-primary">
                            + Nova Triagem
                        </button>
                    </div>

                    <table className="tabela-projetos">
                        <thead>
                            <tr>
                                <th>Matrícula</th>
                                <th>Status Atual</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {atendimentos.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="3"
                                        style={{
                                            textAlign: 'center',
                                            padding: '20px'
                                        }}
                                    >
                                        Nenhum atendimento na fila.
                                    </td>
                                </tr>
                            )}

                            {atendimentos.length > 0 &&
                                atendimentos.map((paciente) => {

                                    let matricula = paciente.matricula;

                                    if (!matricula) {
                                        matricula = 'Sem matrícula';
                                    }

                                    let status = paciente.status;

                                    if (!status) {
                                        status = 'Pendente';
                                    }

                                    return (
                                        <tr key={paciente.id}>
                                            <td>{matricula}</td>

                                            <td>
                                                <span
                                                    className={`badge badge-${obterClasseStatus(status)}`}
                                                >
                                                    {status}
                                                </span>
                                            </td>

                                            <td>
                                                <button className="btn-action">
                                                    Abrir Ficha
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </section>
            </React.Fragment>
        );
    } else {
        conteudo = (
            <section className="lista-section">
                <h2>Gestão de {formatarTitulo(abaAtiva)}</h2>

                <p>
                    O layout para consumir a rota
                    <strong> /{abaAtiva}</strong>
                    do back-end será renderizado aqui.
                </p>
            </section>
        );
    }

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <h2>Ambulatório</h2>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={obterClasseBotao('atendimentos')}
                        onClick={() => setAbaAtiva('atendimentos')}
                    >
                        🩺 Atendimentos
                    </button>

                    <button
                        className={obterClasseBotao('funcionarios')}
                        onClick={() => setAbaAtiva('funcionarios')}
                    >
                        👥 Funcionários
                    </button>

                    <button
                        className={obterClasseBotao('alergias')}
                        onClick={() => setAbaAtiva('alergias')}
                    >
                        ⚠️ Alergias
                    </button>

                    <button
                        className={obterClasseBotao('atestados')}
                        onClick={() => setAbaAtiva('atestados')}
                    >
                        📄 Atestados
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button
                        className="btn-sair"
                        onClick={handleLogout}
                    >
                        Sair do Sistema
                    </button>
                </div>
            </aside>

            <main className="dashboard-content">
                <header className="topbar">
                    <h1>Módulo: {formatarTitulo(abaAtiva)}</h1>
                </header>

                {conteudo}
            </main>
        </div>
    );
}

export default Dashboard;