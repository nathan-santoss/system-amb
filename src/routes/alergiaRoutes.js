import express from 'express'
import { cadastrarAlergia, buscarAlergiasPorFuncionario, atualizarAlergia} from '../controllers/alergiaController.js'

const router = express.Router()

// cadastro e busca de alergias
router.post('/alergias', cadastrarAlergia)

router.patch('/alergias/:id', atualizarAlergia)

router.get('/alergias/:matricula', buscarAlergiasPorFuncionario)
    

export default router