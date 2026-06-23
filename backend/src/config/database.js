import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega as variáveis do seu arquivo .env
dotenv.config();

const database = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST, // puxa o 'mysql-db'
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: false
    }
);

export default database;