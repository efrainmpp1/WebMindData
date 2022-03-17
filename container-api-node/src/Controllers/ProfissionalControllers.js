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
  async readOne(req,res){
    const id_profissional = req.params.id
    const profissional = await Profissional.findByPk(id_profissional)
    //Retorna um statuscode para caso o profissional nao exista
    return profissional ? res.status(200).json(profissional) : res.status(404).json({
      erro: true,
      mensagem: "Não foi possivel encontrar esse profissional"
    })
  },
  //Falta corrigir erro que a senha perde a criptografia
  async update(req,res){
    const id_profissional = req.params.id
    const data = req.body
    await Profissional.update({where: {id: id_profissional}})
    .then(()=> {
      return res.status(201).json({
        erro: false,
        mensagem: "Profissional atualizado com sucesso"
      })
    }).catch(()=>{
      return res.status(400).json({
        erro: true,
        mensagem: "Não foi possivel atualizar o usuario"
      })
    })
  },
  async delete(req,res){
    const id_profissional = req.params.id
    await Paciente.destroy({where: {id : id_profissional}})
    .then(()=> {
      return res.status(200).json({
        erro: false,
        mensagem: "Profissional deletado com sucesso"
      })
    }).catch(()=>{
      return res.status(201).json({
        erro: true,
        mensagem: "Não foi possivel deletar o profissional"
      })
    })
  }

}