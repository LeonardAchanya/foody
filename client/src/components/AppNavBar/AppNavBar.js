import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
  // NavLink as BstNavLink,
} from "reactstrap";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <div>
        <Navbar dark expand="md" style={{backgroundColor:"orange"}}>
          <NavbarBrand style={{color:"whitesmoke"}}>Foody</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink exact to="/" className="nav-link">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/recipes" className="nav-link">
                  Recipes
                </NavLink>
              </NavItem>
              {this.props.isAuth && (
                <NavItem>
                  <NavLink to="/add-recipe" className="nav-link">
                    Upload Recipe
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                {this.props.isAuth ? (
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink to="/auth" className="nav-link">
                    Login
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;