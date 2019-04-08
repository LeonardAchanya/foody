const express = require("express");
const route = express.Router();

const CategoryController = require("../../controllers/category");

route.get("/", CategoryController.getCategories);
route.post("/", CategoryController.postCategory);

module.exports = route;