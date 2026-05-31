document.addEventListener('DOMContentLoaded', () => {
    buscarResultados()
})

async function buscarResultados() {
    try {
        const resposta = await fetch('/atendimentos')

        if (!resposta.ok) throw new Error('Erro ao tentar buscar por atendimentos')

        const atendimentos = await resposta.json()

        // 1. Atualiza os números nos Cards superiores
        const pendentes = atendimentos.filter(a => a.status === 'Pendente').length
        const observacao = atendimentos.filter(a => a.status === 'Em Observação').length
        const concluidos = atendimentos.filter(a => a.status === 'Concluído').length

        document.getElementById('total-pendentes').textContent = pendentes
        document.getElementById('total-observacao').textContent = observacao
        document.getElementById('total-concluidos').textContent = concluidos

        // 2. Alimenta as linhas da tabela
        const corpoTabela = document.getElementById('corpo-tabela-atendimentos')
        corpoTabela.innerHTML = ''

        if (atendimentos.length === 0) {
            corpoTabela.innerHTML = `<tr><td colspan="5" style="text-align: center;">Nenhum atendimento registrado no momento.</td></tr>`
            return
        }

        atendimentos.forEach(atendimento => {
            const linha = document.createElement('tr')
            const dataFormatada = new Date(atendimento.createdAt || atendimento.criado_em).toLocaleString('pt-BR')

            // Tratamento de segurança para transformar o texto do status em uma classe válida do CSS
            // Exemplo: "Em Observação" vira "status-em-observação"
            const classeStatus = `status-${atendimento.status.toLowerCase().replace(' ', '-')}`

            linha.innerHTML = `
                <td>${atendimento.funcionario_matricula || '---'}</td>
                <td>${atendimento.Funcionario?.nome || 'Paciente não identificado'}</td>
                <td><span class="badge ${classeStatus}">${atendimento.status}</span></td>
                <td>${dataFormatada}</td>
                <td>
                    <button class="btn-acao btn-visualizar" onclick="visualizarAtendimento('${atendimento.id}')">Visualizar</button>
                </td>
            `
            corpoTabela.appendChild(linha)
        })

    } catch (error) {
        console.error('Falha ao atualizar o painel:', error)
        document.getElementById('corpo-tabela-atendimentos').innerHTML = `
            <tr><td colspan="5" style="text-align: center; color: red;">Erro ao carregar dados do servidor.</td></tr>
        `
    }
}

function visualizarAtendimento(id) {
    console.log(`Abrindo detalhes do atendimento ID: ${id}`)
}