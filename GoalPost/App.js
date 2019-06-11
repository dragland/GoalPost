/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cam Thouati | cameron8@stanford.edu
  Cherry Zou | cherryz@stanford.edu
*/

import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import FBSDK from "react-native-fbsdk";

import Routes from "./routes";
import Login from "./src/screens/login";
import Home from "./src/screens/home";

const { AccessToken } = FBSDK;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
    };
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken()
      .then(data => {
        this.setState({
          accessToken: data.accessToken
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <Routes/>;
  }
}

const makeRootNavigator = isLoggedIn => {
  return createSwitchNavigator(
    {
      Login: {
        screen: Login
      },
      Home: {
        screen: Home
      }
    },
    {
      initialRouteName: "Login"
    }
  );
};