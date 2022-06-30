const Profissional = require("../Models/Profissional")
const ProfissionalServices = require("../Services/ProfissionalServices")
const SECRET_KEY_PROFISSIONAL = process.env.SECRET_KEY_PROFISSIONAL
const jwt = require('jsonwebtoken')
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

module.exports = {
  async cadastrar(req,res){
    const {password , ...data} = req.body

    //Gerando um uuid  e uma senha com encriptada
    const id = v4(); 
    const hashPassword = await hash(password,8);
    
    await Profissional.create({id,password:hashPassword,...data})
    .then(() => {
      return res.status(201).json({
        erro: false,
        mensagem : "Profissional cadastrado com sucesso"
      })
    }).catch(async () => {
      const exist = await ProfissionalServices.profissionalExists(data.username,data.email,data.telefone)
      return res.status(400).json({ 
        erro : true,
        exist,
        mensagem : "Erro ao cadastrar o Profissional"
      })
    })
  },
  async readAll(req,res){
    const profissionais = await Profissional.findAll()
    return res.status(200).json(profissionais)
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
  async readAllPacientes(req,res){
    const id_profissional = req.params.id
    const profissional = await Profissional.findByPk(id_profissional,{include:{association:'pacientes'}})
    //Retorna um statuscode para caso o profissional nao exista
    return profissional ? res.status(200).json(profissional.pacientes) : res.status(404).json({
      erro: true,
      mensagem: "Não foi possivel encontrar esse profissional"
    })
  },
  //Falta corrigir erro que a senha perde a criptografia
  async update(req,res){
    const {id ,...data} = req.body

    const profissional = await Profissional.findByPk(id)

    if(!profissional){
      return res.status(400).json({
        erro: true,
        mensagem: "Profissional não encontrado"
      })
    }
        
    const updated = {
      name : data.name ? data.name : profissional.name,
      username : data.username ? data.username : profissional.username,
      password : data.password ? await hash(data.password,8) : profissional.password,
      telefone : data.telefone ? data.telefone : profissional.telefone,
      cep : data.cep ? data.cep : profissional.cep,
      data_nascimento : data.data_nascimento ? data.data_nascimento : profissional.data_nascimento,
      formacao_profissional : data.formacao_profissional ? data.formacao_profissional : profissional.formacao_profissional,
    }  
    
    await Profissional.update( updated , {where: {id}})
    .then(()=> {
      return res.status(201).json({
        erro: false,
        mensagem: "Profissional atualizado com sucesso"
      })
    }).catch(async () => {
      const exist = await ProfissionalServices.profissionalExists(data.username,data.email,data.telefone)
      return res.status(400).json({
        erro: true,
        exist,
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
        mensagem: "Username ou senha não podem estar vazios"
      })
    }
    if(!ProfissionalServices.usernameExists(username)){
      return res.status(404).json({
        erro: true,
        mensagem: "Username ou senha incorretos"
      })
    }
    const profissional = await Profissional.findOne({where: {username: username}})
    if(await compare(password , profissional.password)){
      //Criando nosso token de acesso do usuario (por enquanto expira em 5 min)
      const token = jwt.sign({id_profissional : profissional.id} , SECRET_KEY_PROFISSIONAL , {expiresIn: 300});
      return res.status(200).json({
        erro: false,
        mensagem: "Profissional Logado com sucesso",
        token
      })
    }
    else{
      return res.status(404).json({
        erro: true,
        mensagem: "Username ou senha incorretos"
      })
    }
  }
}