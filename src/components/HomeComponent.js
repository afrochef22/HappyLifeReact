import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Row,
	Form,
	Col,
	Button,
	Input,
} from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import CurrentLocation from "./LocationsComponent";
import LocationSearchInput from "./AutoCompleteSearchComponent";
// import Search from './LocationSearchComponent'
// import CurrentLocation from "./CurrentLocationComponent";


function RenderCard(props) {
	console.log(props);
	// if (isLoading) {
	// 	return <Loading />;
	// }
	// if (errMess) {
	// 	return <h4>{errMess}</h4>;
	// }
	return (
		<FadeTransform
			in
			transformProps={{
				exitTransform: "scale(0.5) translateY(50%)",
			}}
		>
			<Card>
				<CardImg />
				<CardBody>
					<CardTitle></CardTitle>
					<CardText></CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	);
}

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: [],
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLocation = this.handleLocation.bind(this);
	}

	handleLocation(e) {
		this.setState({ location: e.target.value });
		console.log(this.state.location);
	}

	handleSubmit(e) {
		e.preventDefault();
		// this.handleSearch();
	}

	render() {
		return (
			<div>
				<CurrentLocation />

				{/* <Form className="searchbox" onSubmit={this.handleSubmit}>
					<Row className="form-group">
						<Input
							type="text"
							model=".location"
							className="form-control"
							placeholder="city/address"
							onChange={this.handleLocation}
						/>
					</Row>
					<Col md={{ size: 10 }}>
						<Button type="submit" color="primary">
							submit
						</Button>
					</Col>
				</Form> */}

				{/* <div className="container">
					<div className="row">
						<div className="col-md m-1">
							<RenderCard
								item={this.props}
								// isLoading={}
								// errMess={}
							/>
						</div>
						<div className="col-md m-1">
							<RenderCard
							// item={}
							// isLoading={}
							// errMess={}
							/>
						</div>
						<div className="col-md m-1">
							<RenderCard
							// item={}
							// isLoading={}
							// errMess={}
							/>
						</div>
					</div>
				</div> */}
        {/* <CurrentLocation /> */}
        {/* <Search /> */}
        {/* <LocationSearchInput /> */}
			</div>
		);
	}
}

export  {Home, RenderCard};
