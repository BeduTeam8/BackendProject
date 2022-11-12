// const { Sequelize } = require("sequelize"); // declared but never used

// import book model
const book = require("../models/book");

// import category  model
const Category = require("../models/category");

// import edtiorial model
const Editorial = require("../models/editorial");

// import library model
const Library = require("../models/library");

function createBook(req, res) {
	try {
		const body = req.body;
		book.create(body).then((bk) => {
			res.status(201).json(bk);
		});
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getBook(req, res) {
	try {
		const id = req.params.id;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const bk = await book.findByPk(id, {
			include: [
				{ association: book.belongsTo(Editorial) },
				{ association: book.belongsTo(Library) },
				{ association: book.belongsTo(Category) },
			],
		});
		res.status(200).json(bk);
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getBooks(req, res) {
	try {
		const books = await book.findAll({
			include: [
				{ association: book.belongsTo(Editorial) },
				{ association: book.belongsTo(Library) },
				{ association: book.belongsTo(Category) },
			],
		});
		res.status(200).json(books);
	} catch (err) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

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
		res.status(200).json({ status: "Attribute was updated", user: user });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

function deleteBook() {
	try {
		const id = req.params.id;
		if (!Number(id)) {
			return res.status(400).json({ error: "Try with numeric value" });
		}
		const destruido = book.destroy({ where: { id } });

		res.status(200).json({ destruido });
		return;
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

module.exports = {
	createBook,
	getBook,
	getBooks,
	updateBook,
	deleteBook,
};
