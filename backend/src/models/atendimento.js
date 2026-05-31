import { DataTypes } from "sequelize";
import database from "../config/database.js";
import Funcionario from "./funcionarios.js";

const Atendimento = database.define("Atendimento", {
    id_atendimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    queixa_principal: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    
    pressao_arterial: { 
        type: DataTypes.STRING(20), 
        allowNull: true 
    },
    
    temperatura: { 
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: true 
    },
    
    gravidade: { 
        type: DataTypes.STRING(20), 
        allowNull: false 
    }, // Ex: Verde, Amarelo, Vermelho
    
    acao_tomada: { 
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    
    local_encaminhamento: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
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
    },
    data_hora_saida: { 
        type: DataTypes.DATE, 
        allowNull: true 
    }

}, {
    tableName: "tb_atendimento",
    timestamps: true,
    createdAt: "data_hora_entrada", 
    updatedAt: "atualizado_em"
});

// Cria uma nova coluna na tabela de atendimentos

Funcionario.hasMany(Atendimento, { // informei que cada atendimento tem uma matricula
    foreignKey: 'funcionario_matricula' 
});

Atendimento.belongsTo(Funcionario, { //estou dizendo que este atendimento pertece ao funcionario e sua matricula
    foreignKey: 'funcionario_matricula' 
});

export default Atendimento