const Recipe = require("../models/recipe");
const User = require("../models/users");

exports.getAllRecipes = (req, res, next) => {
    Recipe.findAll()
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
	Recipe.findByPk(recipeId)
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
    console.log("getUserRecipes");
	// const userId = req.userId;
    // Recipe.findOne({
    //     where:{
    //         UserId:id
    //     }
    // })
    // .then((recipes)=>{
    //     res.json(recipes)
    // })
    // .catch(err=> res.json({
    //     success:false
    // }))
}

exports.postRecipe = (req, res) => {
	const { title,description,imageUrl,CategoryId } = req.body;
	const UserId = req.userId;

	User.findByPk(UserId)
		.then(user => {
	Recipe.create({
					title,
					description,
					imageUrl,
					CategoryId,
					UserId
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