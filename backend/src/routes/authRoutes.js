import express from 'express'
import { cadastrar, login } from '../controllers/authController.js'

const router = express.Router()


router.post('/cadastrar', cadastrar)

router.post('/login', login)

export default router