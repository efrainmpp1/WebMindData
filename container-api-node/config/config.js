require('dotenv').config();
const {
  DB_USER,
  DB_PWD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_DIALECT } = process.env
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: true,
  },
  test: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: true
  },
  production: {
    username: DB_USER,
    password: DB_PWD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
  }
};