'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('Profissionais', { 
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
      cep:{
        type:Sequelize.STRING,
      },
      data_nascimento:{
        type:Sequelize.DATEONLY,
        allowNull: false,
      },
      formacao_profissional:{
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      // Timestamps
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Profissionais');

  }
};
