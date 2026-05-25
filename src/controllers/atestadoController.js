import Atestado from `../models/atestados.js`

// emitir atestado
export async function emitirAtestado(req, res) {
    try {
        const novoAtestado = await Atestado.create(req.body)

        res.status(201).json(novoAtestado)

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// buscar atestados por funcionário
export async function buscarAtestadosPorFuncionario(req, res) {
    try {
        const { matricula } = req.params

        const atestados = await Atestado.findAll({
            where: { funcionario_matricula: matricula }
        })

        res.status(200).json(atestados)

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// atualizar atestado
export async function atualizarAtestado(req, res) {
    try {
        const { id } = req.params

        const [atualizado] = await Atestado.update(req.body, {
            where: { id_atestado: id }
        })

        if (!atualizado) {
            throw new Error(`Atestado não encontrado`)
        }

        res.status(200).json({
            mensagem: `Atestado atualizado com sucesso`
        })

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        })
    }
}

// deletar atestado
export async function deletarAtestado(req, res) {
    try {
        const { id } = req.params

        const deletado = await Atestado.destroy({
            where: { id_atestado: id }
        })

        if (!deletado) {
            throw new Error(`Atestado não encontrado`)
        }

        res.status(200).json({
            mensagem: `Atestado removido com sucesso`
        })

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        })
    }
}