//FromS5
const { Sequelize, DataTypes, Op } = require("sequelize");
const Order = require("../models/orders");

async function createOrder(req, res) {
	const body = req.body;
	try {
		/*Arrrow Func first dev, 
    * move to asyncawait Server Validation 
    * Constraint returns properly form DB     
    Order.create(body).then(order => {
        res.status(201).json(order);
    });
    */
		const order = await Order.create(body);
		res.status(201).json(order);
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

/*No validation required
 * Returns Empty Brackets{} in case or a query where id to table returns empty.
 * 				Brackets{id record in table}
 */
async function getOrder(req, res) {
	const id = req.params.id;
	const order = await Order.findByPk(id);
	res.status(200).json(order);
}

/*No validation required
 * Returns Empty Brackets{} in case or a query all table returns empty.
 * 				Brackets{all records in table}
 */
async function getOrders(req, res) {
	const orders = await Order.findAll();
	res.status(200).json(orders);
}

async function updateOrder(req, res) {
	const id = req.params.id;
	try {
		const order = req.body;
		await Order.update(order, { where: { id: id } });
		const order_updated = await Order.findByPk(id);
		res.status(200).json(order_updated);
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

/*No validation performed, if userExists, if id exists in DB
 * Either way the DB returna 200 Error Code
 * Only if a GetAll or GetById call return if user exists
 */
async function deleteOrder(req, res) {
	const id = req.params.id;
	try {
		const deleted = Order.destroy({ where: { id: id } });
		res.status(200).json(deleted);
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

module.exports = {
	createOrder,
	getOrder,
	getOrders,
	updateOrder,
	deleteOrder,
};
