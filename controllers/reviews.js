const { Sequelize, DataTypes, Op } = require("sequelize");
const Review = require("../models/reviews");

async function createReview(req, res) {
	const body = req.body;
	try {
		const review = await Review.create(body);
		res.status(201).json(review);
	} catch (err) {
		if (
			["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
				err.name
			)
		) {
			return res.status(400).json({
				error: err.errors.map((e) => e.message),
			});
		} else {
			throw err;
		}
	}
}

async function getReview(req, res) {
	const id = req.params.id;
	const review = await Review.findByPk(id);
	if (!review) {
		return res.status(404).json({ Error: "ID doesnt exist in DB", id });
	}
	return res.status(200).json(review);
}

async function getReviews(req, res) {
	try {
		const reviews = await Review.findAll();
		return res.status(200).json(reviews);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: "Error in request",
			error: `description: ${error}`,
		});
	}
}

async function updateReview(req, res) {
	try {
		const id = req.params.id;
		const review = req.body;
		const review_updated = await Review.findByPk(id);

		if (!review_updated) {
			return res.status(404).json({ Error: "ID doesn't exist in DB", id });
		}
		for (const key in review) {
			if (
				(!review_updated[key] && review_updated[key] != null) ||
				review_updated[key] == undefined
			) {
				console.log("no encontrado");
				return res
					.status(400)
					.json({ Error: "Attributes not update, attribute not valid", key });
			}
		}

		await Review.update(review, { where: { id: id } });
		res.status(200).json(review_updated);
	} catch (err) {
		if (
			["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
				err.name
			)
		) {
			return res.status(400).json({
				error: err.errors.map((e) => e.message),
			});
		} else {
			throw err;
		}
	}
}

async function deleteReview(req, res) {
	try {
		const id = req.params.id;
		const reviewToDeleted = await Review.findByPk(id);
		if (!reviewToDeleted) {
			return res.status(404).json({ message: "Review not found" });
		}
		await reviewToDeleted.destroy();
		return res.status(200).json({ message: "Review deleted", reviewToDeleted });
	} catch (error) {
		return res
			.status(400)
			.json({ info: "Error in request", error: "description " + error });
	}
}

module.exports = {
	createReview,
	getReview,
	getReviews,
	updateReview,
	deleteReview,
};
