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

        // Limites de tempo para o Mês Atual (Dia 1 até o último dia do mês)
        const inicioMes = new Date();
        inicioMes.setDate(1);
        inicioMes.setHours(0, 0, 0, 0);
        const fimMes = new Date();
        fimMes.setMonth(fimMes.getMonth() + 1);
        fimMes.setDate(0);
        fimMes.setHours(23, 59, 59, 999);

        // 1. Contador Total de Hoje
        const totalHoje = await Atendimento.count({
            where: { data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } }
        });

        // 2. Divisão por Gravidade de Hoje
        const baixa = await Atendimento.count({
            where: { gravidade: 'Baixa', data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } }
        });
        const media = await Atendimento.count({
            where: { gravidade: 'Média', data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } }
        });
        const alta = await Atendimento.count({
            where: { gravidade: 'Alta', data_hora_entrada: { [Op.between]: [inicioDia, fimDia] } }
        });

        // 3. Coleta de Atendimentos do Mês para análise de setores
        const atendimentosMes = await Atendimento.findAll({
            where: { data_hora_entrada: { [Op.between]: [inicioMes, fimMes] } },
            attributes: ['funcionario_matricula']
        });

        // 4. Últimos 5 Atendimentos gerais ocorridos
        const ultimosAtendimentosRaw = await Atendimento.findAll({
            limit: 5,
            order: [['data_hora_entrada', 'DESC']]
        });

        // Mapeamento em memória para evitar quebras de chaves estrangeiras
        const todasMatriculas = [
            ...new Set([
                ...atendimentosMes.map(at => at.funcionario_matricula),
                ...ultimosAtendimentosRaw.map(at => at.funcionario_matricula)
            ])
        ];

        const funcionarios = await Funcionario.findAll({
            where: { matricula: { [Op.in]: todasMatriculas } },
            attributes: ['matricula', 'nome', 'setor']
        });

        const mapaFuncionarios = {};
        funcionarios.forEach(f => {
            mapaFuncionarios[f.matricula] = { nome: f.nome, setor: f.setor };
        });

        // Contabilizar Atendimentos por Setor no Mês
        const setoresContagem = {};
        atendimentosMes.forEach(at => {
            const func = mapaFuncionarios[at.funcionario_matricula];
            const nomeSetor = (func && func.setor) || 'Não Informado';
            setoresContagem[nomeSetor] = (setoresContagem[nomeSetor] || 0) + 1;
        });

        const atendimentosPorSetor = Object.keys(setoresContagem).map(setor => ({
            setor,
            quantidade: setoresContagem[setor]
        })).sort((a, b) => b.quantidade - a.quantidade);

        // Estruturar a lista dos Últimos Atendimentos
        const ultimosAtendimentos = ultimosAtendimentosRaw.map(at => {
            const func = mapaFuncionarios[at.funcionario_matricula];
            return {
                id: at.id || at.id_atendimento,
                matricula: at.funcionario_matricula,
                nome: (func && func.nome) || 'Funcionário Desconhecido',
                setor: (func && func.setor) || '---',
                gravidade: at.gravidade,
                queixa: at.queixa_principal,
                hora: at.data_hora_entrada
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
        console.error("Erro no obterDadosDashboard:", erro);
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
                data_hora_entrada: {
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
