const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db");

const Rol = sequelize.define(
	"Roles",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		rol: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Rol;
