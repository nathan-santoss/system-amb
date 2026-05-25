import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { SyncDB } from './src/config/syncDB.js'

import funcionarioRoutes from './src/routes/funcionarioRoutes.js'
import alergiaRoutes from './src/routes/alergiaRoutes.js'
import atendimentoRoutes from './src/routes/atendimentoRoutes.js'
import atestadoRoutes from './src/routes/atestadoRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('API do Sistema de Ambulatório está online!')
})

app.use(funcionarioRoutes)
app.use(alergiaRoutes)
app.use(atendimentoRoutes)
app.use(atestadoRoutes)

SyncDB()

app.listen(PORT, () => {
    console.log(`==== Servidor Express rodando na porta ${PORT} ====`)
})