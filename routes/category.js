const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");
const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});

const {
	getCategories,
	getCategory,
	updateCategory,
	createCategory,
	deleteCategory,
} = require("../controllers/category");

router.get(
	"/",
	getCategories
	/*
  #swagger.tags = ['Categories'];
  #swagger.summary = 'Get all Categories';
  #swagger.description = 'API to get all Categories';
  #swagger.responses[200] = {
			description: 'all Categories successfully obtained.',
			schema: {
				id: '1',
				
			}
		}
  */
);
router.get(
	"/id/:genre",
	authpassport,
	auth.required,
	getCategory
	/*
  #swagger.tags = ['Categories'];
  #swagger.summary = 'Get Categorie by Genre';
  #swagger.description = 'API to get Categorie based on Genre';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['genre'] = {
		  in: 'path',
		  required: true,
		  type: 'string',
		  description: 'Genre that will be search',
		  example: 'action'
	}
	  #swagger.responses[200] = {
			description: 'Category successfully obtained.',
			schema: {
				genre: 'action',
			}
		}
	  #swagger.responses[400] = {
			description: 'Category not found.',
			schema: {
				error: 'Category not found.'
			}
		}
  */
);
router.post(
	"/",
	authpassport,
	auth.isAdmin,
	createCategory
	/*
  #swagger.tags = ['Categories'];
  #swagger.summary = 'Create a new Category';
  #swagger.description = 'API to create a new Category';
  #swagger.requestBody['createCategory'] = {
	description: 'Category',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Category" }
  }
  */
);
router.put(
	"/id/:genre",
	authpassport,
	auth.required,
	updateCategory
	/*
  #swagger.tags = ['Categories'];
  #swagger.summary = 'Update a Categories';
  #swagger.description = 'API to update a Category';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['genre'] = {
		  in: 'path',
		  required: true,
		  type: 'String',
		  description: 'Genre that will be updated',
		  example: 'action'
	}
   #swagger.requestBody['edit'] = {
	description: 'Category',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Category" }
  }
  */
);
router.delete(
	"/id/:genre",
	authpassport,
	auth.isAdmin,
	deleteCategory
	/*
  #swagger.tags = ['Categories'];
  #swagger.summary = 'Delete Category by Genre';
  #swagger.description = 'API to delete Category based on Genre';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['genre'] = {
		  in: 'path',
		  required: true,
		  type: 'String',
		  description: 'genre that will be deleted',
		  example: 'action'
	}
	  #swagger.responses[200] = {
			description: 'Category successfully deleted.',
		}
	  #swagger.responses[400] = {
			description: 'Category not found.',	
			schema: {
				error: 'Category not found.'
			}
		}
  */
);

module.exports = router;
