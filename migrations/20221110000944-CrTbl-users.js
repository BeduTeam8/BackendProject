'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isLowercase: true,
          is: /^[a-z0-9_-]+$/,
        },
      },
    
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // se revisa que el dato sea un email
        },
      },
      /*userpass: {
        type: Sequelize.STRING,
        allowNull: false,
      },*/
      password_hash: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      password_salt: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      phonenumber: {
        type: Sequelize.STRING,
      },
      membersince: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      credit_card_type: { type: Sequelize.CHAR(50) },
      credit_card: {
        type: Sequelize.TEXT,
        allowNull: true,
        /*validate: {
                isCreditCard: true
            }*/
      },
      rol: {
        // defaultValue: "2", review en mysql
        type: Sequelize.INTEGER,
        allowNull: false,
      },
       //FK to Library model/table
      libraryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Library',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      //FK to Rol model/table
      rolId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  
  //CHECK THE NUMBER OF FK FROM THE Models, TOTAL 2
  /*User.hasMany(Library);
Library.hasMany(User);

Rol.hasMany(User, {
	foreignKey: "rol",
	sourceKey: "id",
});
User.belongsTo(Rol, {
	foreignKey: "rol",
	targetKey: "id",
});*/
  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
