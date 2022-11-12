const { text } = require("body-parser");
const { INTEGER } = require("sequelize");

// use swagger autogen
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.3" });

// where the output swagger jsn will go
const outputFile = "../config/swagger.json";

// where swagger will get initial routes from
const endpointsFiles = ["../routes/index.js"];

// declare configuation setting for swagger
const config = {
	info: {
		title: "Libraryverse",
		description: "Welcome to BEDU Team 6 Book API!",
	},
	servers: [
		{
			url: "http://localhost:3000/",
			description: "LocalSqlite server",
		},
		{
			url: "http://localhost:5668/",
			description: "Local Postgress server",
		},
		{
			url: "https://libroverse-production.up.railway.app/",
			description: "railway server",
		},
	],
	openapi: "3.0.3",
	tags: [
		{
			name: "Home",
			description: "Home page for Libroverse",
		},
		{
			name: "Users",
			description: "Users API",
		},
		{
			name: "Categories",
			description: "Categories API",
		},
		{
			name: "Editorials",
			description: "Editorials API",
		},
		{
			name: "Books",
			description: "Books API",
		},
		{
			name: "Libraries",
			description: "Libraries API",
		},
		{
			name: "Roles",
			description: "Roles API for all the users",
		},
		{
			name: "User Filters",
			description: "User Filters API",
		},
		{
			name: "Reviews",
			description: "Reviews API",
		},
		{
			name: "Orders",
			description: "Orders API",
		},
	],
	securityDefinitions: {
		bearer: {
			type: "http",
			scheme: "bearer",
			bearerFormat: "JWT",
		},
	},
	definitions: {
		Roles: {
			id: "2",
			rol: "user",
		},
		Users: {
			username: "kingofthenorth",
			userpass: "123456",
			firstname: "jon",
			lastname: "snow",
			address: "123 winderfell",
			email: "winter@fell.com",
			phonenumber: "1234567890",
			rol: "2",
		},
		Library: {
			name: "King's Landing",
			description: "The capital of the seven kingdoms",
		},
		Book: {
			book_name: "A Game of thrones",
			author: "George RR martin",
			description: "a song of ice and fire",
			publication_date: "1996",
			category: "fantasy",
		},
		Category: {
			genre: "fantasy",
			description: "a genre of fiction",
		},
		Login: {
			username: "kingofthenorth",
			userpass: "12345",
		},
		Editorial: {
			name: "Bantam Books",
			country: "mexico",
			editorial_desc: "a book publisher",
		},
		Orders: {
			user_id: "1",
			payment_amount: "420.69",
			order_date: "04/20/1969",
		},
		Reviews: {
			review: "Lorem epsum my guy",
			rating: "5",
			user_id: "1",
			book_id: "1",
		},
	},
};

// run swagger using declared values
swaggerAutogen(outputFile, endpointsFiles, config);
