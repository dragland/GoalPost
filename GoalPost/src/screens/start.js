import React from "react";
import { Button, View, Text } from "react-native";
import Cloud from "../components/database";

class Start extends React.Component {
  static navigationOptions = {
    title: "Start"
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
          title="Go to Create Goal screen"
          onPress={() => this.props.navigation.navigate("CreateGoal")}
        />
      </View>
    );
  }
}
export default Start;
