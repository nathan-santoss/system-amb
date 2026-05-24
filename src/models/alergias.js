import { DataTypes } from "sequelize"
import database from "../config/database.js"
import Funcionario from "./funcionarios.js"

const Alergia = database.define("Alergia", {
    id_alergia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descricao_alergia: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, { // configurações da tabela
    tableName: "tb_alergias",
    timestamps: true,
    createdAt: "data_registro",
    updatedAt: "atualizado_em"
})

Funcionario.hasMany(Alergia, {
    foreignKey: 'funcionario_matricula'
})

Alergia.belongsTo(Funcionario, {
    foreignKey: 'funcionario_matricula'
})

export default Alergia