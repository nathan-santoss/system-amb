import express from 'express'
import { cadastrarFuncionario, buscarFuncionarioPorMatricula, atualizarFuncionario, deletarFuncionario} from '../controllers/funcionarioController.js'

const router = express.Router()

// rota para cadastrar um funcionário
router.post('/funcionarios', cadastrarFuncionario)

router.get('/funcionarios/:matricula', buscarFuncionarioPorMatricula)

router.put('/funcionarios/:matricula', atualizarFuncionario)

router.patch('/funcionarios/:matricula', atualizarFuncionario)

router.delete('/funcionarios/:matricula', deletarFuncionario)


export default router