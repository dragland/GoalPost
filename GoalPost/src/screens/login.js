import React from "react";
import { View, Text, StatusBar } from "react-native";
import { Button, Input } from "react-native-elements";
import Cloud from "../components/database";
import StandardButton from "../components/standardButton";

class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };
  state = {
    userID: "undefined default userID"
  };

  selectUser = e => {
    this.setState({ userID: e.nativeEvent.text });
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
        <StatusBar barStyle="dark-content" />
        <Input placeholder="Enter user ID here" onChange={this.selectUser} />
        <StandardButton
          title="login"
          containerStyle={{ alignSelf: "center", marginTop: 20 }}
          onPress={() => {
            this.props.navigation.navigate("Home", {userID: this.state.userID});
          }}
          orange
        />
      </View>
    );
  }
}
export default Login;
