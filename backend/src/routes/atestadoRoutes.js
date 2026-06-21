import express from 'express'

import {
    emitirAtestado,
    buscarAtestadosPorFuncionario,
    atualizarAtestado,
    deletarAtestado
} from '../controllers/atestadoController.js'
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post(`/atestados`, verificarToken, emitirAtestado)
router.get(`/atestados/:matricula`, verificarToken, buscarAtestadosPorFuncionario)

router.put(`/atestados/:id`, verificarToken, atualizarAtestado)
router.patch(`/atestados/:id`, verificarToken, atualizarAtestado)

router.delete(`/atestados/:id`, verificarToken, deletarAtestado)

export default router