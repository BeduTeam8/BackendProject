'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Book', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      book_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      //FK to Authors model/table
      authorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Authors',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      publication_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      //FK to Category model/table
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Category',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      //FK to Editorial model/table
      editorialId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Editorial',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  //CHECK THE NUMBER OF FK FROM THE Models, TOTAL 3
  /*Book.hasOne(Category);
    Category.hasMany(Book);
    Book.hasOne(Editorial);
    Editorial.hasMany(Book);
    Book.hasOne(Author);
    Author.hasMany(Book);*/
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Book');
  }
};
