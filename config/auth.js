const secret = require("./secret");
const { expressjwt } = require("express-jwt");

// Get Token from Header
function getTokenFromHeader(req) {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] == "Bearer"
	) {
		return req.headers.authorization.split(" ")[1];
	}
}

// Verify Token
const auth = {
	required: function (req, res, next) {
		if (!req.auth) {
			return res.status(401).json({ Error: "Credentials not founded" });
		}
		if (!req.user || !req.auth.user) {
			console.log("NOT pass double verification");
			return res.status(403).json({ Error: "Something wrong in verification" });
		}
		next();
	},
	isAdmin: function (req, res, next) {
		if (!req.auth) {
			return res.status(401).json({ Error: "Credentials not founded" });
		}
		if (req.auth.type !== 1) {
			return res
				.status(403)
				.json({ Error: "You are not an admin, can't access this info" });
		}
		//console.log(req.auth)
		next();
	},
	optional: expressjwt({
		secret: secret,
		algorithms: ["HS256"],
		userProperty: "user",
		credentialsRequired: false,
		getToken: getTokenFromHeader,
	}),
};

module.exports = auth;
