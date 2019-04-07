const express = require("express");
const route = express.Router();

const userController = require("../../controllers/user");

route.get("/", userController.getUsers);
route.post("/", userController.postAddUser);

module.exports = route;