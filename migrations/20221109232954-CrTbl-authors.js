'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Authors', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bio: {//biography
        type: Sequelize.TEXT,
        allowNull: true,
      },
      prizes: {//premios-prizes
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Authors');
  }
};
