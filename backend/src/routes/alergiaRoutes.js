import express from 'express'

import {
    cadastrarAlergia,
    buscarAlergiasPorFuncionario,
    atualizarAlergia,
    deletarAlergia
} from '../controllers/alergiaController.js'
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/alergias', verificarToken, cadastrarAlergia)
router.get('/alergias/:matricula', buscarAlergiasPorFuncionario)

router.put('/alergias/:id', verificarToken, atualizarAlergia)
router.patch('/alergias/:id', verificarToken, atualizarAlergia)

router.delete('/alergias/:id', verificarToken, deletarAlergia)

export default router