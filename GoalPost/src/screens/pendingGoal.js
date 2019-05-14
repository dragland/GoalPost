import React from "react";
import { Button, View, Text } from "react-native";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";

class PendingGoal extends React.Component {
  static navigationOptions = {
    title: "PendingGoal"
  };
  state = {
    userID: this.props.navigation.getParam("userID", "ERROR UNDEFINED USERID"),
    goalID: this.props.navigation.getParam("goalID", "ERROR UNDEFINED GOALID")
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
        <Text style={baseStyles.text}>You are invited to join <Text style={{ fontWeight: "bold" }}>{this.state.goalID}</Text></Text>
        <Button
          title="accept goal"
          onPress={() => {
            Cloud.acceptPendingGoal(this.state.userID, this.state.goalID);
            this.props.navigation.goBack();
          }}
        />
        <Button
          title="reject goal"
          onPress={() => {
            Cloud.rejectPendingGoal(this.state.userID, this.state.goalID);
            this.props.navigation.goBack();
          }}
        />
        <Button
          title="go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
export default PendingGoal;