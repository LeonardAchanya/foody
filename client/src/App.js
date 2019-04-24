import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavBar/AppNavBar";
import Logout from "./components/Logout";
import { Home, Recipes, RecipeDetail, UserRecipes, Auth, EditRecipe, AddRecipe } from "./pages";

import { authAutoLogin, loadAuthUser } from "./store/actions/auth"
class App extends Component {

  componentDidMount = () => {
    this.props.onAutoLogin();
    if (this.props.isAuth) {
      this.props.onLoadAuthUser();
    }
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe/:id" component={RecipeDetail} />
        <Route path="/" exact component={Home} />
        <Route render={() => <h2>Not Found</h2>} />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/recipe/:id" component={RecipeDetail} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/add-recipe" component={AddRecipe} />

          <Route path="/my-recipes" component={UserRecipes} />
          <Route path="/edit-recipe/:id" component={EditRecipe} />
          
          <Route path="/" exact component={Home} />
          <Route render={() => <h2>Not Found</h2>} />
        </Switch>
      );
    }
    return (
      <div className="App">
        <AppNavbar isAuth={this.props.isAuth} user={this.props.user} />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null,
  user: state.auth.user

});

const mapDispatchToProps = dispatch => ({
  onAutoLogin: () => dispatch(authAutoLogin()),
  onLoadAuthUser: () => dispatch(loadAuthUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);