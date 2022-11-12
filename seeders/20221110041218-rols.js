'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [{"id":1,"rol":"admin","createdAt":new Date(),"updatedAt":new Date()},
    {"id":2,"rol":"user","createdAt":new Date(),"updatedAt":new Date()},
    {"id":3,"rol":"editorialCompany","createdAt":new Date(),"updatedAt":new Date()},
    {"id":4,"rol":"autorIndependent","createdAt":new Date(),"updatedAt":new Date()},
    {"id":5,"rol":"premiumUser","createdAt":new Date(),"updatedAt":new Date()}], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
