const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./users");
const Recipe = require("./recipe");

class Like extends Sequelize.Model {}

Like.init({},{sequelize});

User.hasMany(Like);
Recipe.hasMany(Like);

module.exports = Like;