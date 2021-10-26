import React, {Component} from "react";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from "./FooterComponent";

class Main extends Component {

  render() {

    return(
      <div>
        <Header />
        <Footer />
      </div>
    )
  }
}

export default Main;