const Sequelize = require("sequelize")

const db = require("../database/index")

const Paciente = require("./Paciente")

/*
Pelo momento serão esses os atributos de um questionario
Quando se tenha um estudo melhor das perguntas a serem feitas 
e quais são relevantes, serão 
*/
const Questionario = db.define('questionarios' , {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  situacao:{
    type: Sequelize.INTEGER
  }
})

Questionario.belongsTo(Paciente , {
  constraint: true,
  foreignKey: 'id_paciente'
})

module.exports = Questionario