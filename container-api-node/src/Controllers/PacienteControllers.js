const Paciente = require('../Models/Paciente')
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
      ansiedade,
      depressao,
      familiar_ansiedade,
      familiar_depressao,
    } = req.body

    //Gerando um uuid  e uma senha com encriptada
    const id = v4(); 
    const hashPassword = await hash(password,8);
    const newPaciente = await Paciente.create({
      id,
      name,
      email,
      username,
      password : hashPassword,
      telefone,
      cep,
      data_nascimento,
      ansiedade,
      depressao,
      familiar_ansiedade,
      familiar_depressao
    })
    .then(() => {
      return res.status(201).json({
        erro: false,
        mensagem : "Usuario cadastrado com sucesso"
      })
    }).catch(() => {
      return res.status(400).json({
        erro : true,
        mensagem : "Erro ao cadastrar o usuario"
      })
    })

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
    const id_paciente = req.params.id
    const data = req.body
    await Paciente.update({where: {id: id_paciente}})
    .then(()=> {
      return res.status(201).json({
        erro: false,
        mensagem: "Usuário atualizado com sucesso"
      })
    }).catch(()=>{
      return res.status(400).json({
        erro: true,
        mensagem: "Não foi possivel atualizar o usuario"
      })
    })
  }

}