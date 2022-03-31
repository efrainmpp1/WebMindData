const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

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
    jwt.verify(authtoken , SECRET_KEY , (err , decoded) =>{
      if(err || decoded.id_paciente != req.params.id){
        return res.status(401).json({
          erro: true,
          mensagem: "Usuario Não Autorizado"
        })
      }
      // se tudo estiver ok, salva no request para uso posterior
      //req.id = decoded.userID;
      next()
    })
  }
}

module.exports = new Authenticate