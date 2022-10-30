const router = require("express").Router();
const users = require("./users");
const categories = require("./category");
const editorial = require("./editorial");
const book = require("./book");
const library = require("./library");

router.get("/", (req, res) => {
	res.json({ info: "Welcome to Users API" });
});

router.use("/users", users);
router.use("/category", categories);
router.use("/editorial", editorial);
router.use("/book", book);
router.use("/library", library);
module.exports = router;

// swagger documentation
/**
 * @swagger
 * /:
 *  get:
 *   tags:
 *    - Home
 *   summary: home page for Libroverse
 *   description: home page for Libroverse that shows created by and team name
 *   responses:
 *    200:
 *     description: a welcome message
 */
