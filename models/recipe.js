const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Category = require("./category");
const User = require("./users");

class Recipe extends Sequelize.Model {}

Recipe.init({
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl:{
        type: Sequelize.STRING,
        allowNull: false
    }

}, {sequelize});

module.exports = Recipe;