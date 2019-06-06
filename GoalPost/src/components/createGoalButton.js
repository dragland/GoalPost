import React, { Component } from "react";
import { Button, Icon } from "react-native-elements";

export default class CreateGoalButton extends Component {
  render() {
    return (
      <Button
        containerStyle={{
          flex: 0.2,
          flexDirection: "row",
          justifyContent: "center",
          margin: 10
        }}
        type="clear"
        buttonStyle={{
          backgroundColor: "#4DD796",
          borderRadius: 80,
          shadowColor: "#000",
          shadowOffset: { height: 15, width: 0 },
          shadowOpacity: 1.0,
          shadowRadius: 20,
          elevation: 10
        }}
        icon=<Icon
          name="plus"
          type="material-community"
          color="#444"
          size={40}
        />
        onPress={() =>
          this.props.navigation.navigate("CreateGoal", {
            userID: this.props.userID
          })
        }
      />
    );
  }
}