const express = require("express");
const authController = require("../../controllers/auth");
const route = express.Router();

route.post("/", authController.postLogin);

module.exports = route;