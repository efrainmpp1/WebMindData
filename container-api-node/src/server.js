require('dotenv').config();
const express = require("express")
const routes = require("./routes")
const {SERVER_PORT} = process.env
require("./database/index")

const app = express()

app.use(express.json())
app.use(routes)

app.listen(SERVER_PORT , () => {
  console.log("Server is Runing")
})