import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    HeartPulse,
    AlertCircle,
    User,
    Lock,
    ArrowRight
} from 'lucide-react';

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
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
                <div className="text-red-500 mt-0.5 flex-shrink-0">
                    <AlertCircle size={20} />
                </div>

                <div>
                    <h3 className="font-bold text-sm">
                        Falha na Autenticação
                    </h3>
                    <p className="text-xs mt-1">
                        {erro}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-azulEscuro text-white p-4 rounded-full mb-4">
                        <HeartPulse
                            size={48}
                            strokeWidth={1.5}
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-800">
                        Nexa Logos
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Portal Ambulatorial de Enfermagem
                    </p>
                </div>
                {alertaErro}
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1">
                            E-mail ou Matrícula
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <User size={16} />
                            </span>
                            <input
                                type="text"
                                required
                                placeholder="enfermagem@nexalogos.com.br ou 1234"
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-azulEscuro focus:ring-2 focus:ring-azulEscuro/20 transition-all"
                                value={identificador}
                                onChange={(e) => {
                                    setIdentificador(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold text-slate-500">
                                Senha de Segurança
                            </label>
                            <a href="#" className="text-xs font-bold text-azulEscuro hover:underline">
                                Esqueci a senha
                            </a>
                        </div>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <Lock size={16} />
                            </span>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-azulEscuro focus:ring-2 focus:ring-azulEscuro/20 transition-all"
                                value={senha}
                                onChange={(e) => {
                                    setSenha(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-azulEscuro focus:ring-azulEscuro"
                        />
                        <label htmlFor="remember-me" className="text-xs text-slate-600 font-medium">
                            Manter meu login ativo nesta estação
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-azulEscuro hover:bg-blue-800 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-900/20 transition-all flex items-center justify-center gap-2 !mt-6"
                    >
                        <span>
                            Acessar Nexa Logos
                        </span>
                        <ArrowRight size={16} />
                    </button>
                </form>
                <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
                    <p>
                        Uso exclusivo da equipe de enfermagem autorizada.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;