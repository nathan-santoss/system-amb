import database from './database.js'

import Funcionario from '../models/funcionarios.js'
import Atendimento from '../models/atendimento.js'
import Alergia from '../models/alergias.js'
import Atestado from '../models/atestados.js'

export async function SyncDB() {
    try {
        await database.sync()

        console.log('==== BD sincronizado ====')
    } catch (error) {
        console.error('==== Erro ao sincronizar o banco de dados ====', error)
    }
}