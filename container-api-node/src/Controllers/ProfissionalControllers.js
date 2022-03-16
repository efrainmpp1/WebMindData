const Profissional = require("../Models/Profissional")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

module.exports = {
  async cadastrar(req,res){
    const {
      name,
      email,
      username,
      password,
      telefone,
      cep,
      data_nascimento,
      formacao_profissional
    } = req.body
    //Gerando um uuid  e uma senha com encriptada
    const id = v4(); 
    const hashPassword = await hash(password,8);
    
    const newProfissional = await Profissional.create({
      id,
      name,
      email,
      username,
      password : hashPassword,
      telefone,
      cep,
      data_nascimento,
      formacao_profissional
    })
    .then(() => {
      return res.status(201).json({
        erro: false,
        mensagem : "Profissional cadastrado com sucesso"
      })
    }).catch(() => {
      return res.status(400).json({
        erro : true,
        mensagem : "Erro ao cadastrar o Profissional"
      })
    })
  },

}