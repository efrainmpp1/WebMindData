'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('profissionais', { 
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      name:{
        type: Sequelize.STRING , 
        allowNull : false,
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate :{
          isEmail: true
        },
        unique: true,
      },
      username:{
        type:  Sequelize.STRING,
        allowNull : false,
        unique : true,
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      telefone:{
        type: Sequelize.STRING,
        unique: true,
        allowNull:false,
      },
      cep_clinica:{
        type:Sequelize.STRING,
        allowNull: false,
      },
      data_nascimento:{
        type:Sequelize.DATE,
        allowNull: false,
      },
      formacao_profissional:{
        type: Sequelize.STRING,
        allowNull: false,
      } 
    });
     
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('profissionais');
     
  }
};
