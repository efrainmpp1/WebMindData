const Paciente = require("../Models/Paciente")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

class PacienteServices {

  async pacienteExists(username , email , telefone){
    const usernameExists = await Paciente.findOne({where:{username}}) ? true : false
    const emailExists = await Paciente.findOne({where:{email}}) ? true : false
    const telefoneExists = await Paciente.findOne({where:{telefone}}) ? true : false
    return {
      username: usernameExists,
      email: emailExists,
      telefone: telefoneExists
    }
  }

  async usernameExists(username){
    return await Paciente.findOne({where:{username}}) ? true : false
  }

}

module.exports = new PacienteServices
