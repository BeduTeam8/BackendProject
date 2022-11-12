const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");

const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});
const {
	getUser,
	getUsers,
	signUp,
	logIn,
	deleteUser,
	updateUser,
	bringByRol,
	bringByAttributes,
} = require("../controllers/users");

router.get(
	"/",
	getUsers,
	authpassport,
	auth.isAdmin
	/*
  #swagger.tags = ['Users'];
  #swagger.summary = 'Get all users';
  #swagger.description = 'API to get all users';
  #swagger.responses[200] = {
            description: 'all users successfully obtained.',
            schema: { 
				$name: 'Jhon Doe',
				$age: 29,
				about: ''
            }
  }
  #swagger.security = [{
               "bearer": []
        }] 
  */
);
router.get(
	"/id/:id",
	// authpassport,
	// auth.required,
	getUser
	/*
  #swagger.tags = ['Users'];
  #swagger.summary = 'Get user by ID';
  #swagger.description = 'API to get user based on user ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
          in: 'path',
          required: true,
          type: 'number',
          description: 'User ID that will be search',
          example: 1
  }
  #swagger.responses[200] = {
            description: 'User successfully obtained.',
            schema: { 
              id: 1,
            }
  }
  #swagger.responses[404] = {
			description: 'User not found.',
			schema: {
				error: 'User not found.'
			}
  }
  #swagger.security = [{
               "bearer": []
        }] 
  */
);

router.post(
	"/signUp",
	signUp
	/*
  #swagger.tags = ['Users'];
  #swagger.summary = 'Sign up';
  #swagger.description = 'API to sign up';
  #swagger.consumes = ['application/json'];
  #swagger.requestBody['signup'] = {
		  in: 'body',
		  required: true,
		  type: 'object',
		 schema: { $ref: "#/definitions/Users" }
		}
  #swagger.responses[200] = {
			description: 'User successfully created.',
  }
#swagger.responses[400] = {
			description: '01 Missing info Error. | 02 First and last name missing | 03 Validation Error | 04 Unique constraint Error | 05 Foreign Key Error',
			schema: {
				"01-message": "Content can not be empty!",
				"02-message": "First and last name missing",
				"03-message": "Validation Error",
				"04-message": "Unique constraint Error",
				"05-message": "Foreign Key Error"

			}
	}

  */
);
router.put(
	"/id/:id",
	authpassport,
	auth.required,
	updateUser
	/*
  #swagger.tags = ['Users'];
  #swagger.summary = 'Update user';
  #swagger.description = 'API to update user based on user ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'User ID that will be updated',
		  example: 1
		    }
  #swagger.parameters['body'] = {
		  in: 'body',
		  required: true,
		  type: 'object',
		  description: 'User data that will be updated',
		  schema: {
			  $name: 'Jhon Doe',
			  $age: 29,
			  about: ''
		  }
	 }
   #swagger.responses[200] = {
			description: 'User successfully updated.',
			  }
   #swagger.responses[400] = {
			description: 'User not found.',
			schema: {
				error: 'User not found.'
			}
}
  #swagger.security = [{
			   "bearer": []	
		}]
  */
);
router.delete(
	"/id/:id",
	// authpassport,
	// auth.isAdmin,
	deleteUser /*
  #swagger.tags = ['Users'];
  #swagger.summary = 'Delete user';
  #swagger.description = 'API to delete user based on user ID';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['id'] = {
		  in: 'path',
		  required: true,
		  type: 'number',
		  description: 'User ID that will be deleted',
		  example: 1
		    }
			  #swagger.responses[200] = {
			description: 'User successfully deleted.',
			  }
			     #swagger.responses[400] = {
			description: 'User not found.',
			schema: {
				error: 'User not found.'
			}
}
  #swagger.security = [{
			   "bearer": []
		}]

		
  */
);
router.get(
	"/search/atributos",
	bringByAttributes /*
  #swagger.tags = ['User Filters'];
  #swagger.summary = 'Search user by attributes';
  #swagger.description = 'API to search user based on attributes';
  #swagger.consumes = ['application/json'];
  #swagger.parameters['body'] = {
		  in: 'body',
		  required: true,
		  type: 'object',
		  description: 'User data that will be search',
		  schema: {
			  $name: 'Jhon Doe',
			  $age: 29,
		  }
		}
		  #swagger.responses[200] = {
			description: 'User successfully obtained.',
		}
		#swagger.responses[400] = {
			description: 'User not found.',
			schema: {
				error: 'User not found.'
			}
		}
  */
);
router.get(
	"/search/rol/:rol",
	// authpassport,
	// auth.required,
	bringByRol /*
  #swagger.tags = ['User Filters'];
  */
);
router.post(
	"/logIn",
	logIn /*
  #swagger.tags = ['Users'];
  #swagger.summary = 'Log in';
  #swagger.description = 'API to log in';
  #swagger.consumes = ['application/json'];
  #swagger.requestBody['test'] = {
		  in: 'body',
		  required: true,
		  type: 'object',
		  schema: { $ref: "#/definitions/Login" }
		}
		  #swagger.responses[200] = {
			description: 'User successfully logged in.',
		}
		#swagger.responses[404] = {
			description: 'User not found.',
			schema: {
				error: 'User not found.'
			}
		}
  */
);
module.exports = router;
