import database from "./src/config/database.js"
import Funcionario from "./src/models/funcionarios.js"

async function iniciarSys(params) {
    try {
        await database.sync()
        console.log('BD sincronizado');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados: ', error)
    }    
}

iniciarSys()