import React from "react";
import { Button, View, Text } from "react-native";
import Cloud from "../components/database";

class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  render() {
    Cloud.test();
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
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}
export default Login;