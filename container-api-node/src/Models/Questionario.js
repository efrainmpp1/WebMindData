const { Model , DataTypes } = require("sequelize")

class Questionario extends Model {
  static init(connection){
    super.init({
      situacao: DataTypes.INTEGER
    },{
      sequelize: connection
    })
  }

  static associate(models){
    this.belongsTo(models.Paciente , {
      foreignKey: 'paciente_id',
      as: 'paciente'
    })
  }
}

module.exports = Questionario

