import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
	Button,
	Form,
	FormGroup,
    Card,
    CardHeader,
    CardBody,
    // Label,
    Input,
	Spinner,
	Alert,
	Row,
	Col
} from "reactstrap";

import { addRecipe, addRecipeInit } from "../store/actions/recipe";

class AddRecipe extends Component {
	// constructor(props) {
	// 	super(props);
	// 	// Sets the "jobCreated" state to false when component is mounted
	// 	this.props.onAddJobInit();
	// }
	state = {
		title: "",
		description: "",
		imageUrl: "",
		CategoryId: ""
	};

	save = e => {
		e.preventDefault();
		const formData = {
			title: this.state.title,
			description: this.state.description,
			imageUrl: this.state.imageUrl,
			CategoryId: this.state.CategoryId
		};
		// Sets the "jobCreated" state to true on success,
		// this to redirect to home because we're using
		// the <Redirect /> component.
		this.props.onAddRecipe(JSON.stringify(formData));
	};

	onChanged = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		return (
			<>
				<Row>
					<Col md={{ size: 6, offset: 3 }}>
						{this.props.recipeCreated && <Redirect to="/" />}
                        <Card style={{marginTop:"10px"}}>
                            <CardHeader tag="h2">Upload Recipe</CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.save}>
							{this.props.error && (
								<Alert color="danger">{this.props.error.msg}</Alert>
                            )}
                            
							<FormGroup>
								{/* <Label for="Recipe Title">Title</Label> */}
								<Input
									type="text"
									name="title"
									id="title"
									placeholder="Recipe Title"
									onChange={this.onChanged}
								/>
							</FormGroup>
                            <FormGroup>
                                {/* <Label for="Recipe Image">Recipe Image</Label> */}
                                    <Input type="file" name="imageUrl" id="imageUrl" />
                            </FormGroup>
                            <FormGroup>
                                {/* <Label for="recipe category">Select Category</Label> */}
                                <Input type="select" name="CategoryId" id="categoryId" onChange={this.onChanged}>
                                     <option value="">Select Recipe Category</option>
                                     <option value="1">African Dish</option>
                                     <option value="2">British Dish</option>
                                     <option value="3">Jamaican Dish</option>
                                </Input>
                            </FormGroup><FormGroup>
								{/* <Label for="recipe description">Description</Label> */}
								<Input
                                    type="textarea"
                                    rows="7"
									name="description"
									id="description"
									placeholder="Recipe Description"
									onChange={this.onChanged}
								/>
							</FormGroup>
                            
							{this.props.isLoading ? (
								<Spinner color="danger" />
							) : (
								<Button color="danger">Add</Button>
							)}
						</Form>
                        </CardBody>
                        </Card>
					</Col>
				</Row>
			</>
		);
	}
}

const mapStateToProps = state => ({
	isLoading: state.recipe.isLoading,
	recipeCreated: state.recipe.recipeCreated,
	error: state.recipe.error
});

const mapDispatchToProps = dispatch => ({
	onAddRecipeInit: () => dispatch(addRecipeInit()),
	onAddRecipe: recipeData => dispatch(addRecipe(recipeData))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddRecipe);
