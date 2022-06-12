const express = require("express")

//Chamando os Controllers da nossa Aplicação
const PacienteControllers = require("./Controllers/PacienteControllers")
const QuestionarioControllers = require("./Controllers/QuestionarioController")
const ProfissionalControllers = require("./Controllers/ProfissionalControllers")

const Authenticate =  require("./Middlewares/authenticate")

const routes = express.Router()

routes.get('/' , (req,res) => {
  return res.send("<h1>Index Api-Node MindData</h1>")
})

//Rotas do CRUD simples de Pacientes
routes.get('/paciente/:id', Authenticate.paciente , PacienteControllers.readOne)
routes.post('/paciente' , PacienteControllers.cadastrar)
routes.put('/paciente/:id' , PacienteControllers.update)
routes.delete('/paciente/:id' , PacienteControllers.delete)

//Rotas para Paciente fazer CRUD com questionarios
routes.get('/paciente/:id/Questionario' , QuestionarioControllers.allQuestionarios)
routes.get('/paciente/:id/Questionario/:questionario_id' , QuestionarioControllers.readOne)
routes.post('/paciente/:id/Questionario' , QuestionarioControllers.cadatrarQuestionario)
routes.put('/paciente/:id/Questionario/:questionario_id' , QuestionarioControllers.update)
routes.delete('/paciente/:id/Questionario/:questionario_id' , QuestionarioControllers.delete)

//Rotas do CRUD simples de Profissionais
routes.get('/profissional/:id',Authenticate.profissional , ProfissionalControllers.readOne)
routes.post('/profissional' , ProfissionalControllers.cadastrar)
routes.put('/profissional/:id' , ProfissionalControllers.update)
routes.delete('/profissional/:id' , ProfissionalControllers.delete)

//Rotas de Login de Pacientes e Profissionais
routes.post('/login/paciente' , PacienteControllers.login)
routes.post('/login/profissional' , ProfissionalControllers.login)

module.exports = routes