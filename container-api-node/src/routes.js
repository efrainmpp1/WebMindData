const express = require("express")

//Chamando os Controllers da nossa Aplicação
const PacienteControllers = require("./Controllers/PacienteControllers")
const QuestionarioControllers = require("./Controllers/QuestionarioController")
const ProfissionalControllers = require("./Controllers/ProfissionalControllers")
const PacienteProfissional = require("./Controllers/PacienteProfissional")

const Authenticate =  require("./Middlewares/authenticate") // Classe de Autenticação

const routes = express.Router()

routes.get('/' , (req,res) => {
  return res.send("<h1>Index Api-Node MindData</h1>")
})
//Rotas futuramente para Admins
routes.get('/paciente',PacienteControllers.readAll) 
routes.get('/profissional',ProfissionalControllers.readAll)

//Rotas do CRUD simples de Pacientes
routes.get('/paciente/:id', Authenticate.paciente , PacienteControllers.readOne)
routes.post('/paciente' , PacienteControllers.cadastrar)
routes.put('/paciente' ,Authenticate.paciente ,PacienteControllers.update)
routes.delete('/paciente/:id' , Authenticate.paciente ,PacienteControllers.delete)

//Rotas para Paciente fazer CRUD com questionarios
routes.get('/paciente/:id/Questionario' ,Authenticate.paciente ,QuestionarioControllers.allQuestionarios)
routes.get('/paciente/:id/Questionario/:questionario_id' ,Authenticate.paciente ,QuestionarioControllers.readOne)
routes.post('/paciente/:id/Questionario' ,Authenticate.paciente ,QuestionarioControllers.cadatrarQuestionario)
routes.put('/paciente/:id/Questionario/:questionario_id' ,Authenticate.paciente ,QuestionarioControllers.update)
routes.delete('/paciente/:id/Questionario/:questionario_id' ,Authenticate.paciente ,QuestionarioControllers.delete)

//Rotas do CRUD simples de Profissionais
routes.get('/profissional/:id',Authenticate.profissional , ProfissionalControllers.readOne)
routes.post('/profissional' , ProfissionalControllers.cadastrar)
routes.put('/profissional' ,Authenticate.profissional,ProfissionalControllers.update)
routes.delete('/profissional/:id' ,Authenticate.profissional,ProfissionalControllers.delete)

//Rotas de Profissionais interagirem com Pacientes
routes.get('/profissional/:id/paciente',ProfissionalControllers.readAllPacientes)
routes.get('/paciente/:id/profissional', PacienteControllers.readAllProfissionais)
routes.post('/PacienteProfissional' , PacienteProfissional.associar)
routes.delete('/PacienteProfissional',PacienteProfissional.delete)

//Rotas de Login de Pacientes e Profissionais
routes.post('/login/paciente' , PacienteControllers.login)
routes.post('/login/profissional' , ProfissionalControllers.login)

module.exports = routes