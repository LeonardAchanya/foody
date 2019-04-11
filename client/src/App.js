import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavBar/AppNavBar";
import Logout from "./components/Logout";
import {Home, Recipes,RecipeDetail,UserRecipes, Auth , AddRecipe} from "./pages";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe/:id"  component={RecipeDetail} />
        <Route path="/" exact component={Home} />
        <Route render={() => <h2>Not Found</h2>} />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/recipe/:id"  component={RecipeDetail} />
          <Route path="/recipes" component={Recipes} />
          <Route path="/my-recipes" component={UserRecipes} />
          <Route path="/add-recipe" component={AddRecipe} />
          <Route path="/" exact component={Home} />
          <Route render={() => <h2>Not Found</h2>} />
        </Switch>
      );
    }
    return (
      <div className="App">
        <AppNavbar isAuth={this.props.isAuth} />
        <Container>{routes}</Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.token !== null
});

export default connect(mapStateToProps)(App);