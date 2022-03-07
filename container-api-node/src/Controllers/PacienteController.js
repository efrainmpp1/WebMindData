const Paciente = require("../Models/Paciente")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

class PacienteController {
  
  async read(req,res){
    const pacientes = await Paciente.findAll()
    return res.json(pacientes)
  }

  async readOne(req,res){
    const idPaciente = req.params.id
    const paciente = Paciente.findOne({where : {id : idPaciente }})
    //Retorna um statuscode para caso o paciente nao exista
    return paciente ? res.status(200).json(paciente) : res.status(204).json({
      status : "Não foi possivel encontrar esse paciente"
    })
  }

}

module.exports = new PacienteController