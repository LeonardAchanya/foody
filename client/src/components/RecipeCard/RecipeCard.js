import React from 'react';
import {Col ,Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle} from 'reactstrap';

const RecipeCard = ({recipes}) => {
    return (
        <>
			{recipes.map(recipe => (
            <Col key={recipe.id} sm="4" style={{marginBottom:"10px"}}>
                <Card >
                    <CardBody>
                        <CardTitle>{recipe.title}</CardTitle>
                        <CardSubtitle>by {recipe.user.firstname+ " "+ recipe.user.lastname}</CardSubtitle>
                    </CardBody>
                    {/* <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Recipe" /> */}
                    <CardBody>
                        <CardText>{recipe.description}</CardText>
                        <CardLink href={`recipe/`+ recipe.id}>Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                    </CardBody>
                </Card>
            </Col>
            ))}
        </>
    );
};

export default RecipeCard;