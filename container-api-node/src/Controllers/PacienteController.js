const Paciente = require("../Models/Paciente")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

class PacienteController {
  
  async readOne(req,res){
    const idPaciente = req.params.id
    const paciente = await Paciente.findOne({where : {id : idPaciente }})
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
      familiar_depressao
    } = req.body

    //gerar id e gerar senha criptografada(Futuramente estarão organizadas em PacientesServices)
    const id = v4(); 
    const hashPassword = await hash(password,8);

    // A tentativa de criar um paciente passará por verificações futuramente em PacientesServices
    // Melhorar futuramente o tratamento de erros
    await Paciente.create({
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
    .then(()=> {
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
  }

  //Falta colocar uma confirmação da senha para realizar o update e delete com segurança
  async update(req, res) {
    const idPaciente  = req.params.id
    await Paciente.update(req.body, {where: {id: idPaciente}})
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
    await Paciente.destroy({
        where: {
            id: idPaciente
        }
    })
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