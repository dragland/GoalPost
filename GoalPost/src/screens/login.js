import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from "react-native-fbsdk";
import { NavigationEvents } from "react-navigation";

import { Cloud } from "../services/database";
import { facebookService } from "../services/FacebookService";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    loggedIn: false
  };

  startTimer = () => {
    this.interval = setInterval(this.login, 100);
  }

  callNav = (profile) => {
    clearInterval(this.interval);
    this.props.navigation.navigate("Home", { userID: profile.id });
  }

  login = async () => {
    const token = await AccessToken.getCurrentAccessToken();
    if (token) {
      const infoRequest = new GraphRequest('/me', null, async (error, result) => {
        if (error) {
          alert(error);
        } else {
          const r = await Cloud.loginUser(result.id, result.name, "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/upside-down-face_1f643.png");
          this.callNav(result);
        }
      });
      new GraphRequestManager().addRequest(infoRequest).start();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.startTimer} />
        <LoginButton readPermissions={["public_profile"]} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});