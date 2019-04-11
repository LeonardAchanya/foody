import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";

import { getSingleRecipe } from "../store/actions/recipe";

class RecipeDetail extends Component {
	componentDidMount = () => {
		const recipeId = +this.props.match.params.id;
		this.props.onGetSingleRecipe(recipeId);
	};

	render() {
		const { recipe } = this.props;
		return (
			<Container>
				<h1>Detail</h1>
				{this.props.isLoading ? (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Spinner color="dark" />
					</div>
				) : (
                    <>
					<h2>{ recipe && recipe.title}</h2>
					<h2>{recipe &&  recipe.description}</h2>
					<h2>{recipe &&  recipe.category.title}</h2>
					<h2>By {recipe &&  recipe.user.firstname+ " "+ recipe.user.lastname}</h2>
                    </>
				)}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	recipe: state.recipe.recipe,
	isLoading: state.recipe.isLoading
});

const mapDispatchToProps = dispatch => ({
	onGetSingleRecipe: recipeId => dispatch(getSingleRecipe(recipeId))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeDetail);
