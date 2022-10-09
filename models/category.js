const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
    genre: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING
    }
});

module.exports = Category;