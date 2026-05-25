import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { SyncDB } from './src/config/syncDB.js'

// importando rotas
import funcionarioRoutes from './src/routes/funcionarioRoutes.js'
import alergiaRoutes from './src/routes/alergiaRoutes.js'
import atendimentoRoutes from './src/routes/atendimentoRoutes.js'
import atestadoRoutes from './src/routes/atestadoRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// inicializa express
const app = express()
const PORT = process.env.PORT || 3000

// middleware json
app.use(express.json())

// rota teste
app.get('/', (req, res) => {
    res.send(`API do Sistema de Ambulatório está online!`)
})

// ativando rotas
app.use(funcionarioRoutes)
app.use(alergiaRoutes)
app.use(atendimentoRoutes)
app.use(atestadoRoutes)

// sincroniza banco
SyncDB()

// inicia servidor
app.listen(PORT, () => {
    console.log(`==== Servidor Express rodando na porta ${PORT} ====`)
})