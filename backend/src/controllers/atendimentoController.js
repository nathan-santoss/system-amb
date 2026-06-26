import Atendimento from '../models/atendimento.js';
import Funcionario from '../models/funcionarios.js';
import { Op } from 'sequelize';

// Registra um novo atendimento
export async function registrarAtendimento(req, res) {
    try {
        const novoAtendimento = await Atendimento.create(req.body);
        res.status(201).json(novoAtendimento);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// Obtem dados para o Dashboard
export async function obterDadosDashboard(req, res) {
    try {
        // Limites de tempo para Hoje (00:00:00 até 23:59:59)
        const inicioDia = new Date();
        inicioDia.setHours(0, 0, 0, 0);
        const fimDia = new Date();
        fimDia.setHours(23, 59, 59, 999);

        const inicioMes = new Date();
        inicioMes.setDate(1);
        inicioMes.setHours(0, 0, 0, 0);
        const fimMes = new Date();
        fimMes.setMonth(fimMes.getMonth() + 1);
        fimMes.setDate(0);
        fimMes.setHours(23, 59, 59, 999);

        // Contador Total de Hoje
        const totalHoje = await Atendimento.count({
            where: { createdAt: { [Op.between]: [inicioDia, fimDia] } }
        });

        // Divisão por Gravidade de Hoje
        const baixa = await Atendimento.count({
            where: { gravidade: 'Baixa', createdAt: { [Op.between]: [inicioDia, fimDia] } }
        });
        const media = await Atendimento.count({
            where: { gravidade: 'Média', createdAt: { [Op.between]: [inicioDia, fimDia] } }
        });
        const alta = await Atendimento.count({
            where: { gravidade: 'Alta', createdAt: { [Op.between]: [inicioDia, fimDia] } }
        });

        // Coleta de Atendimentos do Mês para análise de setores
        const atendimentosMes = await Atendimento.findAll({
            where: { createdAt: { [Op.between]: [inicioMes, fimMes] } },
            attributes: ['funcionario_matricula']
        });

        // Últimos 5 Atendimentos gerais ocorridos
        const ultimosAtendimentosRaw = await Atendimento.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']]
        });

        // Mapeamento em memória para evitar quebras de chaves estrangeiras
        const matriculasAtendimentosMes = atendimentosMes.map(at => at.funcionario_matricula);
        const matriculasUltimosAtendimentos = ultimosAtendimentosRaw.map(at => at.funcionario_matricula);

        const combinedMatriculas = [];
        matriculasAtendimentosMes.forEach(matricula => {
            combinedMatriculas.push(matricula);
        });
        matriculasUltimosAtendimentos.forEach(matricula => {
            combinedMatriculas.push(matricula);
        });

        const todasMatriculas = Array.from(new Set(combinedMatriculas));

        const funcionarios = await Funcionario.findAll({
            where: { matricula: { [Op.in]: todasMatriculas } },
            attributes: ['matricula', 'nome', 'setor']
        });

        const mapaFuncionarios = {};
        funcionarios.forEach(f => {
            mapaFuncionarios[f.matricula] = { nome: f.nome, setor: f.setor };
        });

        // Contabiliza Atendimentos por Setor no Mês
        const setoresContagem = {};
        atendimentosMes.forEach(at => {
            const func = mapaFuncionarios[at.funcionario_matricula];
            let nomeSetor;
            if (func && func.setor) {
                nomeSetor = func.setor;
            } else {
                nomeSetor = 'Não Informado';
            }
            setoresContagem[nomeSetor] = (setoresContagem[nomeSetor] || 0) + 1;
        });

        const atendimentosPorSetor = Object.keys(setoresContagem).map(setor => ({
            setor,
            quantidade: setoresContagem[setor] || 0 // Mantém o || aqui para garantir que seja um número, caso o setor não exista por algum motivo.
        })).sort((a, b) => b.quantidade - a.quantidade);

        // Estruturar a lista dos Últimos Atendimentos
        const ultimosAtendimentos = ultimosAtendimentosRaw.map(at => {
            const func = mapaFuncionarios[at.funcionario_matricula];
            let idAtendimento;
            if (at.id) {
                idAtendimento = at.id;
            } else {
                idAtendimento = at.id_atendimento;
            }
            let funcionarioNome = 'Funcionário Desconhecido';
            if (func && func.nome) {
                funcionarioNome = func.nome;
            }
            let funcionarioSetor = '---';
            if (func && func.setor) {
                funcionarioSetor = func.setor;
            }
            return {
                id: idAtendimento,
                matricula: at.funcionario_matricula,
                nome: funcionarioNome,
                setor: funcionarioSetor,
                gravidade: at.gravidade,
                queixa: at.queixa_principal,
                hora: at.createdAt
            };
        });

        // Retorna o pacote completo de métricas
        res.status(200).json({
            totalHoje,
            gravidadeHoje: { baixa, media, alta },
            atendimentosPorSetor,
            ultimosAtendimentos
        });

    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// 3. Contar atendimentos de hoje (Rota isolada, caso o Front-end precise apenas deste número rápido)
export async function contarAtendimentosHoje(req, res) {
    try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const total = await Atendimento.count({
            where: {
                data_atendimento: {
                    [Op.gte]: hoje
                }
            }
        });
        res.status(200).json({ total });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao contar atendimentos." });
    }
}

// Buscar atendimentos por matrícula de funcionário
export async function buscarAtendimentosPorFuncionario(req, res) {
    try {
        const { matricula } = req.params;
        const atendimentos = await Atendimento.findAll({
            where: { funcionario_matricula: matricula }
        });
        res.status(200).json(atendimentos);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// Atualizar atendimento existente
export async function atualizarAtendimento(req, res) {
    try {
        const { id } = req.params;
        const [atualizado] = await Atendimento.update(req.body, {
            where: { id_atendimento: id }
        });

        if (!atualizado) throw new Error(`Atendimento não encontrado`);

        res.status(200).json({ mensagem: `Atendimento atualizado com sucesso` });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// Deletar um atendimento
export async function deletarAtendimento(req, res) {
    try {
        const { id } = req.params;
        const deletado = await Atendimento.destroy({
            where: { id_atendimento: id }
        });

        if (!deletado) throw new Error(`Atendimento não encontrado`);

        res.status(200).json({ mensagem: `Atendimento removido com sucesso` });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}