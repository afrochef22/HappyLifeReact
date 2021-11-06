/* global google */
import React, { Component, useState, useEffect } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";


const apiKey = process.env.REACT_APP_MY_API_KEY;



// function Google(location) {
	
// let lat = location
// let lng = location
// console.log(location)
//   var config = {
//     method: "get",
//     url: `/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=bar&key=${apiKey}`,
//     headers: {},
//   };

// 	axios(config)
// 		.then(function (response) {
// 			console.log(response.data.results);
//       let info = JSON.stringify(response.data)
// 			response.data.results.map((place, i) => {
// 				return <Marker key={i} position={place.geometry.location} />;
// 			})
// 		})
// 		.catch(function (error) {
// 			console.log(error);
//       return(error)
// 		});
//   return(
//     <div>
// 		</div>
//   )
// }



// --------------------------
class LocationSearchInput extends Component {
	constructor(props) {
		super(props);
		this.state = { 
      address: "" ,
      places: [],
      searchField: ""
    };

		
		
    this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

 

	handleChange = (address) => {
		this.setState({ address });
	};

	handleSelect = (address, placeId) => {
		this.setState({ address });

		const request = {
			placeId: placeId,
			fields: [
				"name",
				"geometry",
				"address_component",
				"photos",
				"rating",
				"reviews",
			],
		};
		this.placesService.getDetails(request, (place, status) => {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				this.props.onPlaceChanged(place);
        console.log(place)
				const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng()
				console.log(lat,lng)
			}
		});
	};

	render() {
		return (
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange}
				onSelect={this.handleSelect}
        // searchPlace={searchPlace()}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className="autocomplete-container">
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
									: {
											backgroundColor: "#6e2222",
											color: "#fff",
											cursor: "pointer",
									  };

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
		);
	}
}

const containerStyle = {
	position: "relative",
	width: "50%",
	height: "50%",
};

class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { places: [] };
		this.showPlace = this.showPlace.bind(this);
		this.mapRef = React.createRef();
	}

	showPlace(place) {
		this.setState((prevState) => ({
			places: [...prevState.places, place],
		}));
		this.mapRef.current.map.setCenter(place.geometry.location);
	}

	render() {
		return (
			<div>
				{/* <Google /> */}
				<LocationSearchInput
					onPlaceChanged={this.showPlace}
				></LocationSearchInput>
{/* 
				<Map
					className="containerStyle"
					mapContainerStyle={containerStyle}
					ref={this.mapRef}
					google={this.props.google}
					className={"map"}
					zoom={13}
					initialCenter={this.props.center}
				>
				<Google location={this.state.places} />

         <Google location={this.state.places.map((place, i) => {
					 console.log("hello")
					 console.log(place.geometry.location.lat())
						return <div position={place.geometry.location} />;
					})}/>
				</Map>
       */}
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: apiKey,
	libraries: ["places"],
})(MapContainer);
