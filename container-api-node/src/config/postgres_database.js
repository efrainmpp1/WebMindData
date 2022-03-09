require('dotenv').config();
const {
  DB_USER,
  DB_PWD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_DIALECT } = process.env
module.exports = {
  dialect: DB_DIALECT,
  host : DB_HOST,
  username : DB_USER,
  password : DB_PWD,
  database : DB_NAME,
  define : {
    timestamps: true,
  }
}