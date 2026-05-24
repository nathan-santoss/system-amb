import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { SyncDB } from './src/config/syncDB.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Inicializa o Express
const app = express()
const PORT = process.env.PORT || 3000

// Middleware para JSON
app.use(express.json())

// Sincroniza banco de dados
SyncDB()

// Rota teste
app.get('/', (req, res) => {
    res.send('API do Sistema de Ambulatório está online!')
})

// Inicia servidor
app.listen(PORT, () => {
    console.log(`==== Servidor Express rodando na porta ${PORT} ====`)
})