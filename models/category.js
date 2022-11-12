const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Category = sequelize.define("Category", {
	genre: {
		type: DataTypes.STRING,
		//primaryKey: true, //COMENTED DUE TO MIGRATIONS ASSKING for ID attibute
	},
	description: {
		type: DataTypes.STRING,
	},
});

module.exports = Category;
