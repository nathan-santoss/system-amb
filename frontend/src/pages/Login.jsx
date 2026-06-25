// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HeartPulse,
    AlertCircle,
    User,
    Lock,
    ArrowRight
} from 'lucide-react';
import '../styles/login.css';

function Login() {

    const [identificador, setIdentificador] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const navegar = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!identificador) {
            setErro('Por favor, preencha o campo de E-mail ou Matrícula.');
            return;
        }
        if (senha.length < 4) {
            setErro('Senha de segurança muito curta! Digite no mínimo 4 caracteres.');
            return;
        }
        try {
            const resposta = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: identificador,
                    senha
                })
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                localStorage.setItem('token', dados.token);
                navegar('/dashboard');
                return;
            }
            if (dados.message) {
                setErro(dados.message);
            } else {
                setErro('Credenciais incorretas. Tente novamente.');
            }
        } catch (erro) {
            console.error('Erro na comunicação:', erro);
            setErro(
                'Falha na conexão com o servidor. Verifique o Back-end!'
            );
        }
    }
    let alertaErro = null;
    if (erro) {
        alertaErro = (
            <div className="login-error-alert">
                <div className="login-error-icon">
                    <AlertCircle size={20} />
                </div>

                <div>
                    <h3 className="login-error-title">
                        Falha na Autenticação
                    </h3>
                    <p className="login-error-text">
                        {erro}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <div className="login-logo-container">
                    <div className="login-icon-bg">
                        <HeartPulse
                            size={48}
                            strokeWidth={1.5}
                        />
                    </div>

                    <h1 className="login-title">
                        Nexa Logos
                    </h1>
                    <p className="login-subtitle">
                        Portal Ambulatorial de Enfermagem
                    </p>
                </div>
                {alertaErro}
                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="input-label">
                            E-mail ou Matrícula
                        </label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <User size={16} />
                            </span>
                            <input
                                type="text"
                                required
                                placeholder="enfermagem@nexalogos.com.br ou 1234"
                                className="login-input"
                                value={identificador}
                                onChange={(e) => {
                                    setIdentificador(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="input-label-row">
                            <label
                                className="input-label"
                                style={{ marginBottom: 0 }}
                            >
                                Senha de Segurança
                            </label>
                            <a
                                href="#"
                                className="input-link"
                            >
                                Esqueci a senha
                            </a>
                        </div>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <Lock size={16} />
                            </span>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="login-input"
                                value={senha}
                                onChange={(e) => {
                                    setSenha(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="checkbox-wrapper">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="checkbox-input"
                        />
                        <label
                            htmlFor="remember-me"
                            className="checkbox-label"
                        >
                            Manter meu login ativo nesta estação
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn-submit"
                    >
                        <span>
                            Acessar Nexa Logos
                        </span>
                        <ArrowRight size={16} />
                    </button>
                </form>
                <div className="login-footer">
                    <p>
                        Uso exclusivo da equipe de enfermagem autorizada.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;