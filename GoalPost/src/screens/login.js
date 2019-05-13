import React from "react";
import { Button, View, Text } from "react-native";
import Cloud from "../components/database";

class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  state = {
    userID: "undefined default userID"
  };

  render() {
    // Cloud.test();
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          title="login"
          onPress={() => this.props.navigation.navigate("Home", {userID: this.state.userID})}
        />
      </View>
    );
  }
}
export default Login;