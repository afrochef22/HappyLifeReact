import React, {Component} from "react";
import Header from "./HeaderComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends Component {

  render() {

    return(
      <div>
        <Header />
      </div>
    )
  }
}

export default Main;