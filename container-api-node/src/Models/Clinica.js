const Sequelize = require("sequelize")

const db = require("../database/index")

const Clinica = db.define('clinicas' , {
  id:{
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})


module.exports = Clinica