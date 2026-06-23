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
            <form onSubmit={handleSubmit}>
                <h2>Login de Acesso</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}

export default Login