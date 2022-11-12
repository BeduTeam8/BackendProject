'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Library', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
       //FK to Library model/table
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Book',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  //CHECK THE NUMBER OF FK FROM THE Models, TOTAL 3
  /*Library.hasMany(Book);
    Book.belongsTo(Library);*/
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Library');
  }
};
