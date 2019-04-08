import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Spinner } from "reactstrap";

import RecipeCard from "../components/RecipeCard/RecipeCard";
import { getRecipes } from "../store/actions/recipe";

class Home extends Component {
componentDidMount(){
    this.props.onGetRecipes();
}
    render() {
        return (
            <>
                <h2>Home</h2>
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
	onGetRecipes: () => dispatch(getRecipes())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);