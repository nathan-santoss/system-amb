
// 2. A FUNÇÃO DO COMPONENTE: Ela recebe "props" (propriedades). 
// É como dizer: "Ei card, quando você for desenhado, tome esses 3 números para mostrar".
function CardsStatus({ pendentes = 0, observacao = 0, concluidos = 0 }) {

    // 3. O RETORNO (O Visual): Aqui escrevemos JSX (que é o HTML misturado com JS).
    // Note que em vez de 'class', no React usamos 'className'.
    // Para injetar os números do JavaScript no HTML, usamos chaves { }.
    return (
        <section className="secao-cards-status">
            <div className="card-status">
                <span className="titulo-status">Pendentes</span>
                <strong>{pendentes}</strong>
            </div>

            <div className="card-status">
                <span className="titulo-status">Em Observação</span>
                <strong>{observacao}</strong>
            </div>

            <div className="card-status">
                <span className="titulo-status">Concluídos</span>
                <strong>{concluidos}</strong>
            </div>
        </section>
    )
}

// 4. EXPORTAÇÃO: Isso permite que outros arquivos "puxem" esse bloco de código.
export default CardsStatus