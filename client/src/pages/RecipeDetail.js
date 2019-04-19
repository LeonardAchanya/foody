import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner, Container } from "reactstrap";

import Footer from "../components/Footer/Footer";

import { getSingleRecipe } from "../store/actions/recipe";

class RecipeDetail extends Component {
	componentDidMount = () => {
		const recipeId = +this.props.match.params.id;
		this.props.onGetSingleRecipe(recipeId);
	};

	render() {
		const { recipe } = this.props;
		return (
			<>
			<Container>
				<h1>{recipe && recipe.title}</h1>
				{this.props.isLoading ? (
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Spinner color="dark" />
					</div>
				) : (
						<>
							<section className="phase3">
								<img src={`http://localhost:5000/${recipe && recipe.imageUrl}`} alt="recipe" />
								<h4>by {recipe && recipe.user.firstname} {recipe && recipe.user.lastname}</h4>
								<h2>How is it done?</h2>
								<p>{recipe && recipe.description}</p>
								<div className="actions">
									<i className="fas fa-bookmark"></i>
									<i className="far fa-heart">12</i>
									<i className="far fa-comment-alt">123</i>
								</div>
							</section>

						</>
					)}
			</Container>
					<Footer/>
					</>
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
