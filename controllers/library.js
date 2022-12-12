const Library = require("../models/library");
const Book = require("../models/book");
const User = require("../models/users");

// create library
function createLibrary(req, res) {
	try {
		const body = req.body;
		Library.create(body).then((lib) => {
			return res.status(201).json(lib);
		});
	} catch (error) {
		return res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

// get library by id
async function getLibrary(req, res) {
	return await Library.findByPk(req.params.id, {
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
		],
	})
		.then((Library) => {
			if (!Library) {
				return res.status(404).json({
					message: "Library not found",
				});
			}
			return res.status(200).json({ message: "heres your library", Library });
		})
		.catch((error) => {
			return res.status(500).json({
				info: "Error in request",
				error: "description " + error,
			});
		});
}

// get all libraries
async function getLibraries(req, res) {
	return await Library.findAll({
		// include book and user
		include: [
			{
				model: User,
				attributes: ["id", "username"],
			},
			// {
			// 	model: Book,
			// },
			// NEXT SPRINT
			// ADD MODEL BOOKS TO LIBRARY
		],
	})
		.then((libraries) => {
			return res
				.status(200)
				.json({ message: "heres all the libraries", libraries });
		})
		.catch((error) => {
			return res

				.status(400)
				.json({ info: "Check error", error: "description " + error });
		});
}

// update library
async function updateLibrary(req, res) {
	try {
		const id = req.params.id;
		const lib = req.body;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const newLib = await Library.findByPk(id);
		///
		for (const key in lib) {
			if (!newLib[key] && newLib[key] != null) {
				console.log("no encontrado");
				return res
					.status(400)
					.json({ Error: "Attribute not update, attribute not valid" });
			}
		}
		//

		const update = await Library.update(lib, { where: { id } });

		return res.status(200).json({ status: "Attribute was updated", lib: lib });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

// delete library
async function deleteLibrary(req, res) {
	return await Library.findByPk(req.params.id)

		.then((library) => {
			if (!library) {
				return res.status(404).json({
					message: "Library not found",
				});
			}
			return library
				.destroy()
				.then(() => {
					return res.status(200).json({
						message: "Library was deleted",
						library,
					});
				})
				.catch((error) => {
					return res.status(500).json({
						info: "Error in request",
						error: "description " + error,
					});
				});
		})
		.catch((error) => {
			return res.status(500).json({
				info: "Error in request",
				error: "description " + error,
			});
		});
}

module.exports = {
	createLibrary,
	getLibraries,
	getLibrary,
	deleteLibrary,
	updateLibrary,
};
