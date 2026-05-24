import express from 'express'
import { emitirAtestado, buscarAtestadosPorFuncionario } from '../controllers/atestadoController.js'

const router = express.Router()

router.post('/atestados', emitirAtestado)
router.get('/atestados/:matricula', buscarAtestadosPorFuncionario)

export default router