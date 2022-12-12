const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");
const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});

const {
	getBook,
	getBooks,
	updateBook,
	createBook,
	deleteBook,
	getBookByName,
} = require("../controllers/book");

router.get(
	"/",
	getBooks
	/*
  #swagger.tags = ['Books'];
  #swagger.summary = 'Get all Books';
  #swagger.description = 'API to get all Books';
  #swagger.responses[200] = {
			description: 'all Books successfully obtained.',
			schema: {
				id: '1',
				
			}
		}
  */
);
router.get(
	"/id/:id",
	// authpassport,
	// auth.required,
	getBook
	/*
  #swagger.tags = ['Books'];
  #swagger.summary = 'Get Book by ID';
  #swagger.description = 'API to get Book based on Book ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Book ID that will be search',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Role successfully obtained.',
			schema: {
				id: 1,
			}
		}
	  #swagger.responses[400] = {
			description: 'Book not found.',
			schema: {
				error: 'Book not found.'
			}
		}
  */
);
router.post(
	"/",
	authpassport,
	auth.isEditor,
	createBook
	/*
  #swagger.tags = ['Books'];
  #swagger.summary = 'Create a new Book';
  #swagger.description = 'API to create a new Book';
  #swagger.requestBody['createBook'] = {
	description: 'Book',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Book" }
  }
  #swagger.responses[200] = {
			description: 'Book successfully created.',}
	  #swagger.responses[400] = {	
			description: 'Book not created.',
			schema: {
				error: 'Book not created.'
			}
		}
	#swagger.security = [{
               "bearer": []
        }]
  */
);

router.get(
	"/name/:name",
	// authpassport,
	// auth.required,
	getBookByName
	/*
	  #swagger.tags = ['Books'];
	  #swagger.summary = 'Get Book by Name';
	  #swagger.description = 'API to get Book based on Book Name';
	  #swagger.consumes = ['application/json'];
	  #swagger.parameters['name'] = {
			  in: 'path',
			  required: true,
			  type: 'string',
			  description: 'Book Name that will be search',
			  example: 'Harry Potter'
		}
		  #swagger.responses[200] = {
				description: 'Book successfully obtained.',
				schema: {
					id: 1,
				}
			}
		  #swagger.responses[400] = {
				description: 'Book not found.',
				schema: {
					error: 'Book not found.'
				}
			}
	*/
);

router.put(
	"/id/:id",
	authpassport,
	auth.isEditor,
	updateBook
	/*
  #swagger.tags = ['Books'];
  #swagger.summary = 'Update a Book';
  #swagger.description = 'API to update a Book';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Book ID that will be updated',
		  example: 1
	}
   #swagger.requestBody['edit'] = {
	description: 'Book',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Book" }
  }
  #swagger.security = [{
               "bearer": []
        }]
  */
);
router.delete(
	"/id/:id",
	authpassport,
	auth.isAdmin,
	deleteBook
	/*
  #swagger.tags = ['Books'];
  #swagger.summary = 'Delete Book by ID';
  #swagger.description = 'API to delete Book based on Book ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Book ID that will be deleted',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Book successfully deleted.',
		}
	  #swagger.responses[400] = {
			description: 'Book not found.',	
			schema: {
				error: 'Book not found.'
			}
		}
		#swagger.security = [{
               "bearer": []
        }]
  */
);

module.exports = router;
