const { Sequelize } = require("sequelize")
const db_Pg_Config = require("../config/postgres_database")

const Paciente = require("../Models/Paciente")
const Questionario = require("../Models/Questionario")

const connection = new Sequelize(db_Pg_Config)

connection.authenticate()
.then(() => {
  Paciente.init(connection)
  Questionario.init(connection)
  Questionario.associate(connection.models)
  Paciente.associate(connection.models)
  console.log("Conexão com DB PG realizada com Sucesso")
}).catch(() => {
  console.log("A conexão com o DB não pode ser realizada");
})

module.exports = connection