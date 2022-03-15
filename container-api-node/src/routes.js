const express = require("express")

const PacienteControllers = require("./Controllers/PacienteControllers")
const QuestionarioControllers = require("./Controllers/QuestionarioController")

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
routes.get('/paciente/:id/Questionario' , QuestionarioControllers.getQuestionarios)

module.exports = routes