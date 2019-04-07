import React, { Component } from "react";
import { Row } from "reactstrap";

import RecipeCard from "../components/RecipeCard/RecipeCard";

class Home extends Component {

    render() {
        return (
            <>
                <h2>Home</h2>
                <Row>
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                    <RecipeCard />
                </Row>
            </>
        )
    }
}

export default Home;