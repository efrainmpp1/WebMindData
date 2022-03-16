const express = require("express")

const PacienteControllers = require("./Controllers/PacienteControllers")
const QuestionarioControllers = require("./Controllers/QuestionarioController")
const ProfissionalControllers = require("./Controllers/ProfissionalControllers")

const routes = express.Router()

routes.get('/' , (req,res) => {
  return res.send("<h1>Index Api-Node MindData</h1>")
})

//Rotas do CRUD simples de Pacientes
routes.get('/paciente/:id' , PacienteControllers.readOne)
routes.post('/paciente' , PacienteControllers.cadastrar)
routes.put('/paciente/:id' , PacienteControllers.update)
routes.delete('/paciente/:id' , PacienteControllers.delete)

//Paciente preenchendo um questionario
routes.post('/paciente/:id/Questionario' , QuestionarioControllers.cadatrarQuestionario)
routes.get('/paciente/:id/Questionario' , QuestionarioControllers.pacienteQuestionarios)

//Rotas do CRUD simples de Profissionais
routes.post('/profissional' , ProfissionalControllers.cadastrar)

module.exports = routes