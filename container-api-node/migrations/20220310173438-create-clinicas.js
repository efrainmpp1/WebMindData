'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('clinicas', { 
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false
      },
      id_profissional:{
        type: Sequelize.STRING,
        references:{ // Profissional has many Pacientes n:n
          model: 'profissionais', 
          key: 'id'
        }
      },
      id_paciente:{
        type: Sequelize.STRING,
        references:{ // Paciente has many Profissionais n:n
          model: 'pacientes',
          key: 'id'
        }
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
