const {v4} = require("uuid")
const {hash , compare} = require("bcrypt")

module.exports = {
  async gerarIdPasswordHash(password){
    const id = v4(); 
    const hashPassword = await hash(password,8)
    return {id: id , hashPassword: hashPassword}
  },
}