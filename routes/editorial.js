const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");
const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});

const {
	getEditorial,
	getEditorials,
	updateEditorial,
	deleteEditorial,
	createEditorial,
	searchEditorial,
} = require("../controllers/editorial");

router.get(
	"/",
	getEditorials
	/*
  #swagger.tags = ['Editorials'];
  #swagger.summary = 'Get all Editorials';
  #swagger.description = 'API to get all Editorials';
  #swagger.responses[200] = {
			description: 'all Editorials successfully obtained.',
			schema: {
				id: '1',
				
			}
		}
  */
);
router.get(
	"/id/:name",
	getEditorial
	/*
  #swagger.tags = ['Editorials'];
  #swagger.summary = 'Get Editorial by ID';
  #swagger.description = 'API to get Editorial based on Editorial ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['name'] = {
		  in: 'path',
		  required: true,
		  type: 'string',
		  description: 'Editorial ID that will be searched',
		  example: 'thoughtmix'}
	  #swagger.responses[200] = {
			description: 'Editorial successfully obtained.',
			schema: {
				id: 1,
			}
		}
	  #swagger.responses[400] = {
			description: 'Editorial not found.',
			schema: {
				error: 'Editorial not found.'
			}
		}
		
  */
);

router.post(
	"/",
	authpassport,
	auth.isEditor,
	createEditorial
	/*
  #swagger.tags = ['Editorials'];
  #swagger.summary = 'Create a new Editorial';
  #swagger.description = 'API to create a new Editorial';
  #swagger.requestBody['createEditorial'] = {
	description: 'Editorial',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Editorial" }
  }
  #swagger.security = [{
               "bearer": []
        }]
  */
);

router.get(
	"/search/:name",
	searchEditorial
	/*
	  #swagger.tags = ['Editorials'];
	  #swagger.summary = 'Search Editorial by name';
	  #swagger.description = 'API to search Editorial based on Editorial name';
	  #swagger.consumes = ['application/json'];
	  #swagger.parameters['name'] = {
			  in: 'path',
			  required: true,
			  type: 'string',
			  description: 'Editorial name that will be searched',
			  example: 'thoughtmix'}
		  #swagger.responses[200] = {
				description: 'Editorial successfully obtained.',
				schema: {	
					id: 1,
				}	
			}
		  #swagger.responses[400] = {
				description: 'Editorial not found.',
				schema: {
					error: 'Editorial not found.'
				}
			}
*/
);

router.put(
	"/id/:name",
	authpassport,
	auth.isEditor,
	updateEditorial
	/*
  #swagger.tags = ['Editorials'];
  #swagger.summary = 'Update an Editorial';
  #swagger.description = 'API to update a Role';
  #swagger.consumes = ['application/json'];
#swagger.parameters['name'] = {
		  in: 'path',
		  required: true,
		  type: 'string',
		  description: 'Editorial ID that will be searched',
		  example: 'thoughtmix'}
   #swagger.requestBody['edit'] = {
	description: 'Editorial',
	required: true,
	type: 'object',
	schema: { $ref: "#/definitions/Editorial" }
  }
  #swagger.security = [{
               "bearer": []
        }]
  */
);
router.delete(
	"/id/:name",
	authpassport,
	auth.isAdmin,
	deleteEditorial
	/*
  #swagger.tags = ['Editorials'];
  #swagger.summary = 'Delete Editorial by ID';
  #swagger.description = 'API to delete Editorial based on Editorial ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'Editorial ID that will be deleted',
		  example: 1
	}
	  #swagger.responses[200] = {
			description: 'Editorial successfully deleted.',
		}
	  #swagger.responses[400] = {
			description: 'Editorial not found.',	
			schema: {
				error: 'Editorial not found.'
			}
		}
		#swagger.security = [{
               "bearer": []
        }]
  */
);

module.exports = router;
