const express = require("express");
const route = express.Router();
const authenticate = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const recipeController = require("../../controllers/recipe");

route.get("/", recipeController.getAllRecipes);
route.get("/:id", recipeController.getRecipeById);
// route.post("/edit/:id",authenticate, recipeController.postUpdateRecipe);
route.get("/user/recipes",authenticate, recipeController.getUserRecipes);
route.post("/add", authenticate,upload.single("image"), recipeController.postRecipe);
route.delete("/:id", authenticate, recipeController.deleteRecipe);

module.exports = route;