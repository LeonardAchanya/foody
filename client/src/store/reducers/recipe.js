import * as types from "../actions/types";

const initialState = {
	recipes: [],
	recipe: null,
	isLoading: false,
	recipeCreated: false,
	error: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_RECIPES_SUCCESS:
			return {
				...state,
				recipes: action.recipes,
				isLoading: false
			};
		case types.GET_SINGLE_RECIPE_SUCCESS:
			return {
				...state,
				recipe: action.recipe,
				isLoading: false
			};
		case types.ADD_RECIPE_INIT:
			return {
				...state,
				recipeCreated: false,
				error: null
			};
		case types.ADD_RECIPE_SUCCESS:
			return {
				...state,
				isLoading: false,
				recipeCreated: true,
				error: null
			};
		case types.LOADING:
			return {
				...state,
				isLoading: true
			};
		case types.ERROR_OCCURED:
			return {
				...state,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};

export default reducer;
