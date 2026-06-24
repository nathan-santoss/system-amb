import { LayoutDashboard, Clock, Users, Settings, LogOut, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardLayout({ children, titulo, subtitulo }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="h-screen flex overflow-hidden text-cinzaTexto font-sans bg-cinzaFundo">

            {/* BARRA LATERAL (SIDEBAR) UNIFICADA */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-20 shadow-sm">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="bg-azulEscuro p-2 rounded-xl text-white shadow-md shadow-azulEscuro/20">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-azulEscuro tracking-tight leading-none text-base">Nexa Logos</h2>
                        <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Ambulatório</span>
                    </div>
                </div>

                <div className="px-4 py-5 border-b border-slate-50">
                    <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-3 border border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-azulEscuro text-sm">
                            FS
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-slate-800 truncate">Enfª. Fernanda Silva</h4>
                            <span className="text-[10px] text-slate-500 font-medium truncate block">Matrícula: 1234</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
                    <button onClick={() => navigate('/dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${titulo === 'Painel Geral' ? 'font-bold bg-blue-50 text-azulEscuro border-r-4 border-azulEscuro shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Painel Geral</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all group">
                        <Clock className="w-5 h-5 group-hover:text-azulEscuro transition-colors" />
                        <span>Fila de Triagem</span>
                    </button>

                    <button onClick={() => navigate('/consultar-paciente')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${titulo === 'Consultar Paciente' ? 'font-bold bg-blue-50 text-azulEscuro border-r-4 border-azulEscuro shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                        <Users className="w-5 h-5" />
                        <span>Consultar Paciente</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all group">
                        <Settings className="w-5 h-5 group-hover:text-azulEscuro transition-colors" />
                        <span>Configurações</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-200 bg-slate-50/50">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-red-200 text-vermelhoAlerta hover:bg-vermelhoAlerta hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-red-200">
                        <LogOut className="w-4 h-4" />
                        <span>Encerrar Sessão</span>
                    </button>
                </div>
            </aside>

            {/* ÁREA PRINCIPAL DINÂMICA */}
            <main className="flex-1 flex flex-col min-w-0 relative">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-bold text-slate-800">{titulo}</h1>
                        <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-2.5 py-1 rounded-lg border border-slate-200">{subtitulo}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-xs text-slate-400 font-medium hidden md:block">
                            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100 text-xs font-bold shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Sistema Online</span>
                        </div>
                    </div>
                </header>

                {/* Aqui o conteúdo dinâmico de cada ecrã (página) será injetado */}
                {children}
            </main>

        </div>
    );
}