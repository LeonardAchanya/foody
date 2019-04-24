import axios from "../../utils/axios-base";
import * as types from "./types";

export const loading = () => {
	return {
		type: types.LOADING
	};
};

export const getRecipesSuccess = recipes => {
	return {
		type: types.GET_RECIPES_SUCCESS,
		recipes
	};
};

export const getUserRecipesSuccess = recipes => {
	return {
		type: types.GET_USER_RECIPES_SUCCESS,
		recipes
	};
};

export const errorOccured = error => {
	return {
		type: types.ERROR_OCCURED,
		error
	};
};

export const getRecipes = () => {
	return dispatch => {
		dispatch(loading());
		axios
			.get("/recipe")
			.then(res => {
				dispatch(getRecipesSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};


export const getUserRecipes = () => {
	return (dispatch, getState) => {
		dispatch(loading());
		const token = getState().auth.token;

		// Headers
		const config = {
			headers: {}
		};

		if (token) {
			config.headers["x-access-token"] = token;
		}
		axios
			.get("/recipe/user/recipes", config)
			.then(res => {
				dispatch(getUserRecipesSuccess(res.data));
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};

export const getSingleRecipe = recipeId => {
	return dispatch => {
		dispatch(loading());
		axios
			.get(`/recipe/${recipeId}`)
			.then(res => {
				dispatch({ type: types.GET_SINGLE_RECIPE_SUCCESS, recipe: res.data });
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};

export const addRecipeInit = () => {
	return {
		type: types.ADD_RECIPE_INIT
	};
};

export const addRecipe = recipeData => {
	return (dispatch, getState) => {
		dispatch(loading());
		const token = getState().auth.token;
		let formData = null;

		const config = {
			headers: {}
		};

		if (token) {
			config.headers["x-access-token"] = token;
			config.headers["Content-Type"] = "multipart/form-data";
			formData = new FormData();
			formData.append("title", recipeData.title);
			formData.append("description", recipeData.description);
			formData.append("categoryId", recipeData.categoryId);
			formData.append("image", recipeData.image);
		}
		axios
			.post("/recipe/add", formData, config)
			.then(res => {
				return dispatch({ type: types.ADD_RECIPE_SUCCESS });
			})
			.then(() => {
				dispatch(addRecipeInit());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};

export const editRecipeInit = recipeId => {
	return (dispatch, getState) => {
		const token = getState().auth.token;
		const userId = getState().auth.userId;

		const config = {
			headers: {}
		};

		if (token) {
			config.headers["x-access-token"] = token;
		}

		axios
			.get(`recipe/edit/${recipeId}`, config)
			.then(res => {
				// eslint-disable-next-line
				if (res.data.userId != userId) {
					console.log("recipe userId dont match");
				} else {
					// console.log(res.data)
					dispatch({ type: types.EDIT_RECIPE_INIT, recipe: res.data });
				}
			})
			.catch(err => dispatch(errorOccured(err)));
	};
};

export const editRecipeDone= () => {
	return {
		type: types.EDIT_RECIPE_DONE
	};
};

export const editRecipe = (recipeData) => {
	return (dispatch, getState) => {
		dispatch(loading());
		const token = getState().auth.token;
		const recipeId = getState().recipe.recipe.id;
		let formData = null;

		const config = {
			headers: {}
		};

		if (token) {
			config.headers["x-access-token"] = token;
			config.headers["Content-Type"] = "multipart/form-data";
			formData = new FormData();
			formData.append("title", recipeData.title);
			formData.append("description", recipeData.description);
			formData.append("categoryId", recipeData.categoryId);
			formData.append("image", recipeData.image);
		}
		axios
			.put(`recipe/edit/${recipeId}`, formData, config)
			.then(res => {
				return dispatch({ type: types.EDIT_RECIPE_SUCCESS });
			}).then(() => {
				dispatch(editRecipeDone());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};

export const deleteRecipeInit = () => {
	return {
		type: types.DELETE_RECIPE_INIT
	};
};

export const deleteRecipe = recipeId => {
	return (dispatch, getState) => {
		dispatch(loading());
		const token = getState().auth.token;

		const config = {
			headers: {}
		};

		if (token) {
			config.headers["x-access-token"] = token;
		}
		axios
			.delete(`recipe/${recipeId}`, config)
			.then(res => {
				return dispatch({ type: types.DELETE_RECIPE_SUCCESS });
			})
			.then(() => {
				dispatch(deleteRecipeInit());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};
