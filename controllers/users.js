const { Sequelize, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const User = require("../models/users");
const Library = require("../models/library");

async function signUp(req, res) {
	return await User.create(req.body)
		.then((user) => {
			const body = req.body;
			// check if body has username password and email
			if (!req.body.username || !req.body.userpass || !req.body.email) {
				return res.status(400).send({
					message: "You might be missing your username password or email!",
				});
			}
			// if first name and last name is emp
			if (!req.body.firstname || !req.body.lastname) {
				return res.status(400).send({
					message: "first and last name are missing!",
				});
			}
			try {
				// takes userpass into salt and hash
				const { salt, hash } = User.createPassword(body["userpass"]);
				user.password_hash = hash;
				user.password_salt = salt;

				// add member since date now
				user.membersince = new Date().toDateString();

				// if credit card exists hash it
				if (req.body.credit_card) {
					const card = User.hashCard(body["credit_card"], salt);
					user.credit_card = card;
				}

				// if user does not have CC set rol user
				// if (!req.body.credit_card) {
				// 	try {
				// 		user.rol = "2";
				// 	} catch (error) {
				// 		res.status(400).json({
				// 			info: "Error in request",
				// 			error: "description " + error,
				// 		});
				// 	}
				// } else {
				// 	// if user has CC set rol to premium
				// 	try {
				// 		user.rol = "5";
				// 	} catch (error) {
				// 		res.status(400).json({
				// 			info: "Error in request",
				// 			error: "description " + error,
				// 		});
				// 	}
				// }

				// save user
				user.save();
				return res
					.status(200)
					.json({ message: "User successfully created", user });
			} catch (err) {
				return res.status(500).json({ error: err });
			}
		})
		.catch((err) => {
			switch (err.name) {
				// validation error
				case "SequelizeValidationError":
					return res.status(400).json({
						message: "Validation Error",
						errors: err.errors,
					});
				// unique constraint error
				case "SequelizeUniqueConstraintError":
					return res.status(400).json({
						message: "Your email or Username might already in use",
						errors: err.errors,
					});
				// foregin key error
				case "SequelizeForeignKeyConstraintError":
					return res.status(400).json({
						message:
							"That role doesnt exist yet, can you create it or reqest it with your web master",
						errors: err.errors,
					});
				default:
					return res.status(500).json({ error: err });
			}
		});
}

async function getUser(req, res) {
	try {
		const id = req.params.id;

		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}

		const user = await User.findByPk(id, {
			include: [{ association: User.hasMany(Library) }],
		});
		if (!user) {
			return res
				.status(404)
				.json({ mensaje: "id not found in DB, try with another id" });
		}
		res.status(200).json(user);
	} catch (error) {
		res
			.status(400)
			.json({ info: "Check error", error: "description " + error });
	}
}

// confirm if deletable
async function getUsers(req, res) {
	try {
		if (!!req.auth && req.auth.role == "admin") {
			const users = await User.findAll({
				include: [{ association: User.hasMany(Library) }],
			});
			return res.status(200).json({ message: "here are all the users", user });
		}
		const user = await User.findAll(/*{
			attributes: ["id", "username", "firstname", "email", "rol"],
		}*/);
		res.status(200).json({ message: "here are all the users", user });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function updateUser(req, res) {
	try {
		const id = req.params.id;
		const user = req.body;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const newUser = await User.findByPk(id);
		if (req.user.rol != "admin" && req.auth.user != newUser.username) {
			console.log("usuario diferente");
			return res.status(403).json({
				status:
					"Cannot update others profiles, just only update your own profile",
			});
		}

		/////
		for (const key in user) {
			if (!newUser[key] && newUser[key] != null) {
				console.log("no encontrado");
				return res
					.status(400)
					.json({ Error: "Attribute not update, attribute not valid" });
			}
		}
		const update = await User.update(user, { where: { id } });

		res.status(200).json({ status: "Attribute was updated", user: user });
	} catch (err) {
		if (
			["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
				err.name
			)
		) {
			return res.status(400).json({
				error: err.errors.map((e) => e.message),
				description: "try with other value",
			});
		} else {
			throw err;
		}
	}
}

async function deleteUser(req, res) {
	try {
		const id = req.params.id;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const destruido = User.destroy({ where: { id } });
		res.status(200).json({ destruido });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function bringByAttributes(req, res) {
	try {
		const user = await User.findAll({
			attributes: ["username", "firstname", "email", "rol"],
		});
		res.status(200).json(user);
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}
async function bringByRol(req, res) {
	try {
		const rol = req.params.rol;
		const user = await User.findAll({ where: { rol } });
		res.status(200).json(user);
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function logIn(req, res) {
	try {
		const body = req.body;
		const user = await User.findOne({ where: { username: body.username } });
		if (!user) {
			return res
				.status(404)
				.json({ error: "user:" + body.username + " not found" });
		}
		if (
			User.validatePassword(
				body.userpass,
				user.password_salt,
				user.password_hash
			)
		) {
			return res.status(200).json({
				user: user.username,
				email: user.email,
				//role: user.rol,
				token: User.generateJWT(user),
			});
		} else {
			return res
				.status(400)
				.json({ mensaje: "Password incorrect, please try again" });
		}
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

module.exports = {
	signUp,
	logIn,
	getUser,
	getUsers,
	updateUser,
	deleteUser,
	bringByRol,
	bringByAttributes,
};
