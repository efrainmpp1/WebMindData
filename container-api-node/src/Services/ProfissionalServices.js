const Profissional = require("../Models/Profissional")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

module.exports = {
  async profissionalExists(username , email , telefone){
    const usernameExists = await Profissional.findOne({where:{username}}) ? true : false
    const emailExists = await Profissional.findOne({where:{email}}) ? true : false
    const telefoneExists = await Profissional.findOne({where:{telefone}}) ? true : false
    return {
      username: usernameExists,
      email: emailExists,
      telefone: telefoneExists
    }
  },
}