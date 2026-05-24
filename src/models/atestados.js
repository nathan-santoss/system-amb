import { DataTypes } from "sequelize"
import database from "../config/database.js"
import Funcionario from "./funcionarios.js"

const Atestado = database.define("Atestado", {
    id_atestado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    data_emissao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tipo_afastamento: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cid_codigo: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    caminho_anexo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    supervisor_na_epoca: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    coordenador_na_epoca: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    gerente_na_epoca: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: "tb_atestados",
    timestamps: true,
    createdAt: "data_registro",
    updatedAt: "atualizado_em"
})

Funcionario.hasMany(Atestado, {
    foreignKey: 'funcionario_matricula'
})

Atestado.belongsTo(Funcionario, {
    foreignKey: 'funcionario_matricula'
})

export default Atestado