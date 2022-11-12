const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./users");

const Order = sequelize.define(
	"Orders",
	{
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			//FOREIGNKEYS
		},
		payment_amount: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		order_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);

//FKrels between Tables
User.hasMany(Order, {
	foreignKey: "user_id",
	sourceKey: "id",
});
Order.belongsTo(User, {
	foreignKey: "user_id",
	targetKey: "id",
});

module.exports = Order;
