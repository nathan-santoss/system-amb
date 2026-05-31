import express from 'express'
import { cadastrar, login } from '../controllers/authController.js'

const router = express.Router()


router.post('/auth/cadastrar', cadastrar)

router.post('/auth/login', login)

export default router