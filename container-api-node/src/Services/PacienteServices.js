const Paciente = require("../Models/Paciente")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

class PacienteServices {

  async usernameExists(username){
    const existe = await Paciente.findOne({where: {username: username}}) ? true : false
    return existe
  }

  async emailExists(email){
    const existe = await Paciente.findOne({where: {email: email}}) ? true : false
    return existe
  }

  async telefoneExists(telefone){
    const existe = await Paciente.findOne({where: {telefone: telefone}}) ? true : false
    return existe
  }

}

module.exports = new PacienteServices
