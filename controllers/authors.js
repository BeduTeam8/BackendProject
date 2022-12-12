const Author = require("../models/authors");
const Book = require("../models/book");

const { Sequelize } = require("sequelize");

// create Author
async function createAuthor(req, res) {
	return await Author.create(req.body)
		.then((author) => {
			res.status(201).send({
				message: "Author created sucessfully",
				data: author,
			});
		})
		.catch((error) => {
			switch (error.name) {
				case "SequelizeValidationError":
					res.status(400).send({
						message: "Mission information",
						error: "description " + error,
					});
					break;
				case "SequelizeUniqueConstraintError":
					res.status(400).send({
						message: "Unique constrant",
						error: "description " + error,
					});
					break;
				default:
					res.status(400).send({
						message: "Something went wrong",
						error: "description " + error,
					});
			}
		});
}

async function getAuthor(req, res) {
	try {
		const id = req.params.id;

		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const author = await Author.findByPk(id, {
			include: {
				model: Book,
				attributes: ["book_name", "description", "AuthorId"],
			},
		});
		if (!author) {
			return res
				.status(404)
				.json({ mensaje: "id not found in DB, try with another id" });
		}
		return res.status(200).json(author);
	} catch (error) {
		return res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getAuthors(req, res) {
	try {
		const author = await Author.findAll({
			include: {
				model: Book,
				attributes: ["book_name", "description", "AuthorId"],
			},
		});
		return res.status(200).json(author);
	} catch (error) {
		return res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

// Search for author
async function searchAuthor(req, res) {
	return await Author.findAll({
		where: {
			name: {
				[Sequelize.Op.like]: "%" + req.params.name + "%",
			},
		},
	})
		.then((author) => {
			if (!author) {
				return res.status(400).send({
					message: "Author Not Found",
				});
			}
			// if empty
			if (author.length == 0) {
				return res.status(400).send({
					message: "Author Not Found",
				});
			}
			return res.status(200).send({ message: "Author found", author });
		})
		.catch((error) =>
			res.status(400).send({
				message: "Error in request",
				error: "description " + error,
			})
		);
}

async function updateAuthor(req, res) {
	try {
		const id = req.params.id;
		const author = req.body;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const newAuthor = await Author.findByPk(id);

		for (const key in author) {
			if (!newAuthor[key] && newAuthor[key] != null) {
				console.log("no encontrado");
				return res
					.status(400)
					.json({ Error: "Attribute not update, attribute not valid" });
			}
		}

		const update = await Author.update(author, { where: { id } });

		res.status(200).json({ status: "Attribute was updated", author: author });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function deleteAuthor(req, res) {
	return await Author.findByPk(req.params.id)
		.then((author) => {
			if (!author) {
				return res.status(400).send({
					message: "Author Not Found",
				});
			}
			return author
				.destroy()
				.then(() => res.status(200).send({ message: "Author deleted", author }))
				.catch((error) =>
					res.status(400).send({
						message: "Error in request",
						error: "description " + error,
					})
				);
		})
		.catch((error) =>
			res.status(400).send({
				message: "Error in request",
				error: "description " + error,
			})
		);
}

module.exports = {
	createAuthor,
	getAuthors,
	getAuthor,
	searchAuthor,
	deleteAuthor,
	updateAuthor,
};
