import React, { Component } from "react";
import axios from "axios";
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
import LocationSearchInput from "./AutoCompleteSearchComponent";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";


const apiKey = process.env.REACT_APP_MY_API_KEY;

//  finds users current location
class CurrentLocation extends Component {
	constructor(props) {
		super(props);

		this.map = null;
		this.marker = null;

		this.state = {
			address: '' ,
			currentLocation: {
				lat: 34.0522342,
				lng: -118.2436849,
			},
			data: [],
			photos: [],
		};
		// this.findPhotos(state.data)
	}
	handleChange = address => {
    this.setState({ address });
  };

	handleSelect = address => {
		
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({currentLocation:latLng}))
			
      .catch(error => console.error('Error', error));
  };

	componentDidMount() {
		if (navigator && navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				const coords = pos.coords;
				this.setState({
					currentLocation: {
						lat: coords.latitude,
						lng: coords.longitude,
					},
				});
				

				// this.placesService = new window.google.maps.places.PlacesService(
				// 	document.createElement("div")
				// );
			});

			// this.map = new google.maps.Map(document.createElement("div"), {
			// 	center: { lat: -34.397, lng: 150.644 },
			// 	zoom: 8,
			// });
		} else {
			//TODO:
		}
	}

	setPin(lat, lng) {
		if (this.map) {
			this.map.setCenter({ lat: lat, lng: lng });

			if (this.marker) {
				this.marker.setMap(null);
				this.marker = null;
			}

			// this.marker = new google.maps.Marker({
			// 	position: { lat: lat, lng: lng },
			// 	map: this.map,
			// 	title: "Current Location",
			// });
		} else {
			console.log("Map has not loaded yet");
		}
	}

	findBars(lat, lng) {
		axios
			.get(
				`/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=10000&type=bar&key=${apiKey}`
			)
			.then((res) => {
				const data = res.data.results;
				this.setState({ data });
			});
	}

	// findPhotos(data){
	// 	console.log(data)
	// 	if (data.length > 0){
	// 	data.map(place => (

	// 	axios.get(`/maps/api/place/details/json?photo_reference=${place.photo_reference}&maxwidth=400&key=${apiKey}`)
	// 	.then((res) => {
	// 		const placeDetails = res.data.results;
	// 		console.log ("hello",placeDetails)
	// 		this.setState({ placeDetails: placeDetails });
	// 	})
	// 	))
	// }
	// }
	render() {
		// this.findPhotos(this.state.data)
		this.findBars(this.state.currentLocation.lat, this.state.currentLocation.lng);
		return (
			<div className="app">
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
				<PlacesAutocomplete
					value={this.state.address}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
					className="input-group"
				>
					{({
						getInputProps,
						suggestions,
						getSuggestionItemProps,
						loading,
					}) => (
						<div>
							<input
								{...getInputProps({
									placeholder: "Search Places ...",
									className: "location-search-input",
								})}
							/>
							<div className="autocomplete-dropdown-container">
								{loading && <div>Loading...</div>}
								{suggestions.map((suggestion) => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									// inline style for demonstration purpose
									const style = suggestion.active
										? { backgroundColor: "#fafafa", cursor: "pointer" }
										: { backgroundColor: "#6e2222", color: "#fff", cursor: "pointer" };
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
												style,
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>

				<div>
					{this.state.currentLocation.lat} / {this.state.currentLocation.lng}
				</div>

				<div className="container">
					<div className="row">
						{this.state.data.map((place, i) => (
							<div className="col-3 m-4 ml-5">
								<Card>
									<CardImg
										src="../images/img/nightLife.jpg"
										alt={place.name + " picture"}
									/>
									<CardBody>
										<CardTitle>{place.name}</CardTitle>
										<CardText>{"raiting: " + place.rating}</CardText>
										<CardText>
											{place.types[0]} {place.types[1]} {place.types[2]}
										</CardText>
									</CardBody>
								</Card>
							</div>
						))}
					</div>
				</div>

				{/* <div id="map"></div>
				<Map
					className="containerStyle"
					// mapContainerStyle={containerStyle}
					ref={this.mapRef}
					google={this.props.google}
					id="map"
					zoom={13}
					initialCenter={this.props.center}
				></Map> */}
			</div>
		);
	}
}

//  finds bars around serch results
// function Google(location) {
// 	let lat = location;
// 	let lng = location;
// 	console.log(location);
// 	var config = {
// 		method: "get",
// 		url: `/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=bar&key=${apiKey}`,
// 		headers: {},
// 	};

// 	axios(config)
// 		.then(function (response) {
// 			console.log(response.data.results);
// 			let info = JSON.stringify(response.data);
// 			response.data.results.map((place, i) => {
// 				return <Marker key={i} position={place.geometry.location} />;
// 			});
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 			return error;
// 		});
// 	return <div></div>;
// }

export default GoogleApiWrapper({
	apiKey: apiKey,
	libraries: ["places"],
})(CurrentLocation);
