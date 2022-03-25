const Profissional = require("../Models/Profissional")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

module.exports = {
  async usernameExists(username){
    const existe = await Profissional.findOne({where: {username: username}}) ? true : false
    return existe
  },
  async emailExists(email){
    const existe = await Profissional.findOne({where: {email: email}}) ? true : false
    return existe
  },
  async telefoneExists(telefone){
    const existe = await Profissional.findOne({where: {telefone: telefone}}) ? true : false
    return existe
  },
}