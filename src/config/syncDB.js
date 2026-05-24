import database from "./database.js"
import Funcionario from './src/models/funcionarios.js'
import Atendimento from './src/models/atendimento.js'
import Alergia from './src/models/alergias.js'
import Atestado from './src/models/atestados.js'

export async function SyncDB(params) {
    try {
        await database.sync()
        console.log('==== BD sincronizado ====');
    } catch (error) {
        console.error('====== Erro ao sincronizar o banco de dados: ', error, ' ======')
    }    
}