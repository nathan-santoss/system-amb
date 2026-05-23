import { DataTypes } from "sequelize";
import database from "../config/database.js";
import Funcionario from "./funcionarios.js";

const Hierarquia = database.define('Hierarquia', {
    id_hierarquia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    funcionario_matricula: {
        type: DataTypes.STRING(20),
        allowNull: false,

        references: {
            model: Funcionario,
            key: 'matricula'
        }
    }

})