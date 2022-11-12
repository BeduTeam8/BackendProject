'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Editorial', {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey:true, 
        autoIncrement:true 
      },
      name: { 
        type: Sequelize.STRING,
        //primaryKey: true
        /*allowNull: false, 
        unique: true,*/
        //partes del modelo que creo faltan
        //no puede ser nulo
      },
      country: {
        type: Sequelize.STRING,
        /*allowNull: true,*/
        //partes del modelo que creo faltan
        //pude ser nulo
      },
      editorial_desc: {
        type: Sequelize.TEXT,
        /*allowNull: true,*/
        //partes del modelo que creo faltan
        //pude ser nulo
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Editorial');
  }
};
