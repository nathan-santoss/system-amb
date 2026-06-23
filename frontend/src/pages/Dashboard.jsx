import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import ModalTriagem from '../components/dashboard/ModalTriagem';
import ModalFuncionario from '../components/dashboard/ModalFuncionario';
import '../styles/global.css';

function Dashboard() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [metricas, setMetricas] = useState({ pendentes: 0, observacao: 0, concluidos: 0 });
    const [abaAtiva, setAbaAtiva] = useState('atendimentos');

    // Controles de visibilidade dos modais
    const [modalTriagemAberto, setModalTriagemAberto] = useState(false);
    const [modalFuncionarioAberto, setModalFuncionarioAberto] = useState(false);

    // Dados dos formulários
    const [formTriagem, setFormTriagem] = useState({
        matricula: '',
        pressao: '',
        temperatura: '',
        queixa: ''
    });
    const [formFuncionario, setFormFuncionario] = useState({
        matricula: '',
        nome: '',
        cpf: '',
        cargo: '',
        setor: ''
    });

    const navegar = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navegar('/');
            return;
        }

        async function carregarDados() {
            try {
                if (abaAtiva === 'atendimentos') {
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
                } else if (abaAtiva === 'funcionarios') {
                    const resposta = await fetch('http://localhost:3000/funcionarios', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': `Bearer ${token}`
                        }
                    });

                    if (resposta.ok) {
                        const dados = await resposta.json();
                        if (Array.isArray(dados)) {
                            setFuncionarios(dados);
                        }
                    }
                }
            } catch (erro) {
                console.error("Erro ao procurar dados na API:", erro);
            }
        }

        carregarDados();
    }, [abaAtiva, navegar]);

    async function handleSalvarTriagem(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const resposta = await fetch('http://localhost:3000/atendimentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formTriagem, status: 'Pendente' })
            });

            if (resposta.ok) {
                setModalTriagemAberto(false);
                setFormTriagem({
                    matricula: '',
                    pressao: '',
                    temperatura: '',
                    queixa: ''
                });
                setAbaAtiva('atendimentos');
            } else {
                const erroData = await resposta.json();
                alert(erroData.message || "Erro ao registar a triagem.");
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro de ligação ao servidor.");
        }
    }

    async function handleSalvarFuncionario(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const resposta = await fetch('http://localhost:3000/funcionarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formFuncionario)
            });

            if (resposta.ok) {
                setModalFuncionarioAberto(false);
                setFormFuncionario({ matricula: '', nome: '', cpf: '', cargo: '', setor: '' });
                setAbaAtiva('');
                setTimeout(() => setAbaAtiva('funcionarios'), 10);
            } else {
                const erroData = await resposta.json();
                alert(erroData.message || "Erro ao cadastrar funcionário.");
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro de ligação ao servidor.");
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        navegar('/');
    }

    function getBadgeClass(status) {
        if (status === 'Em Observação') {
            return 'observacao';
        } else if (status === 'Concluído') {
            return 'concluido';
        } else {
            return 'pendente';
        }
    }

    const formatarTitulo = (texto) => {
        if (!texto) return '';
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    let contentToRender;
    let tableContentAtendimentos;
    let tableContentFuncionarios;

    if (atendimentos.length === 0) {
        tableContentAtendimentos = (
            <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>Nenhum atendimento na fila.</td>
            </tr>
        );
    } else {
        tableContentAtendimentos = atendimentos.map((p) => (
            <tr key={p.id}>
                <td>{p.matricula}</td>
                <td>
                    <span className={`badge badge-${getBadgeClass(p.status)}`}>
                        {p.status}
                    </span>
                </td>
                <td><button className="btn-action">Abrir Ficha</button></td>
            </tr>
        ));
    }

    if (funcionarios.length === 0) {
        tableContentFuncionarios = (
            <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Nenhum funcionário cadastrado.</td>
            </tr>
        );
    } else {
        tableContentFuncionarios = funcionarios.map((f) => (
            <tr key={f.matricula}>
                <td>{f.matricula}</td>
                <td>{f.nome}</td>
                <td>{f.cargo}</td>
                <td>{f.setor}</td>
            </tr>
        ));
    }

    if (abaAtiva === 'atendimentos') {
        contentToRender = (
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
                        <button className="btn-primary" onClick={() => setModalTriagemAberto(true)}>
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
                            {tableContentAtendimentos}
                        </tbody>
                    </table>
                </section>
            </React.Fragment>
        );
    } else if (abaAtiva === 'funcionarios') {
        contentToRender = (
            <section className="lista-section">
                <div className="lista-header">
                    <h2>Funcionários Cadastrados</h2>
                    <button className="btn-primary" onClick={() => setModalFuncionarioAberto(true)}>
                        + Novo Funcionário
                    </button>
                </div>
                <table className="tabela-projetos">
                    <thead>
                        <tr>
                            <th>Matrícula</th>
                            <th>Nome completo</th>
                            <th>Cargo</th>
                            <th>Setor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContentFuncionarios}
                    </tbody>
                </table>
            </section>
        );
    } else {
        contentToRender = (
            <section className="lista-section">
                <h2>Gestão de {formatarTitulo(abaAtiva)}</h2>
                <p>A carregar rotas associadas a <strong>/{abaAtiva}</strong> do back-end.</p>
            </section>
        );
    }

    return (
        <div className="dashboard-layout">
            <Sidebar
                abaAtiva={abaAtiva}
                setAbaAtiva={setAbaAtiva}
                onLogout={handleLogout}
            />

            <main className="dashboard-content">
                <header className="topbar">
                    <h1>Módulo: {formatarTitulo(abaAtiva)}</h1>
                </header>

                {contentToRender}
            </main>

            {modalTriagemAberto && (
                <ModalTriagem
                    onClose={() => setModalTriagemAberto(false)}
                    onSubmit={handleSalvarTriagem}
                    formValues={formTriagem}
                    onChange={(e) => setFormTriagem({ ...formTriagem, [e.target.name]: e.target.value })}
                />
            )}

            {modalFuncionarioAberto && (
                <ModalFuncionario
                    onClose={() => setModalFuncionarioAberto(false)}
                    onSubmit={handleSalvarFuncionario}
                    formValues={formFuncionario}
                    onChange={(e) => setFormFuncionario({ ...formFuncionario, [e.target.name]: e.target.value })}
                />
            )}
        </div>
    );
}

export default Dashboard;