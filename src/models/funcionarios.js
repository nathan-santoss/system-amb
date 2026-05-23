import { DataTypes } from "sequelize";
import database from "../config/database.js";

const Funcionario = database.define("Funcionario",

  {
    matricula: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false, // não permite salvar sem matrícula
    },

    nome: {
      type: DataTypes.STRING(100),
      allowNull: false, // nome é obrigatório
    },

    cpf: {
      type: DataTypes.STRING(11),
      unique: true, // impede dois funcionários com o mesmo CPF
      allowNull: false, // CPF é obrigatório
    },

    cargo: {
      type: DataTypes.STRING(100),
      allowNull: false, // cargo é obrigatório
    },

    setor: {
      type: DataTypes.STRING(100),
      allowNull: false, // setor é obrigatório
    },

    nucleo: {
      type: DataTypes.STRING(40),
      allowNull: true, // eu deixaria opcional, porque nem todo funcionário pode ter núcleo
    },
  },

  {
    tableName: "tb_funcionarios",

    // Cria automaticamente os campos de controle de data.
    timestamps: true,

    // Renomeia createdAt para criado_em.
    createdAt: "criado_em",

    // Renomeia updatedAt para atualizado_em.
    updatedAt: "atualizado_em",
  }
)

export default Funcionario