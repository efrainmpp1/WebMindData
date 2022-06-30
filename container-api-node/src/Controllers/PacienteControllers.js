const Paciente = require('../Models/Paciente')
const PacienteServices = require("../Services/PacienteServices")
const SECRET_KEY_PACIENTE = process.env.SECRET_KEY_PACIENTE
const jwt = require('jsonwebtoken')
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")
module.exports = {
  async cadastrar(req,res){
    const { password , ...data } = req.body
    //Gerando um uuid  e uma senha com encriptada
    const id = v4(); 
    const hashPassword = await hash(password,8);

    await Paciente.create({id,password:hashPassword,...data})
    .then(() => {
      return res.status(201).json({
        erro: false,
        mensagem : "Paciente cadastrado com sucesso"
      })
    }).catch(async () => {
      const exist = await PacienteServices.pacienteExists(data.username,data.email,data.telefone)
      return res.status(400).json({
        erro : true,
        exist,
        mensagem : "Erro ao cadastrar o usuario"
      })
    })

  },
  async readAll(req,res){
    const pacientes = await Paciente.findAll()
    return res.status(200).json(pacientes)
  },
  async readOne(req,res){
    const id_paciente = req.params.id
    const paciente = await Paciente.findByPk(id_paciente)
    //Retorna um statuscode para caso o paciente nao exista
    return paciente ? res.status(200).json(paciente) : res.status(404).json({
      erro: true,
      mensagem: "Não foi possivel encontrar esse usuario"
    })
  },
  async readAllProfissionais(req,res){
    const id_paciente = req.params.id
    const paciente = await Paciente.findByPk(id_paciente,{include:{association:'profissionais'}})
    //Retorna um statuscode para caso o paciente nao exista
    return paciente ? res.status(200).json(paciente.profissionais) : res.status(404).json({
      erro: true,
      mensagem: "Não foi possivel encontrar esse Paciente"
    })
  },
  async delete(req,res){
    const id_paciente = req.params.id
    await Paciente.destroy({where: {id : id_paciente}})
    .then(()=> {
      return res.status(200).json({
        erro: false,
        mensagem: "Paciente deletado com sucesso"
      })
    }).catch(()=>{
      return res.status(201).json({
        erro: true,
        mensagem: "Não foi possivel deletar o paciente"
      })
    })
  },
  //Falta corrigir erro que a senha perde a criptografia
  async update(req,res){
    const {id ,...data} = req.body

    const paciente = await Paciente.findByPk(id)

    if(!paciente){
      return res.status(400).json({
        erro: true,
        mensagem: "Paciente não encontrado"
      })
    }
    
    const updated = {
      name : data.name ? data.name : paciente.name,
      username : data.username ? data.username : paciente.username,
      password : data.password ? await hash(data.password,8) : paciente.password,
      telefone : data.telefone ? data.telefone : paciente.telefone,
      cep : data.cep ? data.cep : paciente.cep,
      data_nascimento : data.data_nascimento ? data.data_nascimento : paciente.data_nascimento,
      ansiedade : data.ansiedade ? data.ansiedade : paciente.ansiedade,
      depressao : data.depressao ? data.depressao : paciente.depressao,
      familiar_ansiedade : data.familiar_ansiedade ? data.familiar_ansiedade : paciente.familiar_ansiedade,
      familiar_depressao : data.familiar_depressao ? data.familiar_depressao : paciente.familiar_depressao,
    }

    await Paciente.update(updated,{where: {id}})
    .then(()=> {
      return res.status(201).json({
        erro: false,
        mensagem: "Usuário atualizado com sucesso"
      })
    }).catch(async ()=>{
      const exist = await ProfissionalServices.profissionalExists(data.username,data.email,data.telefone)
      return res.status(400).json({
        erro: true,
        exist,
        mensagem: "Não foi possivel atualizar o usuario"
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
    if(!PacienteServices.usernameExists(username)){
      return res.status(404).json({
        erro: true,
        mensagem: "username ou senha incorretos"
      })
    }
    const paciente = await Paciente.findOne({where: {username: username}})
    if(await compare(password , paciente.password)){
      //Criando nosso token de acesso do usuario (por enquanto expira em 5 min)
      const token = jwt.sign({id_paciente : paciente.id} , SECRET_KEY_PACIENTE , {expiresIn: 300}); 
      return res.status(200).json({
        erro: false,
        mensagem: "Paciente Logado com sucesso",
        token
      })
    }
    return res.status(404).json({
      erro: true,
      mensagem: "username ou senha incorretos"
    })
  }
}