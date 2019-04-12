const express = require("express");
const route = express.Router();

const userController = require("../../controllers/user");
const upload = require("../../middlewares/upload");

route.get("/", userController.getUsers);
route.post("/",upload.single("image"), userController.postAddUser);

module.exports = route;