const { Model , DataTypes } = require("sequelize")

class Paciente extends Model {
  static init(connection){
    super.init({
      id: {
        type: DataTypes.STRING,
        primaryKey : true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      telefone: DataTypes.STRING,
      cep: DataTypes.STRING,
      data_nascimento: DataTypes.DATEONLY,
      ansiedade: DataTypes.BOOLEAN,
      depressao: DataTypes.BOOLEAN,
      familiar_ansiedade: DataTypes.BOOLEAN,
      familiar_depressao: DataTypes.BOOLEAN
    },{
      sequelize: connection
    })
  }

  static associate(models){
    this.hasMany(models.Questionario , {
      foreignKey: 'paciente_id',
      as: 'questionarios'
    })
  }
}

module.exports = Paciente

