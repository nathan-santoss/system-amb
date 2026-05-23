import { Sequelize } from "sequelize"
import 'dotenv/config'

const dbHost = process.env.DB_HOST;
const dbUsuario = process.env.DB_USER;
const dbSenha = process.env.DB_PASS;
const dbNome = process.env.DB_NAME;
const dbPort = process.env.DB_PORT

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

