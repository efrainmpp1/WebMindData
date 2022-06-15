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
  async allQuestionarios(req,res){
    const paciente_id = req.params.id
    // Verificar se o Paciente existe
    const paciente = await Paciente.findByPk(paciente_id , {
      include: { association: 'questionarios', order: 'createdAt'},
    })
    
    if(!paciente){
      return res.status(400).json({
        erro: true,
        mensagem: "Paciente não encontrado"
      })
    }
    return res.status(200).json(paciente.questionarios)
  },
  async readOne(req,res){
    const questionario_id = req.params.questionario_id
    // Verificar se o Questionario existe
    const questionario = await Questionario.findByPk(questionario_id)
    if(!questionario){
      return res.status(400).json({
        erro: true,
        mensagem: "Não foi possivel encontrar o questionario"
      })
    }
    return res.status(200).json(questionario)
  },
  async update(req,res){
    const questionario_id = req.params.questionario_id
    const data = req.body
    await Questionario.update(data,{ where: {id: questionario_id}})
    .then(()=> {
      return res.status(201).json({
        erro: false,
        mensagem: "Questionario atualizado com sucesso"
      })
    }).catch(()=>{
      return res.status(400).json({
        erro: true,
        mensagem: "Não foi possivel atualizar o Questionario"
      })
    })
  },
  async delete(req,res){
    const questionario_id = req.params.questionario_id
    await Questionario.destroy({where: {
      id : questionario_id 
    }})
    .then(()=> {
      return res.status(200).json({
        erro: false,
        mensagem: "Questionario deletado com sucesso"
      })
    }).catch(()=>{
      return res.status(201).json({
        erro: true,
        mensagem: "Não foi possivel deletar o Questionario"
      })
    })
  }
}