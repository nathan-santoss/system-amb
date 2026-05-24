import express from 'express'
import { registrarAtendimento, buscarAtendimentosPorFuncionario  } from '../controllers/atendimentoController.js'

const router = express.Router()

router.post('/atendimentos', registrarAtendimento)
router.get('/atendimentos/:matricula', buscarAtendimentosPorFuncionario)

export default router