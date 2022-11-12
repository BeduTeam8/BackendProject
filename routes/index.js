const router = require("express").Router();
const users = require("./users");
const categories = require("./category");
const editorial = require("./editorial");
const book = require("./book");
const library = require("./library");
const author = require("./authors");
const rol = require("./rol");
const review = require("./reviews");
const order = require("./orders");

router.get("/", (req, res) => {
	/* #swagger.tags = ['Home'];
	#swagger.summary = 'Home';
	#swagger.description = 'Home';
	#swagger.responses[200] = {
		description: 'Home',
		schema: {
			$info: 'Welcome to the library universe. It is a place where everyone can learn, read and be creative.There are several different categories, from the sciences to fiction. There is no clear order of priority for books; you can begin your search with whichever you feel is most relevant and work your way around from there. The Libraryverse is yours to explore',
		}
	}
	#swagger.responses[400] = {
		description: 'Error',
		schema: {
			$error: 'Error',
		}
	}
	#swagger.responses[404] = {
		description: 'Not found',
		schema: {
			$error: 'Not found',
		}
	}
	#swagger.responses[undocumented] = {
		description: 'failed to fetch, solution change server o npm start server',
		schema: {
			$error: 'Failed to fetch. Possible Reasons:',
			$reasons: [ 'Server is not running', 'Server is running but not in the port 3000', 'Server is running but not in the port 3000 and the port is not available',]
		}
	}
	 */
	res.json({
		info: "Welcome to the library universe. It is a place where everyone can learn, read and be creative.There are several different categories, from the sciences to fiction. There is no clear order of priority for books; you can begin your search with whichever you feel is most relevant and work your way around from there. The Libraryverse is yours to explore!",
	});
});

router.use("/users", users);
router.use("/category", categories);
router.use("/editorial", editorial);
router.use("/book", book);
router.use("/library", library);
router.use("/author", author);
router.use("/rol", rol);
router.use("/review", review);
router.use("/order", order);
module.exports = router;
