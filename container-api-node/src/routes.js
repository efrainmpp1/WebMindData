const express = require("express")

const PacienteController = require("./Controllers/PacienteController")

const routes = express.Router()

routes.get('/' , (req,res) => {
  return res.send("<h1>Index Api-Node MindData</h1>")
})

routes.get('/all_pacientes' , PacienteController.read)

routes.get('/paciente/:id' , PacienteController.readOne)

module.exports = routes