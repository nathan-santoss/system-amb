import { Sequelize } from "sequelize"
import mysql from 'mysql2/promise'
import 'dotenv/config'

const dbHost = process.env.DB_HOST;
const dbUsuario = process.env.DB_USER;
const dbSenha = process.env.DB_PASS;
const dbNome = process.env.DB_NAME;
const dbPort = process.env.DB_PORT

const conexaoSQL = await mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUsuario,
    password: dbSenha
})
await conexaoSQL.query(`CREATE DATABASE IF NOT EXISTS \`${dbNome}\`;`) //tenta ver se existe, se não, cria
await conexaoSQL.end()

const database = new Sequelize(
    dbNome,
    dbUsuario,
    dbSenha,
    {
        host: dbHost,
        dialect: 'mysql',
        port: dbPort
    }
)

database.authenticate().then(() => {
    console.log('Conexão com o banco estabelecida com sucesso!')}
).catch((error) => {
    console.error('Erro ao tentar conectar ao banco: ', error);
})

export default database