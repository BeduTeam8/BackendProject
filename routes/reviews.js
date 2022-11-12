const router = require("express").Router();
const auth = require("../config/auth");
const passport = require("passport");

const authpassport = passport.authenticate("bearer", {
	session: false,
	assignProperty: "user",
});

const {
	createReview,
	getReview,
	getReviews,
	updateReview,
	deleteReview,
} = require("../controllers/reviews");

router.get(
	"/",
	getReviews
	/*
	#swagger.tags = ['Reviews'];
	#swagger.summary = 'Get all Reviews';
	#swagger.description = 'API to get all Reviews';
	#swagger.responses[200] = {
		description: 'all Reviews successfully obtained.',
	}
	*/
);

router.get(
	"/:id",
	getReview
	/*
	#swagger.tags = ['Reviews'];
	#swagger.summary = 'Get Review by ID';
	#swagger.description = 'API to get Review based on Review ID';
	#swagger.consumes = ['application/json'];
	#swagger.parameters['id'] = {
		in: 'path',
		required: true,
		type: 'number',
		description: 'Review ID that will be search',
		example: 1
	}
	#swagger.responses[200] = {
		description: 'Review successfully obtained.',}
	#swagger.responses[400] = {
		description: 'Review not found.',
		schema: {
			error: 'Review not found.'
		}
	}
	*/
);

router.post(
	"/",
	/* authpassport,
auth.required,*/ createReview

	/*
	#swagger.tags = ['Reviews'];
	#swagger.summary = 'Create a Review';
	#swagger.description = 'API to create a Review';
	#swagger.consumes = ['application/json'];
	#swagger.requestBody['Review'] = {
		in: 'body',
		required: true,
		type: 'object',
		description: 'Review object that will be created',
		schema: {
			$ref: '#/definitions/Reviews'
		}
	}
	#swagger.responses[200] = {
		description: 'Review successfully created.',
	}
	#swagger.responses[400] = {
		description: 'Review not created.',
		schema: {
			error: 'Review not created.'
		}
	}
	*/
);

router.put(
	"/:id",
	/*authpassport,
auth.required,*/ updateReview
	/*
	#swagger.tags = ['Reviews'];
	#swagger.summary = 'Update a Review';
	#swagger.description = 'API to update a Review';
	#swagger.consumes = ['application/json'];
	#swagger.parameters['id'] = {
		in: 'path',
		required: true,
		type: 'number',
		description: 'Review ID that will be updated',
		example: 1
	}
	#swagger.requestBody['Review'] = {
		in: 'body',
		required: true,
		type: 'object',
		description: 'Review object that will be updated',
		schema: {
			$ref: '#/definitions/Reviews'
		}
	}
	#swagger.responses[200] = {
		description: 'Review successfully updated.',
	}
	#swagger.responses[400] = {
		description: 'Review not updated.',
		schema: {
			error: 'Review not updated.'
		}
	}
	*/
);

router.delete(
	"/:id",
	/*authpassport,
auth.isAdmin,*/ deleteReview
	/*
	#swagger.tags = ['Reviews'];
	#swagger.summary = 'Delete a Review';
	#swagger.description = 'API to delete a Review';
	#swagger.consumes = ['application/json'];
	#swagger.parameters['id'] = {
		in: 'path',
		required: true,
		type: 'number',
		description: 'Review ID that will be deleted',
		example: 1
	}
	#swagger.responses[200] = {
		description: 'Review successfully deleted.',
	}
	#swagger.responses[400] = {
		description: 'Review not deleted.',
		schema: {
			error: 'Review not deleted.'
		}
	}
	*/
);

module.exports = router;
