const { Sequelize } = require("sequelize");
const Category = require("../models/category");
const Book = require("../models/book");

async function createCategory(req, res) {
	// find by genre
	try {
		// if genere is empty reject
		if (!req.body.genre) {
			return res.status(400).send({
				message: "genre can not be empty",
			});
		}

		const category = await Category.findOne({
			where: {
				genre: req.body.genre,
			},
		});
		if (category) {
			return res.status(400).send({
				message: "Category already exists",
			});

			// if not exists, create
		} else {
			const newCategory = await Category.create(req.body);
			return res.status(201).json({ message: "Catagory created", newCategory });
		}
	} catch (error) {
		return res.status(400).send(error);
	}
}

async function getCategory(req, res) {
	try {
		const genre = req.params.genre;
		const category = await Category.findOne({
			where: { genre },
			include: Book,
		});
		return res.status(200).json(category);
	} catch (error) {
		return res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function getCategories(req, res) {
	try {
		const categories = await Category.findAll({
			include: Book,
		});
		res.status(200).json(categories);
	} catch (err) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function updateCategory(req, res) {
	try {
		const genre = req.params.genre;
		const category = await Category.findOne({
			where: { genre },
		});
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}
		const updatedCategory = await category.update(req.body);
		res.status(200).json({ message: "Category updated", updatedCategory });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

async function deleteCategory(req, res) {
	try {
		const genre = req.params.genre;
		const category = await Category.findOne({
			where: { genre },
		});
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}
		await category.destroy();
		res.status(200).json({ message: "Category deleted", category });
	} catch (error) {
		res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

module.exports = {
	createCategory,
	updateCategory,
	getCategories,
	getCategory,
	deleteCategory,
};
