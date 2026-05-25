import express from `express`

import {
    emitirAtestado,
    buscarAtestadosPorFuncionario,
    atualizarAtestado,
    deletarAtestado
} from `../controllers/atestadoController.js`

const router = express.Router()

router.post(`/atestados`, emitirAtestado)

router.get(`/atestados/:matricula`, buscarAtestadosPorFuncionario)

router.put(`/atestados/:id`, atualizarAtestado)
router.patch(`/atestados/:id`, atualizarAtestado)

router.delete(`/atestados/:id`, deletarAtestado)

export default router   