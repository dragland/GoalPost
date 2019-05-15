import React from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Cloud from "../components/database";

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
        <Input placeholder="Enter user ID here" onChange={this.selectUser} />
        <Button
          title="login"
          onPress={() => {
            this.props.navigation.navigate("Home", {userID: this.state.userID});
          }}
        />
      </View>
    );
  }
}
export default Login;
