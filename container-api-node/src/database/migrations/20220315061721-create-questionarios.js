'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('Questionarios', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      paciente_id:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{ model: 'Pacientes' , key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      situacao: Sequelize.INTEGER,
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
     
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Questionarios');

  }
};
