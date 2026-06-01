import { useState } from 'react'


function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

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


                if (onLoginSuccess) {
                    onLoginSuccess()
                }
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