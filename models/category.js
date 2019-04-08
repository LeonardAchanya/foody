const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class Category extends Sequelize.Model {}

Category.init({
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }
}, {sequelize});

module.exports = Category;