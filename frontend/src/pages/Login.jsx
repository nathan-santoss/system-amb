import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setErro('')
        try {
            const resposta = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, senha })
            })
            const dados = await resposta.json()
            if (resposta.ok) {
                localStorage.setItem('token', dados.token)
                navigate('/dashboard')
            } else {
                setErro(dados.erro || 'Credenciais inválidas')
            }
        } catch (err) {
            setErro('Erro ao conectar com o servidor: ', err.message)
        }
    }

    return (
        <div className="min-h-screen bg-cinzaFundo flex items-center justify-center font-sans p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-azulEscuro">Ambulatório</h2>
                    <p className="text-sm text-gray-500 mt-2">Acesse com suas credenciais médicas</p>
                </div>
                {erro && (
                    <div className="bg-red-50 border-l-4 border-vermelhoAlerta p-4 mb-6 rounded-r-lg">
                        <p className="text-sm text-red-700 font-medium">{erro}</p>
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-cinzaTexto mb-2">Usuário / Matrícula</label>
                        <input
                            type="text"
                            required
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cinzaTexto focus:outline-none focus:ring-2 focus:ring-azulEscuro focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-cinzaTexto mb-2">Senha</label>
                        <input
                            type="password"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cinzaTexto focus:outline-none focus:ring-2 focus:ring-azulEscuro focus:border-transparent transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-azulEscuro text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition shadow-md"
                    >
                        Entrar no Sistema
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login