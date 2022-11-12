'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      //FK to LUsers model/table
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      payment_amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  
  //CHECK THE NUMBER OF FK FROM THE Models, TOTAL 1
  /*//FKrels between Tables
  User.hasMany(Order, {
    foreignKey: "user_id",
    sourceKey: "id",
  });
  Order.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
  });
});*/
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
