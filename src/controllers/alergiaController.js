import Alergia from '../models/alergias.js'

// cadastrar alergia
export async function cadastrarAlergia(req, res) {
    try {
        const novaAlergia = await Alergia.create(req.body)

        res.status(201).json(novaAlergia)

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// buscar alergias por funcionário
export async function buscarAlergiasPorFuncionario(req, res) {
    try {
        const { matricula } = req.params

        const alergias = await Alergia.findAll({
            where: { funcionario_matricula: matricula }
        })

        res.status(200).json(alergias)

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// atualizar alergia
export async function atualizarAlergia(req, res) {
    try {
        const { id } = req.params

        const [atualizado] = await Alergia.update(req.body, {
            where: { id_alergia: id }
        })

        if (!atualizado) throw new Error(`Alergia não encontrada`)

        res.status(200).json({
            mensagem: `Alergia atualizada com sucesso`
        })

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// deletar alergia
export async function deletarAlergia(req, res) {
    try {
        const { id } = req.params

        const deletado = await Alergia.destroy({
            where: { id_alergia: id }
        })

        if (!deletado) throw new Error(`Alergia não encontrada`)

        res.status(200).json({
            mensagem: `Alergia removida com sucesso`
        })

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}