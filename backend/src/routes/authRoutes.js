import express from 'express';
import { login, cadastrar } from '../controllers/authController.js';

const router = express.Router();

router.post('/auth/login', login);

router.post('/auth/cadastrar', cadastrar);

export default router;