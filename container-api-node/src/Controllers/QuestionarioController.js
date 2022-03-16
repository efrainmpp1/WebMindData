const Paciente = require("../Models/Paciente")
const Questionario = require("../Models/Questionario")

module.exports = {
  async cadatrarQuestionario(req,res){
    const paciente_id = req.params.id
    const { situacao } = req.body

    // Verificar se o Paciente existe
    const paciente = await Paciente.findByPk(paciente_id)
    if(!paciente){
      return res.status(400).json({
        erro: true,
        mensagem: "Paciente não encontrado"
      })
    }

    const questionario = await Questionario.create({
      paciente_id,
      situacao
    })
    return res.status(201).json({
      erro: false,
      mensagem: "Questionario Salvo com sucesso",
      questionario: questionario
    })
  },
  async pacienteQuestionarios(req,res){
    const paciente_id = req.params.id
    // Verificar se o Paciente existe
    const paciente = await Paciente.findByPk(paciente_id , {
      include: { association: 'questionarios'}
    })
    if(!paciente){
      return res.status(400).json({
        erro: true,
        mensagem: "Paciente não encontrado"
      })
    }
    return res.status(200).json(paciente.questionarios)
  }
}