import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Cloud from "../components/database";
import { facebookService } from "../services/FacebookService";
import { AccessToken } from "react-native-fbsdk";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    accessToken: null
  };

  async componentDidMount() {
    AccessToken.getCurrentAccessToken().then(data => {
      if (data) {
        this.setState({ accessToken: data.accessToken });
      }
    });
  }

  render() {
    if (this.state.accessToken != null) {
      this.login();
    }
    return (
      <View style={styles.container}>
        {facebookService.makeLoginButton(accessToken => {
          this.login();
        })}
      </View>
    );
  }

  async login() {
    const profile = await facebookService.fetchProfile();
    const login = await Cloud.loginUser(
      profile.id,
      profile.name,
      profile.avatar
    );
    this.props.navigation.navigate("Home", { userID: profile.id });
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
