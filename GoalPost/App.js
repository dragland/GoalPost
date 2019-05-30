import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Routes from "./routes";
import FBSDK from "react-native-fbsdk";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
//const App = () => <Routes/>
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
    /*
    const Navigator = makeRootNavigator(this.state.accessToken);
    const AppContainer = createAppContainer(Navigator);
    return <AppContainer />;
    */
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
