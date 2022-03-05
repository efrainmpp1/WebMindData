// Credenciais serão futuramente armazenadas nas variaveis de ambiente
module.exports = {
  dialect: 'postgres',
  host : 'localhost',
  username : 'postgres',
  password : 'postgres',
  database : 'db_app',
  define : {
    timestamps: true,
  }
}