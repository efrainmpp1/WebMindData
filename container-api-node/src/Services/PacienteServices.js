const Paciente = require("../Models/Paciente")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

class PacienteServices {

  async pacienteExists(email , username , telefone){
    const emailExist = await Paciente.findOne({where: {email: email}}) ? true : false
    const usernameExist = await Paciente.findOne({where: {username: username}}) ? true : false
    const telefoneExists = await Paciente.findOne({where: {telefone: telefone}}) ? true : false

    return {
      "emailExists" : emailExist,
      "usernameExists" : usernameExist,
      "telefoneExists": telefoneExists
    }
  }

}

module.exports = new PacienteServices
