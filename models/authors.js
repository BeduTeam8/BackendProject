const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

//REMOVE AFTER WORK STATUS CONF
//const Book = require("./book");

const Author = sequelize.define("Authors", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	bio: {//biography
		type: DataTypes.TEXT,
		allowNull: true,
	},
	prizes: {//premios-prizes
		type: DataTypes.TEXT,
		allowNull: true,
	},
});

//remove after checking working status
/*Author.hasMany(Book);
Book.belongsTo(Author);*/  

module.exports = Author;
