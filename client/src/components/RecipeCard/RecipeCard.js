import React from 'react';
import { NavLink } from 'react-router-dom';
import striptags from 'striptags';


import "./RecipeCard.css";

const RecipeCard = ({recipes,isAuth,removeRecipe}) => {
    return (
        <>
           {recipes.map(recipe => (
                <div className="recipe-card" key={recipe.id}>
                <img src={`http://localhost:5000/${recipe.imageUrl}`} alt="recipe img"/>
                    <div className="recipe-details">
                        <h3 className="recipe-title">{recipe.title}</h3>
                        <h5 className="recipe-category">{recipe.category.title}</h5>
                        <h6 className="recipe-user">by {recipe.user.username}</h6>
                        <div className="recipe-description">{striptags(recipe.description).slice(0,25)+"..."} <NavLink to={`recipe/`+ recipe.id}>Read More</NavLink></div>
                        
                    </div>
                    {isAuth? 
                    <>
                    <div className="recipe-actions">
                        {/* <i class="far fa-bookmark"></i>  */}
                        <i className="fas fa-bookmark"></i>
                        <i className="far fa-heart">12</i>
                        <i className="far fa-comment-alt">123</i>
                    
                    <button onClick={() => removeRecipe(recipe.id)}>DELETE</button>

                    </div>

                    </>
                    :
                    ""
                    }
                </div>
            ))}

        </>
            );
        };
        
export default RecipeCard;