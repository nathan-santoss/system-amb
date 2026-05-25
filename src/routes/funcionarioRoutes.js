import express from `express`

import {
    cadastrarFuncionario,
    buscarFuncionarios,
    atualizarFuncionario,
    deletarFuncionario
} from `../controllers/funcionarioController.js`

const router = express.Router()

router.post(`/funcionarios`, cadastrarFuncionario)

router.get(`/funcionarios`, buscarFuncionarios)

router.put(`/funcionarios/:matricula`, atualizarFuncionario)
router.patch(`/funcionarios/:matricula`, atualizarFuncionario)

router.delete(`/funcionarios/:matricula`, deletarFuncionario)

export default router