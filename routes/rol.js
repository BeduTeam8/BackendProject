const router = require("express").Router();

const {
	createRol,
	getRol,
	getRoles,
	updateRol,
	deleteRol,
} = require("../controllers/rol");

router.get(
	"/",
	getRoles
	/*
  #swagger.tags = ['Roles'];
  #swagger.summary = 'Get all Roles';
  #swagger.description = 'API to get all Roles';
  #swagger.responses[200] = {
			description: 'all Roles successfully obtained.',
			schema: {
				id: '1',
				rol: 'admin',
			}
		}
  */
);
router.get(
	"/:id",
	getRol
	/*
  #swagger.tags = ['Roles'];
  #swagger.summary = 'Get Role by ID';
  #swagger.description = 'API to get Role based on Role ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Role ID that will be search',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Role successfully obtained.',
			schema: {
				id: 1,
			}
		}
	  #swagger.responses[400] = {
			description: 'Role not found.',
			schema: {
				error: 'Role not found.'
			}
		}
  */
);
router.post(
	"/",
	createRol
	/*
  #swagger.tags = ['Roles'];
  #swagger.summary = 'Create a new Role';
  #swagger.description = 'API to create a new Role';
  #swagger.requestBody['signup'] = {
	description: 'Rol',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Roles" }
  }
  */
);
router.put(
	"/:id",
	updateRol
	/*
  #swagger.tags = ['Roles'];
  #swagger.summary = 'Update a Role';
  #swagger.description = 'API to update a Role';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Role ID that will be updated',
		  example: 1
	}
   #swagger.requestBody['edit'] = {
	description: 'Rol',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Roles" }
  }
  */
);
router.delete(
	"/:id",
	deleteRol
	/*
  #swagger.tags = ['Roles'];
  #swagger.summary = 'Delete Role by ID';
  #swagger.description = 'API to delete Role based on Role ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Role ID that will be deleted',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Role successfully deleted.',
		}
	  #swagger.responses[400] = {
			description: 'Role not found.',	
			schema: {
				error: 'Role not found.'
			}
		}
  */
);

module.exports = router;
