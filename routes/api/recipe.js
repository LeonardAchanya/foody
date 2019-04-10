const express = require("express");
const route = express.Router();
const authenticate = require("../../middlewares/auth");

const recipeController = require("../../controllers/recipe");

route.get("/", recipeController.getAllRecipes);
route.get("/:id", recipeController.getRecipeById);
route.get("/user/:id",authenticate, recipeController.getUserRecipes);
route.post("/add", authenticate, recipeController.postRecipe);

module.exports = route;