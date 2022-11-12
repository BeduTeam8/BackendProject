const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");

const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});

const {
	createOrder,
	getOrder,
	getOrders,
	updateOrder,
	deleteOrder,
} = require("../controllers/orders");

router.get(
	"/",
	/*authpassport,
auth.required,*/ getOrders
	/*
	  #swagger.tags = ['Orders'];
	  #swagger.summary = 'Get all Orders';
	  #swagger.description = 'API to get all Orders';
	  #swagger.responses[200] = {
				description: 'all Orders successfully obtained.',}
	  */
);

router.get(
	"/:id",
	/* authpassport,
auth.required,*/ getOrder

	/*
	  #swagger.tags = ['Orders'];
	  #swagger.summary = 'Get Order by ID';
	  #swagger.description = 'API to get Order based on Order ID';
	  #swagger.consumes = ['application/json'];
	  #swagger.parameters['id'] = {
			  in: 'path',
			  required: true,
			  type: 'number',
			  description: 'Order ID that will be search',
			  example: 1
		}
		  #swagger.responses[200] = {
				description: 'Order successfully obtained.',
				schema: {
					id: 1,
				}
			}
		  #swagger.responses[400] = {
				description: 'Order not found.',
				schema: {
					error: 'Order not found.'
				}
			}
					  */
);

router.post(
	"/",
	/*authpassport,
auth.required,*/ createOrder
	/*
	  #swagger.tags = ['Orders'];
	  #swagger.summary = 'Create Order';
	  #swagger.description = 'API to create Order';
	  #swagger.consumes = ['application/json'];
	  #swagger.requestBody ['createOrder'] = {
		  in: 'body',
		  required: true,
		  type: 'object',
		  description: 'Order to be created',
		  schema: {
			   $ref: "#/definitions/Orders"}
	  }
	  #swagger.responses[200] = {
				description: 'Order successfully created.',}
	  */
);

router.put(
	"/:id",
	/*authpassport,
auth.isAdmin,*/ updateOrder

	/*
	  #swagger.tags = ['Orders'];
	  #swagger.summary = 'Update Order by ID';
	  #swagger.description = 'API to update Order based on Order ID';
	  #swagger.consumes = ['application/json'];
	  #swagger.parameters['id'] = {
			  in: 'path',
			  required: true,
			  type: 'number',
			  description: 'Order ID that will be updated',
			  example: 1
		}
		  #swagger.requestBody ['edit'] = {
		  in: 'body',
		  required: true,
		  type: 'object',
		  description: 'Order to be created',
		  schema: {
			   $ref: "#/definitions/Orders"}	
		}
		  #swagger.responses[200] = {
				description: 'Order successfully updated.',
		  }
		  #swagger.responses[400] = {
				description: 'Order not found.',
				schema: {
					error: 'Order not found.'
				}
			}
					  */
);

router.delete(
	"/:id",
	/*authpassport,
auth.isAdmin,*/ deleteOrder

	/*
	  #swagger.tags = ['Orders'];
	  #swagger.summary = 'Delete Order by ID';
	  #swagger.description = 'API to delete Order based on Order ID';
	  #swagger.consumes = ['application/json'];
	  #swagger.parameters['id'] = {
			  in: 'path',
			  required: true,
			  type: 'number',
			  description: 'Order ID that will be deleted',
			  example: 1
		}
		  #swagger.responses[200] = {

				description: 'Order successfully deleted.',
		  }
		  #swagger.responses[400] = {
				description: 'Order not found.',
				schema: {
					error: 'Order not found.'
				}
			}
					  */
);

module.exports = router;
