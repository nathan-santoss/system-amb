import '../styles/global.css'

function CardsStatus({ pendentes, observacao, concluidos }) {
    return (
        <div className="cards-container">
            <div className="card">
                <h3>Pendentes</h3>
                <p className="card-valor">{pendentes}</p>
            </div>

            <div className="card">
                <h3>Em Observação</h3>
                <p className="card-valor">{observacao}</p>
            </div>

            <div className="card">
                <h3>Concluídos</h3>
                <p className="card-valor">{concluidos}</p>
            </div>
        </div>
    )
}

export default CardsStatus