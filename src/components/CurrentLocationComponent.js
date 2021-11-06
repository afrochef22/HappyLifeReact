// import React, { Component, useState, useEffect } from "react";
// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import PlacesAutocomplete from "react-places-autocomplete";
// import axios from "axios";

// class CurrentLocation extends Component {
  
//   constructor(props) {
//     super(props);
    
//     this.map = null;
//     this.marker = null;
    
//     this.state = {
//       currentLocation: {
//         lat: 0.0,
//         lng: 0.0
//       }
//     };
//   }
  
//   componentDidMount() {
//     if (navigator && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(pos => {
//         const coords = pos.coords;
//         this.setState({
//           currentLocation: {
//             lat: coords.latitude,
//             lng: coords.longitude
//           }
//         });
//         this.setPin(coords.latitude, coords.longitude)
//         this.placesService = new window.google.maps.places.PlacesService(
//           document.createElement("div")
//         );
        
//       });
      
      
//       this.map = new google.maps.Map(document.createElement("div"), {
//           center: {lat: -34.397, lng: 150.644},
//           zoom: 8
//         });
//     }else{
//       //TODO:
//     }
//   }
  
//   setPin(lat, lng) {
//     if(this.map) {
//       this.map.setCenter({lat: lat, lng: lng});
      
//       if(this.marker) {
//         this.marker.setMap(null);
//         this.marker = null;
//       }
      
//       this.marker = new google.maps.Marker({
//         position: {lat: lat, lng: lng},
//         map: this.map,
//         title: 'Current Location'
//       });
      
//     }else{
//       console.log("Map has not loaded yet")
//     }
//   }
  
//   render() {
//     return (
//       <div class="app">
//         {this.state.currentLocation.lat } / {this.state.currentLocation.lng}
//         <div id="map"></div>
//       </div>
//     );
//   }
// }

// export default CurrentLocation;