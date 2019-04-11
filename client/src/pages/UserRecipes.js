import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Spinner } from "reactstrap";

import RecipeCard from "../components/RecipeCard/RecipeCard";
import { getUserRecipes } from "../store/actions/recipe";

class UserRecipes extends Component {
componentDidMount(){
    this.props.onGetUserRecipes();
}
    render() {
        return (
            <>
                <h2>My Recipes</h2>
                <Row>
                    {this.props.isLoading ? (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Spinner color="dark" />
						</div>
					) : (
                        <RecipeCard  recipes={this.props.recipes}/>
                        )}
                </Row>
            </>
        )
    }
}

const mapStateToProps = state => ({
	recipes: state.recipe.recipes,
	isLoading: state.recipe.isLoading
});

const mapDispatchToProps = dispatch => ({
	onGetUserRecipes: () => dispatch(getUserRecipes())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserRecipes);