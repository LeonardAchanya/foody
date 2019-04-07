const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("../models/users");
const Receipe = require("../models/reciepe");

class Like extends Sequelize.Model {}

Like.init({},{sequelize});

User.hasMany(Like);
Receipe.hasMany(Like);

module.exports = Like;