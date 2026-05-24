import express from 'express'
import { cadastrarAlergia, buscarAlergiasPorFuncionario} from '../controllers/alergiaController.js'

const router = express.Router()

// cadastro e busca de alergias
router.post('/alergias', cadastrarAlergia)
router.get('/alergias/:matricula', buscarAlergiasPorFuncionario)


export default router