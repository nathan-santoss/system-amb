import { error } from 'console'
import Atendimento from '../models/atendimento.js'

export const registrarAtendimento = async (req, res) => {
    try {
        const { 
            pressao, 
            temperatura, 
            queixa_principal, 
            gravidade, 
            acao_tomada, 
            funcionario_matricula 
        } = req.body

        const novoAtendimento = await Atendimento.create({
            pressao,
            temperatura,
            queixa_principal,
            gravidade,
            acao_tomada,
            funcionario_matricula
        })

        res.status(201).json({
            mensagem: "Atendimento registrado com sucesso!",
            atendimento: novoAtendimento
        })

    } catch (erro) {
        console.error("Erro ao registrar atendimento: ", erro)
        res.status(500).json({ erro: "Erro ao tentar registrar o atendimento." })
    }
}

export const buscarAtendimentosPorFuncionario = async (req, res) => {
    try {
        const { matricula } = req.params

        // Busca todos os atendimentos daquela matrícula
        // order: [['id', 'DESC']] garante que o mais recente apareça primeiro
        const historico = await Atendimento.findAll({
            where: { funcionario_matricula: matricula },
            order: [['id_atendimento', 'DESC']]
        })
        if(historico.length === 0) throw new Error("Sem atendimentos encontrados!")

        // Retorna a lista de atendimentos encontrados
        res.status(200).json(historico)

    } catch (erro) {
        console.error("Erro ao buscar histórico de atendimentos: ", erro)
        res.status(500).json({ erro: `Erro ao tentar buscar o histórico -> ${erro}` })
    }
}