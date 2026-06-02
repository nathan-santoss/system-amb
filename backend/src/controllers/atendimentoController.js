import Atendimento from '../models/atendimento.js'

// registrar atendimento
export async function registrarAtendimento(req, res) {
    try {
        const novoAtendimento = await Atendimento.create(req.body)

        res.status(201).json(novoAtendimento)

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// buscar atendimentos por funcionário
export async function buscarAtendimentosPorFuncionario(req, res) {
    try {
        const { matricula } = req.params

        const atendimentos = await Atendimento.findAll({
            where: { funcionario_matricula: matricula }
        })

        res.status(200).json(atendimentos)

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// atualizar atendimento
export async function atualizarAtendimento(req, res) {
    try {
        const { id } = req.params

        const [atualizado] = await Atendimento.update(req.body, {
            where: { id_atendimento: id }
        })

        if (!atualizado) throw new Error(`Atendimento não encontrado`)

        res.status(200).json({
            mensagem: `Atendimento atualizado com sucesso`
        })

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// deletar atendimento
export async function deletarAtendimento(req, res) {
    try {
        const { id } = req.params

        const deletado = await Atendimento.destroy({
            where: { id_atendimento: id }
        })

        if (!deletado) throw new Error(`Atendimento não encontrado`)

        res.status(200).json({
            mensagem: `Atendimento removido com sucesso`
        })

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// buscar todos atendimentos
export const searchAll = async (req, res) => {
    try {
        const todosAtendimentos = await Atendimento.findAll()
        res.status(200).json(todosAtendimentos) // encontrou os atendimentos e retorna
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
}