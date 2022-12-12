const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");

const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});

const {
	getAuthors,
	getAuthor,
	createAuthor,
	updateAuthor,
	deleteAuthor,
	searchAuthor,
} = require("../controllers/authors");

router.get(
	"/",
	getAuthors
	/*
  #swagger.tags = ['Authors'];
  #swagger.summary = 'Get all Authors';
  #swagger.description = 'API to get all Authors';
  #swagger.responses[200] = {
			description: 'all Authors successfully obtained.',
			schema: {
				id: '1',
				
			}
		}
  */
);
router.get(
	"/id/:id",
	getAuthor
	/*
  #swagger.tags = ['Authors'];
  #swagger.summary = 'Get Author by ID';
  #swagger.description = 'API to get Author based on Author ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Author ID that will be search',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Author successfully obtained.',
			schema: {
				id: 1,
			}
		}
	  #swagger.responses[400] = {
			description: 'Author not found.',
			schema: {
				error: 'Author not found.'
			}
		}
  */
);
router.post(
	"/create",
	authpassport,
	auth.isEditor,
	createAuthor
	/*
  #swagger.tags = ['Authors'];
  #swagger.summary = 'Create a new Author';
  #swagger.description = 'API to create a new Author';
  #swagger.requestBody['createLibrary'] = {
	description: 'Author',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Authors" }
  }
   #swagger.security = [{
               "bearer": []
        }] 
  */
);

router.get(
	"/search/:name",
	searchAuthor
	/*
	  #swagger.tags = ['Authors'];
	  #swagger.summary = 'Get Author by name';
	  #swagger.description = 'API to get Author based on Author name';
	  #swagger.consumes = ['application/json'];
	  #swagger.parameters['name'] = {
			  in: 'path',
			  required: true,
			  type: 'string',
			  description: 'Author name that will be search',
			  example: 'J.K. Rowling'
		}
		  #swagger.responses[200] = {
				description: 'Author successfully obtained.',
				schema: {
					id: 1,
				}
			}

		  #swagger.responses[400] = {
				description: 'Author not found.',
				schema: {
					error: 'Author not found.'
				}
			}
*/
);

router.put(
	"/id/:id",
	authpassport,
	auth.isEditor,
	updateAuthor
	/*
  #swagger.tags = ['Authors'];
  #swagger.summary = 'Update a Author';
  #swagger.description = 'API to update a Author';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Author ID that will be updated',
		  example: 1
	}
   #swagger.requestBody['edit'] = {
	description: 'Author',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Authors" }
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
	deleteAuthor
	/*
  #swagger.tags = ['Authors'];
  #swagger.summary = 'Delete Author by ID';
  #swagger.description = 'API to delete Author based on Author ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Author ID that will be deleted',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Author successfully deleted.',
		}
	  #swagger.responses[400] = {
			description: 'Author not found.',	
			schema: {
				error: 'Author not found.'
			}
		}
		 #swagger.security = [{
               "bearer": []
        }] 
  */
);

module.exports = router;
