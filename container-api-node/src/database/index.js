const Sequelize = require("sequelize")
const db_Pg_Config = require("../config/postgres_database")

const connection = new Sequelize(db_Pg_Config)

connection.authenticate()
.then(() => {
  console.log("Conexão com DB PG realizada com Sucesso")
  connection.sync() //Buscar uma forma de fazer migrations
}).catch(() => {
  console.log("A conexão com o DB não pode ser realizada");
})

module.exports = connection