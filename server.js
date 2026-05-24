import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { SyncDB } from './src/config/syncDB.js'
// importando as rotas para o código
import funcionarioRoutes from './src/routes/funcionarioRoutes.js'
import alergiaRoutes from './src/routes/alergiaRoutes.js'
import atendimentoRoutes from './src/routes/atendimentoRoutes.js'
import atestadoRoutes from './src/routes/atestadoRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Inicializa o Express
const app = express()
const PORT = process.env.PORT || 3000

// Middleware para JSON
app.use(express.json())

// Sincroniza banco de dados
SyncDB()


// Ligando as rotas
app.get('/', (req, res) => {
    res.send('API do Sistema de Ambulatório está online!')
})
// Ativa as rotas de funcionarios no servidor
app.use(funcionarioRoutes)
// Ativa as rotas de alergias no servidor
app.use(alergiaRoutes)
// Ativa as rotas de atendimento no servidor
app.use(atendimentoRoutes)
// Ativa as rotas de atestados no servidor
app.use(atestadoRoutes)

// Inicia servidor
app.listen(PORT, () => {
    console.log(`==== Servidor Express rodando na porta ${PORT} ====`)
})