import express from 'express'

import {
    registrarAtendimento,
    buscarAtendimentosPorFuncionario,
    atualizarAtendimento,
    deletarAtendimento,
    searchAll
} from '../controllers/atendimentoController.js'
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post(`/atendimentos`, verificarToken, registrarAtendimento)
router.get(`/atendimentos/:matricula`, verificarToken, buscarAtendimentosPorFuncionario)

router.put(`/atendimentos/:id`, verificarToken, atualizarAtendimento)
router.patch(`/atendimentos/:id`, verificarToken, atualizarAtendimento)

router.delete(`/atendimentos/:id`, verificarToken, deletarAtendimento)


// buscar todos atendimentos
router.get('/buscarAtendimentos', verificarToken, searchAll())
export default router