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
      return res.json({
        erro: false,
        mensagem : "Usuario cadastrado com sucesso"
      });
    }).catch(() => {
      return res.status(400).json({
        erro : true,
        mensagem : "Erro ao cadastrar o usuario"
      })
    })
  }

}

module.exports = new PacienteController