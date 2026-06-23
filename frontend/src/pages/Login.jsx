import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const navegar = useNavigate();

    function renderAlertaErro() {
        if (erro) {
            return <div className="alerta-erro">{erro}</div>;
        }
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                localStorage.setItem('token', dados.token);
                navegar('/dashboard');
            } else {
                setErro(dados.message || "Credenciais inválidas. Tente novamente.");
            }
        } catch (erro) {
            console.error("Erro na comunicação:", erro);
            setErro("Falha na conexão com o servidor.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Sistema Ambulatorial</h2>
                    <p>Insira suas credenciais para acessar</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {renderAlertaErro()}

                    <div className="input-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="enfermeira@empresa.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Sua senha de acesso"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">Entrar no Sistema</button>
                </form>
            </div>
        </div>
    );
}

export default Login;