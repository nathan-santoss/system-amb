import { useState } from 'react'
import '../styles/global.css'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const navegar = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const resposta = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })

            const dados = await resposta.json()

            if (resposta.ok) {
                alert("Login realizado com sucesso!")
                localStorage.setItem('token', dados.token)
                navegar('/dashboard')
            } else {
                alert(dados.message || "Erro ao fazer login")
            }
        } catch (erro) {
            console.error("Erro na comunicação:", erro)
            alert("Erro ao conectar com o servidor.")
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login de Acesso</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login
