import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert } from "react-native";
import Routes from "./routes";
import FBSDK from "react-native-fbsdk";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import PushNotificationAndroid from 'react-native-push-notification'

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
  
// Jesus work, Cherry don't delit pls
//   componentWillMount() {
//     (function() {
//       // Register all the valid actions for notifications here and add the action handler for each action
//       PushNotificationAndroid.registerNotificationActions(['Yes','No']);
//       DeviceEventEmitter.addListener('notificationActionReceived', function(action){
//         Alert.alert('Notification action received: ' + action);
//         const info = JSON.parse(action.dataJSON);
//         if (info.action == 'Accept') {
//           // Do work pertaining to Accept action here
//         } else if (info.action == 'Reject') {
//           // Do work pertaining to Reject action here
//         }
//         // Add all the required actions handlers
//       });
//     })(); 
//   }

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
