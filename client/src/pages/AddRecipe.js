import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Editor } from '@tinymce/tinymce-react';

import {
	Button,
	Form,
	FormGroup,
	Card,
	CardHeader,
	CardBody,
	// Label,
	FormText,
	Input,
	Spinner,
	Alert,
	Row,
	Col
} from "reactstrap";

import { addRecipe, addRecipeInit } from "../store/actions/recipe";

class AddRecipe extends Component {
	state = {
		title: "",
		description: "",
		image: "",
		categoryId: ""
	};

	onChanged = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleEditorChange = (e) => {
		this.setState({
			description: e.target.getContent()
		});
	}

	onImgChanged = e => {
		this.setState({
			image: e.target.files[0]
		});
	};

	save = e => {
		e.preventDefault();
		const formData = {
			title: this.state.title,
			description: this.state.description,
			image: this.state.image,
			categoryId: this.state.categoryId
		};

		this.props.onAddRecipe(formData);
	};

	render() {
		return (
			<>
				<Row>
					<Col md={{ size: 6, offset: 3 }}>
						{this.props.recipeCreated && <Redirect to="/" />}
						<Card style={{ marginTop: "10px" }}>
							<CardHeader tag="h2">Upload Recipe</CardHeader>
							<CardBody>
								<Form onSubmit={this.save} encType="multipart/form-data">
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
										{/* <Label for="recipeImage">Recipe Picture</Label> */}
										<Input
											type="file"
											name="image"
											id="recipeImage"
											accept=".jpg, .jpeg, .png"
											onChange={this.onImgChanged}
										/>
										<FormText color="muted">
											Recipe Image must be png, jpg or jpeg format.
									</FormText>
									</FormGroup>
									<FormGroup>
										{/* <Label for="recipe category">Select Category</Label> */}
										<Input type="select" name="categoryId" id="categoryId" onChange={this.onChanged}>
											<option value="">Select Recipe Category</option>
											<option value="1">African Dish</option>
											<option value="2">British Dish</option>
											<option value="3">Jamaican Dish</option>
										</Input>
									</FormGroup>
									<FormGroup>
										<Editor
											initialValue="<p>Recipe Description</p>"
											init={{
												plugins: 'link image code',
												toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
											}}
											name="description"
											id="description"
											onChange={this.handleEditorChange}
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
	onAddRecipe: formData => dispatch(addRecipe(formData))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddRecipe);
