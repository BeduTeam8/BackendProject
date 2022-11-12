const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db");
const Book = require("./book");
const User = require("./users");

const Review = sequelize.define(
	"Reviews",
	{
		review: {
			type: DataTypes.TEXT("tiny"),
			allowNull: true,
		},
		rating: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			defaultValue: 0, // 5/2=2.5 NEUTRAL Answer ,5 All right,0 NOTHING
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			//FOREIGNKEYS
		},
		book_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			//FOREIGNKEYS
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

//FKrels between Tables
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

module.exports = Review;
