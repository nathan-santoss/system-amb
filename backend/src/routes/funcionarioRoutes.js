import express from 'express'

import {
    cadastrarFuncionario,
    buscarFuncionarios,
    atualizarFuncionario,
    deletarFuncionario
} from '../controllers/funcionarioController.js'
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post(`/funcionarios`, verificarToken, cadastrarFuncionario)
router.get(`/funcionarios`, verificarToken, buscarFuncionarios)

router.put(`/funcionarios/:matricula`, verificarToken, atualizarFuncionario)
router.patch(`/funcionarios/:matricula`, verificarToken, atualizarFuncionario)

router.delete(`/funcionarios/:matricula`, verificarToken, deletarFuncionario)

export default router