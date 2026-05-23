import { DataTypes } from "sequelize"
import database from "../config/database.js"

export const funcionario = database.define('Funcionario', {
    matricula: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    cargo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    setor: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
})