require("dotenv").config();
require("./config/passport");
const express = require("express");
const sequelize = require("./config/db");
const routes = require("./routes/index");
const auth = require("./config/auth");

// inport helmet and cors
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(auth.optional);
app.use("/", routes);

// use helmet and use cors
app.use(helmet());

app.use(cors({
    origin: 'http://localhost:3000'
}));
//app.use(cors({credentials: true, origin: '*'}));
//app.use(function(req, res, next) {
//	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//	next();
});

// try {
// 	sequelize.authenticate().then(() => {
// 		console.log("DB Authenticated");
// 	});
// 	sequelize.sync({ force: true }).then(() => {
// 		console.log("DB syncronized " + process.env.NODE_ENV);
// 	});

// 	console.log("Connected to DB");
// } catch (error) {
// 	console.log("Unable to connect to DB:", error);
// }

app.listen(process.env.PORT || 3000, () => {
	console.log("Server listening on PORT: " + process.env.PORT);
});

// swagger js docs and swagger ui express for api documentation

const swaggerUi = require("swagger-ui-express");

// import swagger definition from swagger.js
const swaggerOptions = require("./config/swagger");

// initialize swagger-jsdoc
// const swaggerDocs = swaggerJsDoc(swaggerOptions); // not in use

const swaggerDocument = require("./config/swagger.json");
// use swagger-Ui-express for app documentation endpoint

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, { explorer: true })
);
