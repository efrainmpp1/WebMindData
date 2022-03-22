'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('Clinicas', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      profissional_id:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{ model: 'Profissionals' , key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      paciente_id:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{ model: 'Pacientes' , key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await queryInterface.dropTable('Clinicas');

  }
};
