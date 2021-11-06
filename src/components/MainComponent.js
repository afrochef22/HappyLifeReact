import React, {Component} from "react";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from "./FooterComponent";
import Map from "./LocationSearchComponent"
import {Home} from "./HomeComponent"
import Search from './LocationSearchComponent'
import CurrentLocation from "./CurrentLocationComponent";

class Main extends Component {

  render() {

    return(
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    )
  }
}

export default Main;