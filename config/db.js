const { Sequelize } = require("sequelize");

// node env development/staging/production switch databases
const sequelize = new Sequelize(
		process.env.PGDATABASE,
		process.env.PGUSER,
		process.env.PGPASSWORD,
		{
			URL: process.env.DATABASE_URL,
			host: process.env.PGHOST,
			dialect: process.env.DIALECT,
			port: process.env.PORTDB,
		}
	);
	
module.exports = sequelize;