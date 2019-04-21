const Recipe = require("../models/recipe");
const User = require("../models/users");

exports.getAllRecipes = (req, res, next) => {
	Recipe.findAll({
		include: [
			{
				all: true,
				attributes: { exclude: ["password", "createdAt", "updatedAt"] }
			}
		]
	})
        .then(
            (recipes) => {
                res.json(recipes)
            })
        .catch(err => res.json({
            success: false
        }))
}

exports.getRecipeById = (req, res) => {
	const recipeId = req.params.id;
	// Recipe.findByPk(recipeId)
	Recipe.findOne({
		where:{
			id: recipeId
		},
		include: [
			{
				all: true,
				attributes: { exclude: ["password", "createdAt", "updatedAt"] }
			}
		]
	})
		.then(recipe => {
			if (!recipe) {
				res.status(404).json({ success: false, message: "Recipe not Found" });
			} else {
				res.json(recipe);
			}
		})
		.catch(err =>
			res.status(500).json({
				success: false,
				message: "Something went wrong while getting the recipe"
			})
		);
};

exports.getUserRecipes = (req,res,next)=>{
	const userId = req.userId;
    Recipe.findAll({
        where:{
            userId
		},
		include: [
			{
				all: true,
				attributes: { exclude: ["password", "createdAt", "updatedAt"] }
			}
		]
    })
    .then((recipes)=>{
        res.json(recipes)
    })
    .catch(err=> res.json({
        success:false
    }))
}

exports.postRecipe = (req, res) => {
	const { title,description,categoryId } = req.body;
	const UserId = req.userId;
    let imageUrl = null;
	if (req.file) {
		imageUrl = req.file.path;
	}
	User.findByPk(UserId)
		.then(user => {
	Recipe.create({
					title,
					description,
					imageUrl,
					categoryId,
					userId: UserId
				})
					.then(recipe => {
						res.json(recipe);
					})
					// .catch(err => res.json({ message: "Recipe creation Failed", error: err }));
		})
		.catch(err =>
			res
				.status(500)
				.json({ msg: "Something went wrong while creating recipe", error: err })
		);
};

exports.postUpdateRecipe=(req,res,next)=>{
	console.log('update recipe');
};

exports.deleteRecipe = (req, res) => {
	const recipeId = req.params.id;
	Recipe.findByPk(recipeId)
		.then(recipe => {
			if (recipe.userId !== req.userId) {
				res
					.status(401)
					.json({ msg: "You can't delete a recipe you did not create" });
			} else {
				recipe
					.destroy()
					.then(() => {
						res.json({ success: true });
					})
					.catch(err => res.json({ success: false }));
			}
		})
		.catch(err =>
			res.json({ success: false, message: "This Recipe doesnt exists" })
		);
};