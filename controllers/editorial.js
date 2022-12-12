const { Sequelize } = require("sequelize"); // declared but not used
const Editorial = require("../models/editorial");
const Book = require("../models/book");

function createEditorial(req, res) {
	try {
		const body = req.body;
		Editorial.create(body).then((ed) => {
			res.status(201).json(ed);
		});
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getEditorial(req, res) {
	try {
		const name = req.params.name;

		const ed = await Editorial.findOne({
			where: { name },
			include: Book,
		});
		if (!ed) {
			return res
				.status(404)
				.json({ Error: "Editorial doesnt exist in DB", name });
		}
		res.status(200).json(ed);
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getEditorials(req, res) {
	try {
		const editorials = await Editorial.findAll({
			include: Book,
		});
		res.status(200).json(editorials);
	} catch (err) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

// search editorial by name
async function searchEditorial(req, res) {
	return await Editorial.findAll({
		where: {
			name: {
				[Sequelize.Op.like]: `%${req.params.name}%`,
			},
		},
		include: Book,
	})
		.then((ed) => {
			if (!ed) {
				return res.status(404).json({ Error: "Editorial doesnt exist in DB" });
			}
			// if empty
			if (ed.length == 0) {
				return res.status(404).json({ Error: "Editorial not found" });
			}

			res.status(200).json(ed);
		})
		.catch((err) => {
			res
				.status(400)
				.json({ info: "Error in request", error: "description " + err });
		});
}

async function updateEditorial(req, res) {
	try {
		const name = req.params.name;
		const ed = req.body;

		const newEd = await Editorial.findOne({
			where: { name },
		});

		for (const key in ed) {
			if (!newEd[key] && newEd[key] != null) {
				console.log("no encontrado");
				return res
					.status(400)
					.json({ Error: "Attribute not update, attribute not valid" });
			}
		}

		const update = await Editorial.update(ed, { where: { name } });

		res.status(200).json({ status: "Attribute was updated", ed: ed });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function deleteEditorial(req, res) {
	try {
		const name = req.params.name;
		const deleteEd = await Editorial.findOne({
			where: { name },
		});
		if (!deleteEd) {
			return res
				.status(404)
				.json({ Error: "The editorial doesnt exist in DB", name });
		}
		await Editorial.destroy({ where: { name } });
		res.status(200).json({ Deleted: name });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

module.exports = {
	createEditorial,
	getEditorial,
	getEditorials,
	updateEditorial,
	deleteEditorial,
	searchEditorial,
};
