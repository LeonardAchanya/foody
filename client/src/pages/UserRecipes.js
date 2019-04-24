import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Spinner } from "reactstrap";
import { Redirect } from "react-router-dom";

import RecipeCard from "../components/RecipeCard/RecipeCard";
import { deleteRecipe, deleteRecipeInit, getUserRecipes } from "../store/actions/recipe";

class UserRecipes extends Component {
    componentDidMount() {
        this.props.onGetUserRecipes();
    }

    removeRecipe = (recipeId) => {
        // console.log(recipeId)
        this.props.onDeleteRecipe(recipeId);

    }
    render() {
        return (
            <Container>
                <h2>My Recipes</h2>
                {this.props.recipeDeleted && <Redirect to="/" />}
                <Row>
                    {this.props.isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Spinner color="dark" />
                        </div>
                    ) : (
                            <RecipeCard recipes={this.props.recipes} isAuth={this.props.isAuth} userId={this.props.userId} removeRecipe={this.removeRecipe} />
                        )}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.recipe.recipes,
    isLoading: state.recipe.isLoading,
    recipeDeleted: state.recipe.recipeDeleted,
    isAuth: state.auth.token !== null,
    userId:state.auth.userId


});

const mapDispatchToProps = dispatch => ({
    onGetUserRecipes: () => dispatch(getUserRecipes()),
    onDeleteRecipeInit: () => dispatch(deleteRecipeInit()),
    onDeleteRecipe: recipeId => dispatch(deleteRecipe(recipeId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserRecipes);