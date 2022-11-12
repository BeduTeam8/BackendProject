const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
// const User = require("./users"); // declared but not used
const Book = require("./book");

const Library = sequelize.define("Library", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
});

Library.hasMany(Book);
Book.belongsTo(Library);

module.exports = Library;
