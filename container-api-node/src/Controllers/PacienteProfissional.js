const Paciente = require('../Models/Paciente')
const Profissional = require('../Models/Profissional')
const PacienteProfissional = require("../Models/PacienteProfissional")

module.exports = {
  async associar(req,res){
    const {paciente_id,profissional_id} = req.body
    if(!paciente_id || !profissional_id){
      return res.status(400).json({
        erro: true,
        mensagem: "Paciente ou Profissional não podem estar vazios"
      })
    }
    const paciente = await Paciente.findByPk(paciente_id)
    if(!paciente){
      return res.status(400).json({
        erro: true,
        mensagem: "Paciente não Encontrado"
      })
    }
    const profissional = await Profissional.findByPk(profissional_id)
    if(!profissional){
      return res.status(400).json({
        erro: true,
        mensagem: "Profissional não Encontrado"
      })
    }
    //Fazer a checagem se a relacao ja existe
    association_exist = await PacienteProfissional.findOne({where : {paciente_id , profissional_id}})

    if(association_exist){
      return res.status(400).json({
        erro: true,
        mensagem: "A associacao de Paciente com Profissional ja existe"
      })
    }

    //fazer link  Paciente Profissional
    await PacienteProfissional.create({ paciente_id , profissional_id })
    .then(() => {
      return res.status(200).json({
        erro: false,
        mensagem: "Profissional Adicionado com Sucesso em sua Lista"
      })
    })
    .catch((err)=>{
      return res.status(400).json({
        erro: true,
        mensagem: "Não foi possivel realizar a operação"
      })
    })
  }
}