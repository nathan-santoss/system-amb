import Atestado from '../models/atestados.js'

// Função responsável por emitir/registrar um novo atestado
export const emitirAtestado = async (req, res) => {
    try {
        const {
            data_emissao,
            tipo_afastamento,
            motivo,
            quantidade,
            caminho_anexo,
            funcionario_matricula
        } = req.body

        const novoAtestado = await Atestado.create({
            data_emissao,
            tipo_afastamento,
            motivo,
            quantidade,
            caminho_anexo,
            funcionario_matricula
        })

        res.status(201).json({
            mensagem: "Atestado emitido com sucesso!",
            atestado: novoAtestado
        })

    } catch (erro) {
        console.error("Erro ao emitir atestado: ", erro)
        res.status(500).json({ erro: "Erro ao tentar emitir o atestado." })
    }
}

export const buscarAtestadosPorFuncionario = async (req, res) => {
    try {
        const { matricula } = req.params

        // Busca todos os atestados daquela matrícula
        // Ordenamos por 'data_emissao' para mostrar os mais recentes primeiro
        const historicoAtestados = await Atestado.findAll({
            where: { funcionario_matricula: matricula },
            order: [['data_emissao', 'DESC']]
        })

        if (historicoAtestados.length === 0) throw new Error('Erro ao buscar atestados -> Não encontrado registros.')
            
        res.status(200).json(historicoAtestados)

    } catch (erro) {
        console.error("Erro ao buscar histórico de atestados: ", erro)
        res.status(500).json({ erro: "Erro ao tentar buscar o histórico de atestados." })
    }
}