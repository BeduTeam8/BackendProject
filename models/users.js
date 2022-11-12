const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("crypto");

const jwt = require("jsonwebtoken"); // Genera los JWT
const secret = require("../config/secret");

const Library = require("./library");
const Rol = require("./rol");

const User = sequelize.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isLowercase: true,
			is: /^[a-z0-9_-]+$/,
		},
	},

	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true, // se revisa que el dato sea un email
		},
	},
	/*userpass: {
		type: DataTypes.STRING,
		allowNull: false,
	},*/
	password_hash: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	password_salt: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	phonenumber: {
		type: DataTypes.STRING,
	},
	membersince: {
		type: DataTypes.STRING,
		// allowNull: false,
	},
	credit_card_type: { type: DataTypes.CHAR(50) },
	credit_card: {
		type: DataTypes.TEXT,
		allowNull: true,
		/*validate: {
            isCreditCard: true
        }*/
	},
	rol: {
		// defaultValue: "2", review en mysql
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

User.createPassword = function (plainText) {
	try {
		const salt = crypto.randomBytes(16).toString("hex"); //generador de salt aleatorio
		const hash = crypto
			.pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
			.toString("hex"); //creacion de hash
		return { salt: salt, hash: hash };
	} catch (err) {
		return res.status(400).json({
			error: err.errors.map((e) => e.message),
		});
	}
};

User.hashCard = function (plainText, salt) {
	try {
		//const salt = crypto.randomBytes(16).toString('hex');
		const card = crypto
			.pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
			.toString("hex");
		return card.concat(plainText.slice(-4)); ///Se añaden 4 últimos valores
	} catch (err) {
		return res.status(400).json({
			error: err.errors.map((e) => e.message),
		});
	}
};

User.validatePassword = function (password, user_salt, user_hash) {
	const hash = crypto
		.pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
		.toString("hex");
	return user_hash === hash;
};

User.generateJWT = function (user) {
	const today = new Date();
	const exp = new Date(today);
	exp.setDate(today.getDate() + 30); // 1 mes

	return jwt.sign(
		{
			user: user.username,
			role: user.rol,
			exp: parseInt(exp.getTime() / 1000), // En segundos
		},
		secret
	);
};

User.hasMany(Library);
Library.hasMany(User);

Rol.hasMany(User, {
	foreignKey: "rol",
	sourceKey: "id",
});
User.belongsTo(Rol, {
	foreignKey: "rol",
	targetKey: "id",
});

module.exports = User;
