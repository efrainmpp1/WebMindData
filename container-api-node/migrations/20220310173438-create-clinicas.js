'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('clinicas', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_profissional:{
        type: Sequelize.STRING,
        references:{ // Profissional has many Pacientes n:n
          model: 'profissionais', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      id_paciente:{
        type: Sequelize.STRING,
        references:{ // Paciente has many Profissionais n:n
          model: 'pacientes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE, 
    });
    
  },

  async down (queryInterface, Sequelize) {
      
    await queryInterface.dropTable('clinicas');
    
  }
};
