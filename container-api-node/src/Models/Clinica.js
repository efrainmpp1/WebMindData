const Sequelize = require("sequelize")

const db = require("../database/index")

const Clinica = db.define('clinica' , {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false
  }
})


module.exports = Clinica