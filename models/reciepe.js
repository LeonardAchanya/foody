const Sequelize = require("sequelize");
const sequelize = require("../config/database");

class Receipe extends Sequelize.Model {}

Receipe.init({
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

module.exports = Receipe;