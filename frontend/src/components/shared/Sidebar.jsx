import '../../styles/global.css';

function Sidebar({ abaAtiva, setAbaAtiva, onLogout }) {
    const getAbaClassName = (aba) => {
        if (abaAtiva === aba) {
            return 'active';
        }
        return '';
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <h2>Ambulatório</h2>
            </div>
            <nav className="sidebar-nav">
                <button
                    className={getAbaClassName('atendimentos')}
                    onClick={() => setAbaAtiva('atendimentos')}
                >
                    Locais Atendimentos
                </button>
                <button
                    className={getAbaClassName('funcionarios')}
                    onClick={() => setAbaAtiva('funcionarios')}
                >
                    👥 Funcionários
                </button>
                <button
                    className={getAbaClassName('alergias')}
                    onClick={() => setAbaAtiva('alergias')}
                >
                    ⚠️ Alergias
                </button>
                <button
                    className={getAbaClassName('atestados')}
                    onClick={() => setAbaAtiva('atestados')}
                >
                    📄 Atestados
                </button>
            </nav>
            <div className="sidebar-footer">
                <button className="btn-sair" onClick={onLogout}>Sair do Sistema</button>
            </div>
        </aside>
    );
}

export default Sidebar;