import express from 'express'
import { cadastrarFuncionario, buscarFuncionarioPorMatricula } from '../controllers/funcionarioController.js'

const router = express.Router()

// rota para cadastrar um funcionário
router.post('/funcionarios', cadastrarFuncionario)

// Rota para buscar um funcionário pela matrícula (GET)
// ':matricula' aceita qualquer número digitado na URL
router.get('/funcionarios/:matricula', buscarFuncionarioPorMatricula)


export default router