//FromS5
const { Sequelize, DataTypes, Op } = require("sequelize");
const Rol = require("../models/rol");

// create a role
async function createRol(req, res) {
	const reqrol = req.body.rol
	const reqid =  req.body.id
	const idfound = await Rol.findByPk(reqid)
	const rolfound = await Rol.findOne({
		where:{ rol:reqrol}
    });
	if (!!rolfound || !!idfound){
		return res.status(409).json({
			info : "Rol already exists in DB, try with another name Rol or ID Rol"
		})
	}
	console.group(reqrol)
	return await Rol.create(req.body)
		.then((rol) => {
			res.status(201).send({
				message: "Rol creado correctamente",
				data: rol,
			});
		})
		.catch((error) => {
			
			res
				.status(400)
				.send({ info: "error in request", error: "description" + error });
		});
}

// get a specefic role
async function getRol(req, res) {
	return await Rol.findByPk(req.params.id)
		.then((rol) => {
			if (!rol) {
				return res.status(404).send({
					message: "Role not found",
				});
			}
			return res
				.status(200)
				.send({ message: "Heres the role you were looking for", rol });
		})
		.catch((error) =>
			res
				.status(400)
				.send({ info: "error in request", error: "description" + error })
		);
}

//get all roles
async function getRoles(req, res) {
	return await Rol.findAll()
		.then((rol) => {
			if (!rol) {
				return res.status(404).send({
					message: "No roles found",
				});
			}
			return res
				.status(200)
				.send({ message: "Heres the roles you were looking for", rol });
		})
		.catch((error) =>
			res
				.status(400)
				.send({ info: "error in request", error: "description" + error })
		);
}

// update specifc rol
async function updateRol(req, res) {

	return await Rol.findByPk(req.params.id)



		.then((rol) => {
			
			for (const key in req.body) {
				if (!rol[key]) {
				return res
						.status(400)
						.json({ Error: "Attribute not update, attribute not valid" });
				}
			}


			if (!rol) {
				return res.status(404).send({
					message: "Rol no encontrado",
				});
			}
			return rol
				.update({
					rol: req.body.rol || rol.rol,
				})
				.then(() =>
					res.status(200).send({ message: "usario actualizado", rol })
				)
				.catch((error) =>
					res
						.status(400)
						.send({ info: "error in request", error: "description" + error })
				);
		})
		.catch((error) =>
			res
				.status(400)
				.send({ info: "error in request", error: "description" + error })
		);
}

// delete role
async function deleteRol(req, res) {
	return await Rol.findByPk(req.params.id)
		.then((rol) => {
			if (!rol) {
				return res.status(400).send({
					message: "Rol no encontrado",
				});
			}
			return rol
				.destroy()
				.then(() => res.status(200).send({ message: "Rol eliminado", rol }))
				.catch((error) =>
					res
						.status(400)
						.send({ info: "Error in request", error: "description " + error })
				);
		})
		.catch((error) =>
			res
				.status(400)
				.send({ info: "Error in request", error: "description " + error })
		);
}

module.exports = {
	createRol,
	getRol,
	getRoles,
	updateRol,
	deleteRol,
};
