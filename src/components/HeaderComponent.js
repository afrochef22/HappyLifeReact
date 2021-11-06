import React, { Component } from "react";
import {
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	NavItem,
	Jumbotron,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input,
	Label,
	NavLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	CardImg,
} from "reactstrap";


class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isNavOpen: false,
			isModalOpen: false,
			isDropdownOpen: false,
		};

		this.toggleNav = this.toggleNav.bind(this);
		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		});
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	toggleDropdown() {
		this.setState({
			isDropdownOpen: !this.state.isDropdownOpen,
		});
	}

	render() {
		return (
			<React.Fragment>
				<Navbar dark expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<Button outline className="nav-link" to="/home">
										<i className="fa fa-home fa-lg home">Home</i>
									</Button>
								</NavItem>
								<Dropdown
									className="dropdown-btn"
									toggle={this.toggleDropdown}
									isOpen={this.state.isDropdownOpen}
								>
									<DropdownToggle className="dropdown-btn" id="dropdown-basic">
										<i className="fa fa-sort-down fa-lg"> Categories</i>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem href="#">Dive Bars</DropdownItem>
										<DropdownItem href="#">Breweries</DropdownItem>
										<DropdownItem href="#">Music Venue</DropdownItem>
										<DropdownItem href="#">Wine Bars</DropdownItem>
										<DropdownItem href="#">Sports Bars</DropdownItem>
										<DropdownItem href="#">Irish Pubs</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</Nav>
						</Collapse>

						<NavLink className="navbar-text ml-auto">
							<Button outline className="login-btn" onClick={this.toggleModal}>
								<i className="fa fa-sign-in fa-lg" /> Login
							</Button>
						</NavLink>

						<NavLink className="navbar-text ml-auto">
							<Button outline className="login-btn" onClick={this.toggleModal}>
								Sign Up
							</Button>
						</NavLink>
					</div>
				</Navbar>
				<section className="section-images">
					<img src="../images/img/nightLife2.jpg" alt="night life" />
					<div className="title">
						<h1>HappyLife</h1>
					</div>
				</section>
			</React.Fragment>
		);
	}
}
export default Header;
