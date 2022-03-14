const Paciente = require("../Models/Paciente")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")
const PacienteServices = require("../Services/PacienteServices")
const Profissional = require("../Models/Profissional")

class PacienteController {
  
  async readOne(req,res){
    const idPaciente = req.params.id
    const paciente = await Paciente.findByPk(idPaciente , {
      include: [{
        model: Profissional,
        as: 'profissionais',
        through: {attributes: []}
      }]
    })
    //Retorna um statuscode para caso o paciente nao exista
    return paciente ? res.status(200).json(paciente) : res.status(204).send()
  }

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

    //Verificando se os dados ja pertencem a algum paciente existente
    const existe = await PacienteServices.pacienteExists(email , username , telefone)

    //Gerando um uuid  e uma senha com encriptada
    const id = v4(); 
    const hashPassword = await hash(password,8);
    // Melhorar futuramente o tratamento de erros
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
      familiar_depressao,
    })
    .then(() => {
      return res.status(201).json({
        erro: false,
        mensagem : "Usuario cadastrado com sucesso"
      })
    }).catch(() => {
      return res.status(400).json({
        exists: existe,
        erro : true,
        mensagem : "Erro ao cadastrar o usuario"
      })
    })
  }

  async update(req, res) {
    const idPaciente  = req.params.id
    const data = req.body
    await Paciente.update(data, {where: {id: idPaciente}})
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

  async delete(req , res) {
    const idPaciente = req.params.id
    await Paciente.destroy({ where: {id: idPaciente}})
    .then(()=> {
      return res.status(200).json({
        erro: false,
        mensagem: "Usuário deletado com sucesso"
      })
    }).catch(()=>{
      return res.status(201).json({
        erro: true,
        mensagem: "Não foi possivel atualizar o usuario"
      })
    })
  }


}

module.exports = new PacienteController