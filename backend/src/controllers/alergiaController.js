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
export async function buscarAlergias(req, res) {
    try {
        const { funcionario_matricula } = req.query; // Captura a matrícula vinda da URL
        
        if (!funcionario_matricula) {
            return res.status(400).json({ erro: "Matrícula não fornecida." });
        }
        
        const alergias = await Alergia.findAll({
            where: { funcionario_matricula: funcionario_matricula }
        });
        
        res.status(200).json(alergias);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar alergias" });
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
        const { id_alergia } = req.params;
        
        const deletado = await Alergia.destroy({
            where: { id_alergia: id_alergia }
        });
        
        if (deletado) {
            res.status(200).json({ mensagem: "Alergia removida com sucesso!" });
        } else {
            res.status(404).json({ erro: "Alergia não encontrada." });
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao tentar remover a alergia." });
    }
}