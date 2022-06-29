const { Model , DataTypes } = require("sequelize")

class PacienteProfissional extends Model {
  static init(connection){
    super.init({
      paciente_id: DataTypes.STRING,
      profissional_id: DataTypes.STRING,
    },{
      sequelize: connection,
      tableName: "Clinicas"
    })
  }
}

module.exports = PacienteProfissional