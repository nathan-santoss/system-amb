import Atendimento from '../models/atendimento.js';
import Funcionario from '../models/funcionarios.js';
import { Op } from 'sequelize';

// Registrar um novo atendimento/triagem
export async function registrarAtendimento(req, res) {
    try {
        const novoAtendimento = await Atendimento.create(req.body);
        res.status(201).json(novoAtendimento);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

// Obter dados compilados para o Dashboard
export async function obterDadosDashboard(req, res) {
    try {
        const inicioDia = new Date(); inicioDia.setHours(0, 0, 0, 0);
        const fimDia = new Date(); fimDia.setHours(23, 59, 59, 999);
        const inicioMes = new Date(); inicioMes.setDate(1); inicioMes.setHours(0, 0, 0, 0);
        const fimMes = new Date(); fimMes.setMonth(fimMes.getMonth() + 1); fimMes.setDate(0); fimMes.setHours(23, 59, 59, 999);

        const totalHoje = await Atendimento.count({ where: { data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } } });
        const baixa = await Atendimento.count({ where: { gravidade: 'Baixa', data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } } });
        const media = await Atendimento.count({ where: { gravidade: 'Média', data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } } });
        const alta = await Atendimento.count({ where: { gravidade: 'Alta', data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } } });

        const atendimentosMes = await Atendimento.findAll({ where: { data_hora_entrada: { [Op.between]: [inicioMes, fimMes] } }, attributes: ['funcionario_matricula'] });
        const ultimosAtendimentosRaw = await Atendimento.findAll({ limit: 5, order: [['data_hora_entrada', 'DESC']] });

        const todasMatriculas = [...new Set([...atendimentosMes.map(at => at.funcionario_matricula), ...ultimosAtendimentosRaw.map(at => at.funcionario_matricula)])];
        const funcionarios = await Funcionario.findAll({ where: { matricula: { [Op.in]: todasMatriculas } }, attributes: ['matricula', 'nome', 'setor'] });

        const mapaFuncionarios = {};
        funcionarios.forEach(f => mapaFuncionarios[f.matricula] = { nome: f.nome, setor: f.setor });

        const setoresContagem = {};
        atendimentosMes.forEach(at => {
            const func = mapaFuncionarios[at.funcionario_matricula];
            const nomeSetor = (func && func.setor) || 'Não Informado';
            setoresContagem[nomeSetor] = (setoresContagem[nomeSetor] || 0) + 1;
        });

        const atendimentosPorSetor = Object.keys(setoresContagem).map(setor => ({ setor, quantidade: setoresContagem[setor] })).sort((a, b) => b.quantidade - a.quantidade);

        const ultimosAtendimentos = ultimosAtendimentosRaw.map(at => {
            const func = mapaFuncionarios[at.funcionario_matricula];
            return { id: at.id_atendimento, matricula: at.funcionario_matricula, nome: (func && func.nome) || 'Funcionário Desconhecido', setor: (func && func.setor) || '---', gravidade: at.gravidade, queixa: at.queixa_principal };
        });

        res.status(200).json({ totalHoje, gravidadeHoje: { baixa, media, alta }, atendimentosPorSetor, ultimosAtendimentos });
    } catch (erro) {
        console.error("Erro no obterDadosDashboard:", erro);
        res.status(500).json({ erro: erro.message });
    }
}

export async function contarAtendimentosHoje(req, res) {
    try {
        const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
        const total = await Atendimento.count({ where: { data_hora_entrada: { [Op.gte]: hoje } } });
        res.status(200).json({ total });
    } catch (erro) { res.status(500).json({ erro: "Erro ao contar atendimentos." }); }
}

export async function buscarAtendimentosPorFuncionario(req, res) {
    try {
        const { matricula } = req.params;
        const atendimentos = await Atendimento.findAll({ where: { funcionario_matricula: matricula } });
        res.status(200).json(atendimentos);
    } catch (erro) { res.status(500).json({ erro: erro.message }); }
}

export async function atualizarAtendimento(req, res) {
    try {
        const { id } = req.params;
        const [atualizado] = await Atendimento.update(req.body, { where: { id_atendimento: id } });
        if (!atualizado) throw new Error(`Atendimento não encontrado`);
        res.status(200).json({ mensagem: `Atendimento atualizado com sucesso` });
    } catch (erro) { res.status(500).json({ erro: erro.message }); }
}

export async function deletarAtendimento(req, res) {
    try {
        const { id } = req.params;
        const deletado = await Atendimento.destroy({ where: { id_atendimento: id } });
        if (!deletado) throw new Error(`Atendimento não encontrado`);
        res.status(200).json({ mensagem: `Atendimento removido com sucesso` });
    } catch (erro) { res.status(500).json({ erro: erro.message }); }
}

export async function buscarTodosAtendimentos(req, res) {
    try {
        const todosAtendimentos = await Atendimento.findAll();
        res.status(200).json(todosAtendimentos);
    } catch (erro) { res.status(500).json({ erro: erro.message }); }
}