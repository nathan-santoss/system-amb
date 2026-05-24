import Alergia from '../models/alergias.js'

export const cadastrarAlergia = async (req, res) => {
    try {
        const { nome_alergia, descricao_alergia, funcionario_matricula } = req.body

        const novaAlergia = await Alergia.create({
            nome_alergia,
            descricao_alergia,
            funcionario_matricula
        })

        res.status(201).json({
            mensagem: "Alergia cadastrada com sucesso!",
            alergia: novaAlergia
        })

    } catch (erro) {
        console.error("Erro ao cadastrar alergia: ", erro)
        res.status(500).json({ erro: "Erro ao tentar cadastrar a alergia." })
    }
}

export const buscarAlergiasPorFuncionario = async (req, res) => {
    try {
        // Captura a matrícula vinda da URL
        const { matricula } = req.params

        // Procura todas as alergias associadas a esta matrícula (findAll)
        const alergias = await Alergia.findAll({
            where: { funcionario_matricula: matricula }
        })
        if (alergias.length > 0) {
            // Retorna a lista de alergias encontrada
            res.status(200).json(alergias)
            return
        }
        throw new Error("Sem alergias encontradas");


    } catch (erro) {
        console.error("Erro ao buscar alergias: ", erro)
        res.status(500).json({ erro: "Erro ao tentar buscar as alergias/funcionário não possui" })
    }
}