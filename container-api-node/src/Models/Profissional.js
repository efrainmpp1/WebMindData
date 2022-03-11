const Sequelize = require("sequelize")

const db = require("../database/index")

const Paciente = require("./Paciente")
const Clinica = require("./Clinica")

//Pelo momento são esses os atributos que regem o profissional
const Profissional = db.define('profissionais', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING , 
    allowNull : false,
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
    validate :{
      isEmail: true
    },
    unique: true,
  },
  username:{
    type:  Sequelize.STRING,
    allowNull : false,
    unique : true,
  },
  password:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  telefone:{
    type: Sequelize.STRING,
    unique: true,
    allowNull:false,
  },
  cep_clinica:{
    type:Sequelize.STRING,
  },
  data_nascimento:{
    type:Sequelize.DATEONLY,
    allowNull: false,
  },
  formacao_profissional:{
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Profissional.belongsToMany( Paciente , {
  through:{
    model: Clinica
  },
  foreignKey: 'id_profissional',
  constraint: true 
})

Paciente.belongsToMany( Profissional , {
  through:{
    model: Clinica
  },
  foreignKey: 'id_paciente',
  constraint: true 
})

module.exports = Profissional