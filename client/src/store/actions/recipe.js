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

// This is possible because of the redux-thunk middleware
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
	return (dispatch,getState) => {
		dispatch(loading());
		const token = getState().auth.token;

		// Headers
		const config = {
			headers: {}
		};

		// If token, add to headers
		if (token) {
			config.headers["x-access-token"] = token;
		}
		axios
			.get("/recipe/user/recipes")
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

// This is possible because of the redux-thunk middleware
export const addRecipe = recipeData => {
	return (dispatch, getState) => {
		dispatch(loading());
		const token = getState().auth.token;

		// Headers
		const config = {
			headers: {}
		};

		// If token, add to headers
		if (token) {
			config.headers["x-access-token"] = token;
		}
		axios
			.post("/recipe/add", recipeData, config)
			.then(res => {
				return dispatch({ type: types.ADD_RECIPE_SUCCESS });
			})
			.then(() => {
				dispatch(addRecipeInit());
			})
			.catch(err => dispatch(errorOccured(err.response.data)));
	};
};
