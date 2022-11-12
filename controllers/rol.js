//FromS5
const { Sequelize, DataTypes, Op } = require("sequelize");
const Rol = require("../models/rol");

// create a role
async function createRol(req, res) {
	return await Rol.create(req.body)
		.then((rol) => {
			res.status(201).send({
				message: "Rol creado correctamente",
				data: rol,
			});
		})
		.catch((error) => {
			res.status(400).send(error);
		});
}

// get a specefic role
async function getRol(req, res) {
	const id = req.params.id;
	const rol = await Rol.findByPk(id);
	res.status(200).json({ message: "here is the requested role", rol });
}

//get all roles
async function getRoles(req, res) {
	const roles = await Rol.findAll();
	res.status(200).json({ message: "all Roles successfully obtained", roles });
}

// update specifc rol
async function updateRol(req, res) {
	return await Rol.findByPk(req.params.id)
		.then((rol) => {
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
				.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
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
				.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
}

module.exports = {
	createRol,
	getRol,
	getRoles,
	updateRol,
	deleteRol,
};
