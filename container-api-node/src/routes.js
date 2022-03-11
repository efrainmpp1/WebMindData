const express = require("express")

const PacienteController = require("./Controllers/PacienteController")

const routes = express.Router()

routes.get('/' , (req,res) => {
  return res.send("<h1>Index Api-Node MindData</h1>")
})

//Rotas do CRUD do Paciente
routes.get('/paciente/:id' , PacienteController.readOne)
routes.post('/paciente' , PacienteController.cadastrar)
routes.put('/paciente/:id' , PacienteController.update)
routes.delete('/paciente/:id' , PacienteController.delete)


module.exports = routes