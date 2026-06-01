// frontend/src/components/CardsStatus.jsx
import '../styles/global.css'

function CardsStatus() {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div className="card" style={{ flex: 1 }}>
                <h3>Em Atendimento</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>5</p>
            </div>
            <div className="card" style={{ flex: 1 }}>
                <h3>Aguardando Triagem</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>12</p>
            </div>
            <div className="card" style={{ flex: 1 }}>
                <h3>Atestados Emitidos</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>3</p>
            </div>
        </div>
    )
}

export default CardsStatus