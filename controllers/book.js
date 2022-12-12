// const { Sequelize } = require("sequelize"); // declared but never used

// import book model

const { Sequelize } = require("sequelize");

const Author = require("../models/authors");
const book = require("../models/book");

// import category  model
const Category = require("../models/category");

// import edtiorial model
const Editorial = require("../models/editorial");

// import library model
const Library = require("../models/library");

// create book
async function createBook(req, res) {
	return await book
		.create(req.body)
		.then((book) => {
			// empty body
			if (!req.body) {
				return res.status(400).send({
					message: "Content can not be empty!",
				});
			}
			// if book_name,
			if (!req.body.book_name) {
				return res.status(400).send({
					message: "book_name can not be empty!",
				});
			}
			// if author_id,
			if (!req.body.author_id) {
				return res.status(400).send({
					message: "author_id can not be empty!",
				});
			}

			// if category_id,
			if (!req.body.category_id) {
				return res.status(400).send({
					message: "category_id can not be empty!",
				});
			}
			// send response
			return res.status(200).json({
				message: "Book created sucessfully",
				book,
			});
		})
		.catch((error) => {
			switch (
				// if book_name is duplicated
				error.name
			) {
				case "SequelizeUniqueConstraintError":
					res.status(400).send({
						message: "Unique constrant",
						error: "description " + error,
					});
					break;
				// if author_id is not valid
				case "SequelizeForeignKeyConstraintError":
					res.status(400).send({
						message: "Foreign key constraint",
						error: "description " + error,
					});
					break;
				case "SequelizeValidationError":
					res.status(400).send({
						message: "Missing information",
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

// get book by ID
async function getBook(req, res) {
	return await book
		.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{ model: Editorial, as: "Editorial", attributes: ["name"] },
				{ model: Category, as: "Category", attributes: ["genre"] },
			],
		})
		.then((book) => {
			if (!book) {
				return res
					.status(404)
					.json({ mensaje: "id not found in DB, try with another id" });
			}
			return res.status(200).json(book);
		})
		.catch((error) => {
			return res
				.status(400)
				.json({ info: "Error in request", error: "description " + error });
		});
}

// search book by part of the name or full name of book
async function getBookByName(req, res) {
	try {
		const books = await book.findAll({
			where: {
				book_name: {
					[Sequelize.Op.like]: `%${req.params.name}%`,
				},
			},
			include: [
				{ model: Author, attributes: ["name"] },
				{ model: Editorial, as: "Editorial", attributes: ["name"] },
				{ model: Category, as: "Category", attributes: ["genre"] },
			],
		});

		if (!books) {
			return res.status(404).json({
				message: "Boo not found in DB, try with another name",
			});
		}

		if (books.length === 0) {
			return res.status(404).json({
				message: "No books found with that name",
			});
		}
		// if empty genre send err
		if (!req.params.name) {
			return res.status(400).json({
				message: "book search cant be empty",
			});
		}

		return res.status(200).json(books);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "Error in request",
			error: `description: ${error}`,
		});
	}
}

// get all books
async function getBooks(req, res) {
	return await book
		.findAll({
			include: [
				{ model: Author, attributes: ["name"] },
				{ model: Editorial, as: "Editorial", attributes: ["name"] },
				{ model: Category, as: "Category", attributes: ["genre"] },
			],
		})
		.then((books) => {
			return res.status(200).json(books);
		})
		.catch((error) => {
			return res
				.status(400)
				.json({ info: "Error in request", error: "description " + error });
		});
}

// update book
async function updateBook(req, res) {
	try {
		const id = req.params.id;
		const bk = req.body;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}

		//
		const newbk = await book.findByPk(id);
		for (const key in bk) {
			if (!newbk[key] && newbk[key] != null) {
				console.log("no encontrado");
				return res
					.status(400)
					.json({ Error: "Attribute not update, attribute not valid" });
			}
		}
		//
		const update = await book.update(bk, { where: { id } });
		return res.status(200).json({ status: "Attribute was updated", newbk });
	} catch (error) {
		return res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

// delete book
async function deleteBook(req, res) {
	try {
		const book = await book.findByPk(req.params.id);
		if (!book) {
			return res
				.status(404)
				.json({ mensaje: "id not found in DB, try with another id" });
		}
		book.destroy();
		return res.status(200).json({ mensaje: "Book deleted", book });
	} catch (error) {
		return res
			.status(400)
			.json({ info: "Error in request", error: `description: ${error}` });
	}
}

module.exports = {
	createBook,
	getBook,
	getBooks,
	updateBook,
	deleteBook,
	getBookByName,
};
