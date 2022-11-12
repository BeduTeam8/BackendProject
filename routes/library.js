const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");

const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});

const {
	getLibraries,
	getLibrary,
	createLibrary,
	updateLibrary,
	deleteLibrary,
} = require("../controllers/library");

router.get(
	"/",
	getLibraries
	/*
  #swagger.tags = ['Libraries'];
  #swagger.summary = 'Get all Libraries';
  #swagger.description = 'API to get all Libraries';
  #swagger.responses[200] = {
			description: 'all Libraries successfully obtained.',
			schema: {
				id: '1',
				
			}
		}
  */
);
router.get(
	"/id/:id",
	authpassport,
	auth.required,
	getLibrary
	/*
  #swagger.tags = ['Libraries'];
  #swagger.summary = 'Get Library by ID';
  #swagger.description = 'API to get Library based on Library ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Library ID that will be search',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Library successfully obtained.',
			schema: {
				id: 1,
			}
		}
	  #swagger.responses[400] = {
			description: 'Library not found.',
			schema: {
				error: 'Library not found.'
			}
		}
  */
);
router.post(
	"/create",
	authpassport,
	auth.required,
	createLibrary
	/*
  #swagger.tags = ['Libraries'];
  #swagger.summary = 'Create a new Library';
  #swagger.description = 'API to create a new Library';
  #swagger.requestBody['createLibrary'] = {
	description: 'Library',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Library" }
  }
  */
);

router.put(
	"/id/:id",
	authpassport,
	auth.required,
	updateLibrary
	/*
  #swagger.tags = ['Libraries'];
  #swagger.summary = 'Update a Library';
  #swagger.description = 'API to update a Library';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Library ID that will be updated',
		  example: 1
	}
   #swagger.requestBody['edit'] = {
	description: 'Library',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Library" }
  }
  */
);
router.delete(
	"/id/:id",
	authpassport,
	auth.required,
	deleteLibrary
	/*
  #swagger.tags = ['Libraries'];
  #swagger.summary = 'Delete Library by ID';
  #swagger.description = 'API to delete Library based on Library ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Library ID that will be deleted',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Library successfully deleted.',
		}
	  #swagger.responses[400] = {
			description: 'Library not found.',	
			schema: {
				error: 'Library not found.'
			}
		}
  */
);

module.exports = router;
