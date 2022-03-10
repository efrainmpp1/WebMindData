'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('questionarios', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      id_paciente:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{  //  belongsTo pacientes 1:1
          model: 'pacientes',
          key: 'id'
        }
      },
      situacao:{
        type: Sequelize.INTEGER
      },
      // Timestamps
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

  },
  
  async down (queryInterface, Sequelize) {
  
   await queryInterface.dropTable('questionarios');
  
  }
};
