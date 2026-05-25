import Funcionario from "../models/funcionarios.js";

export async function cadastrarFuncionario(req, res) {
    try {
        const { matricula, nome, cpf, cargo, setor } = req.body
        const novoFunc = await Funcionario.create({
            matricula,
            nome,
            cpf,
            cargo,
            setor
        })
        res.status(201).json({
            mensagem: "Funcionário cadastrado com sucesso!",
            funcionario: novoFunc
        })
    } catch (error) {
        console.error("Erro ao cadastrar funcionário: ", erro);
        res.status(500).json({ erro: "Erro ao tentar cadastrar o funcionário." });
    }

}

// buscar um funcionário pela matrícula
export async function buscarFuncionarioPorMatricula(req, res) {
    try {
        const { matricula } = req.params;

        // Procura no MySQL 
        const funcionario = await Funcionario.findByPk(matricula);

        // Se não encontrar nenhum funcionário com essa matrícula
        if (!funcionario) throw new Error('Funcionário não encontrado')

        res.status(200).json(funcionario);

    } catch (erro) {
        console.error("Erro ao buscar funcionário: ", erro);
        res.status(500).json({ erro: `Erro ao tentar buscar o funcionário -> ${erro}` });
    }
}

// atualizar dados de um funcionário
export const atualizarFuncionario = async (req, res) => {
    try {
        const { matricula } = req.params
        const dadosAtualizados = req.body

        // Procura e atualiza os dados
        const [atualizado] = await Funcionario.update(dadosAtualizados, {
            where: { matricula: matricula }
        })

        if (!atualizado) throw new Error('Funcionário não encontrado')

        res.status(200).json({ mensagem: "Funcionário atualizado com sucesso!" })

    } catch (erro) {
        res.status(500).json({ erro: `Erro ao atualizar funcionário -> ${erro}` })
    }
}

// deletar um funcionário
export const deletarFuncionario = async (req, res) => {
    try {
        const { matricula } = req.params

        const deletado = await Funcionario.destroy({
            where: { matricula: matricula }
        })

        if (!deletado) throw new Error('Funcionário não encontrado')

        res.status(200).json({ mensagem: "Funcionário removido com sucesso!" })

    } catch (erro) {
        res.status(500).json({ erro: `Erro ao deletar funcionário -> ${erro}` })
    }
}