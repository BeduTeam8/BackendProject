const Author = require("../models/authors");
const Book = require("../models/book");

function createAuthor(req, res) {
	try {
		const body = req.body;
		Author.create(body).then((author) => {
			res.status(201).json(author);
		});
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getAuthor(req, res) {
	try {
		const id = req.params.id;

		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const author = await Author.findByPk(id, {
			include: [
				{ association: Author.hasMany(Book) },
			],
		});
		if (!author) {
			res
				.status(404)
				.json({ mensaje: "id not found in DB, try with another id" });
		}
		res.status(200).json(author);
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getAuthors(req, res) {
	try {
		const author = await Author.findAll({
			include: [{ association: Author.hasMany(Book) }],
		});
		res.status(200).json(author);
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function updateAuthor(req, res) {
	try {
		const id = req.params.id;
		const author = req.body;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const newAuthor = await Author.findByPk(id);
		///
		for (const key in author) {
			if (!newAuthor[key] && newAuthor[key] != null) {
				console.log("no encontrado");
				return res
					.status(400)
					.json({ Error: "Attribute not update, attribute not valid" });
			}
		}
		//

		const update = await Author.update(author, { where: { id } });

		res.status(200).json({ status: "Attribute was updated", author: author });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function deleteAuthor(req, res) {
	try {
		const id = req.params.id;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const destruido = Author.destroy({ where: { id } });
		res.status(200).json({ destruido });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

module.exports = {
	createAuthor,
	getAuthors,
	getAuthor,
	deleteAuthor,
	updateAuthor,
};
