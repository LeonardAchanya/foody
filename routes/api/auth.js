const express = require("express");
const authController = require("../../controllers/auth");
const authenticate = require("../../middlewares/auth");

const route = express.Router();

route.post("/", authController.postLogin);
route.get("/user", authenticate, authController.getCurrentUser);


module.exports = route;