import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Spinner } from "reactstrap";

import RecipeCard from "../components/RecipeCard/RecipeCard";
import { getRecipes } from "../store/actions/recipe";

class Recipes extends Component {
componentDidMount(){
    this.props.onGetRecipes();
}
    render() {
        return (
            <Container>
                <Row>
                    {this.props.isLoading ? (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<Spinner color="dark" />
						</div>
					) : (
                        <RecipeCard  recipes={this.props.recipes} isAuth={this.props.isAuth} userId={this.props.userId}/>
                        )}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
	recipes: state.recipe.recipes,
    isLoading: state.recipe.isLoading,
    isAuth: state.auth.token !== null,
    userId:state.auth.userId

    
});

const mapDispatchToProps = dispatch => ({
	onGetRecipes: () => dispatch(getRecipes())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Recipes);