const Profissional = require("../Models/Profissional")
const ProfissionalServices = require("../Services/ProfissionalServices")
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
    }).catch(async () => {
      const exist_username = await ProfissionalServices.usernameExists(username)
      const exist_email = await ProfissionalServices.emailExists(email)
      const exist_telefone = await ProfissionalServices.telefoneExists(telefone)
      return res.status(400).json({ 
        erro : true,
        exist_username,
        exist_email,
        exist_telefone,
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
  },
  async login(req,res){
    const { username , password } = req.body
    if(!username || !password){
      return res.status(400).json({
        erro: true,
        mensagem: "usuario ou senha não podem estar vazios"
      })
    }
    if(!ProfissionalServices.usernameExists(username)){
      return res.status(404).json({
        erro: true,
        mensagem: "username ou senha incorretos"
      })
    }
    const profissional = await Profissional.findOne({where: {username: username}})
    if(await compare(password , profissional.password)){
      return res.status(200).json({
        erro: false,
        mensagem: "Usuário Logado com sucesso"
      })
    }
    else{
      return res.status(404).json({
        erro: false,
        mensagem: "username ou senha incorretos"
      })
    }
  }
}