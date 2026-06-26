import Funcionario from '../models/funcionarios.js'
import { Op } from 'sequelize'

// cadastrar funcionário
export async function cadastrarFuncionario(req, res) {
    try {
        const novoFuncionario = await Funcionario.create(req.body)

        res.status(201).json(novoFuncionario)

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// buscar funcionários (com ou sem filtro de pesquisa)
export async function buscarPacientes() {
    setCarregando(true);
    setErro('');

    try {
        // 1. Definimos apenas o final da rota (o api.js já sabe que é localhost:3000)
        const url = pesquisa ? `/funcionarios?busca=${pesquisa}` : `/funcionarios`;

        // 2. Fazemos o pedido! (O api.js envia o Token automaticamente)
        const resposta = await api.get(url);

        // 3. Guardamos os dados
        setPacientes(resposta.data);

    } catch (erro) {
        console.error("Erro ao procurar pacientes:", erro);
        setErro('Não foi possível carregar a lista.');
    } finally {
        setCarregando(false);
    }
}

// atualizar funcionário
export async function atualizarFuncionario(req, res) {
    try {
        const { matricula } = req.params

        const [atualizado] = await Funcionario.update(req.body, {
            where: { matricula: matricula }
        })

        if (!atualizado) throw new Error(`Funcionário não encontrado`)

        res.status(200).json({
            mensagem: `Funcionário atualizado com sucesso`
        })

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// deletar funcionário
export async function deletarFuncionario(req, res) {
    try {
        const { matricula } = req.params

        const deletado = await Funcionario.destroy({
            where: { matricula: matricula }
        })

        if (!deletado) throw new Error(`Funcionário não encontrado`)

        res.status(200).json({
            mensagem: `Funcionário removido com sucesso`
        })

    } catch (erro) {
        res.status(500).json({ erro: erro.message })
    }
}

// buscar funcionário por matrícula
export async function buscarFuncionarioPorMatricula(req, res) {
    try {
        const { matricula } = req.params;

        // Procura no banco de dados pela chave primária (matrícula)
        const funcionario = await Funcionario.findByPk(matricula);

        if (!funcionario) {
            return res.status(404).json({ mensagem: `Funcionário não encontrado` });
        }

        res.status(200).json(funcionario);

    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}