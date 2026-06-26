import express from 'express'

import {
    cadastrarFuncionario,
    buscarPacientes,
    atualizarFuncionario,
    deletarFuncionario,
    buscarFuncionarioPorMatricula
} from '../controllers/funcionarioController.js'
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post(`/funcionarios`, verificarToken, cadastrarFuncionario)
router.get(`/funcionarios`, verificarToken, buscarPacientes)

router.put(`/funcionarios/:matricula`, verificarToken, atualizarFuncionario)
router.patch(`/funcionarios/:matricula`, verificarToken, atualizarFuncionario)

router.delete(`/funcionarios/:matricula`, verificarToken, deletarFuncionario)

router.get(`/funcionarios/:matricula`, verificarToken, buscarFuncionarioPorMatricula)
export default router