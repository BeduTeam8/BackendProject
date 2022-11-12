'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rating: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0, // 5/2=2.5 NEUTRAL Answer ,5 All right,0 NOTHING
      },
      //FK to Users model/table
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      //FK to Book model/table
      book_id: {
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
  
  //CHECK THE NUMBER OF FK FROM THE Models, TOTAL 2
  /*/FKrels between Tables
  User.hasMany(Review, {
    foreignKey: "user_id",
    sourceKey: "id",
  });
  Review.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
  });
  
  Book.hasMany(Review, {
    foreignKey: "book_id",
    sourceKey: "id",
  });
  Review.belongsTo(Book, {
    foreignKey: "book_id",
    targetKey: "id",
  });
});*/
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};
