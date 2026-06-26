import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar({ onLogout }) {
    const navigate = useNavigate()
    const location = useLocation()

    const getAbaClassName = (path) => {
        if (location.pathname === path) {
            return 'active'
        }
        return ''
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <h2>Ambulatório</h2>
            </div>
            <nav className="sidebar-nav">
                <button
                    className={getAbaClassName('/dashboard')}
                    onClick={() => navigate('/dashboard')}
                >
                    Locais Atendimentos
                </button>
                <button
                    className={getAbaClassName('/consultar-paciente')}
                    onClick={() => navigate('/consultar-paciente')}
                >
                    👥 Funcionários
                </button>
                <button
                    className={getAbaClassName('/alergias')}
                    onClick={() => navigate('/alergias')}
                >
                    ⚠️ Alergias
                </button>
                <button
                    className={getAbaClassName('/atestados')}
                    onClick={() => navigate('/atestados')}
                >
                    📄 Atestados
                </button>
            </nav>
            <div className="sidebar-footer">
                <button className="btn-sair" onClick={onLogout}>Sair do Sistema</button>
            </div>
        </aside>
    )
}

export default Sidebar