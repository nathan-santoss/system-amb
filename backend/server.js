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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public/pages'))

// middleware json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// rota inicial
// rota inicial
app.get('/', (req, res) => {
    res.redirect('/painel')
})

app.get('/painel', (req, res) => {
    res.render('painel', {
        tituloPagina: 'Painel'
    })
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