import express from 'express'

import {
    registrarAtendimento,
    buscarAtendimentosPorFuncionario,
    atualizarAtendimento,
    deletarAtendimento,
    searchAll
} from '../controllers/atendimentoController.js'

const router = express.Router()

router.post(`/atendimentos`, registrarAtendimento)
router.get(`/atendimentos/:matricula`, buscarAtendimentosPorFuncionario)

router.put(`/atendimentos/:id`, atualizarAtendimento)
router.patch(`/atendimentos/:id`, atualizarAtendimento)

router.delete(`/atendimentos/:id`, deletarAtendimento)


// buscar todos atendimentos
router.get('/buscarAtendimentos', searchAll())
export default router