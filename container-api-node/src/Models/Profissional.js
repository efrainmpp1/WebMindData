const { Model , DataTypes } = require("sequelize")

class Profissional extends Model {
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
      formacao_profissional: DataTypes.STRING,
    },{
      sequelize: connection
    })
  }

  static associate(models){
    this.belongsToMany(models.Paciente , {
      foreignKey: 'profissional_id',
      through: 'Clinicas',
      as : 'pacientes'
    })
  }
}

module.exports = Profissional

