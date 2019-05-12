import React from "react";
import { Button, View, Text } from "react-native";
import Cloud from "../components/database";

class PendingGoal extends React.Component {
  static navigationOptions = {
    title: "PendingGoal"
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          title="go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
export default PendingGoal;