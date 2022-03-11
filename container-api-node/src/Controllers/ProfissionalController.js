const Profissional = require("../Models/Profissional")
const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

class ProfissionalController {

  async readOne(req,res){
    const idProfissional = req.params.id
    const profissional = await Profissional.findOne({where : {id : idProfissional }})
    //Retorna um statuscode para caso o profissional nao exista
    return profissional ? res.status(200).json(profissional) : res.status(204).send()
  }

  async cadastrar(req,res){
    const {
      name,
      email,
      username,
      password,
      telefone,
      cep_clinica,
      data_nascimento,
      formacao_profissional
    } = req.body

    //gerar id e gerar senha criptografada(Futuramente estarão organizadas em ProfissionalServices)
    const id = v4(); 
    const hashPassword = await hash(password,8);

    // A tentativa de criar um profissional passará por verificações futuramente em ProfissionalServices
    // Melhorar futuramente o tratamento de erros
    await Profissional.create({
      id,
      name,
      email,
      username,
      password : hashPassword,
      telefone,
      cep_clinica,
      data_nascimento,
      formacao_profissional
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
    const idProfissional  = req.params.id
    await Profissional.update(req.body, {where: {id: idProfissional}})
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
    const idProfissional = req.params.id
    await Profissional.destroy({
        where: {
            id: idProfissional
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

module.exports = new ProfissionalController