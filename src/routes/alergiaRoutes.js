import express from `express`

import {
    cadastrarAlergia,
    buscarAlergiasPorFuncionario,
    atualizarAlergia,
    deletarAlergia
} from `../controllers/alergiaController.js`

const router = express.Router()

router.post(`/alergias`, cadastrarAlergia)

router.get(`/alergias/:matricula`, buscarAlergiasPorFuncionario)

router.put(`/alergias/:id`, atualizarAlergia)
router.patch(`/alergias/:id`, atualizarAlergia)

router.delete(`/alergias/:id`, deletarAlergia)

export default router