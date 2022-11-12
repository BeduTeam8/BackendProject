'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      rol: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};
