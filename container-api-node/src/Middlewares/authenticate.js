const jwt = require('jsonwebtoken')
const {SECRET_KEY_PACIENTE,SECRET_KEY_PROFISSIONAL} = process.env

class Authenticate {
  paciente = (req , res , next) => {
    //Recuperando token do Header da requisição
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({
        erro: true,
        mensagem: "Usuario Não Logado"
      })
    }
    const [bearer, authtoken] = token.split(" ");
    jwt.verify(authtoken , SECRET_KEY_PACIENTE , (err , decoded) =>{
      if(err){
        return res.status(401).json({
          erro: true,
          mensagem: "Usuario Não Autorizado"
        })
      }
      next()
    })
  }
  profissional = (req, res , next) => {
    //Recuperando token do Header da requisição
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({
        erro: true,
        mensagem: "Profissional Não Logado"
      })
    }
    const [bearer, authtoken] = token.split(" ");
    jwt.verify(authtoken , SECRET_KEY_PROFISSIONAL , (err , decoded) =>{
      if(err){
        return res.status(401).json({
          erro: true,
          mensagem: "Profissional Não Autorizado"
        })
      }
      next()
    })
  }
}

module.exports = new Authenticate