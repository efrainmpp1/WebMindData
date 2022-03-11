const express = require("express")

const PacienteController = require("./Controllers/PacienteController")
const ProfissionalController = require("./Controllers/ProfissionalController")

const routes = express.Router()

routes.get('/' , (req,res) => {
  return res.send("<h1>Index Api-Node MindData</h1>")
})

//Rotas para CRUD do Paciente
routes.get('/paciente/:id' , PacienteController.readOne)
routes.post('/paciente' , PacienteController.cadastrar)
routes.put('/paciente/:id' , PacienteController.update)
routes.delete('/paciente/:id' , PacienteController.delete)

//Rotas para CRUD do Profissional
routes.get('/profissional/:id' , ProfissionalController.readOne)
routes.post('/profissional' , ProfissionalController.cadastrar)
routes.put('/profissional/:id' , ProfissionalController.update)
routes.delete('/profissional/:id' , ProfissionalController.delete)

module.exports = routes