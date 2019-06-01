import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import GoBackButton from "../components/goBackButton";
import StandardButton from "../components/standardButton";
import Leaderboard from "../components/leaderboard";

import { Cloud } from "../services/database";
import { facebookService } from '../services/FacebookService';

class ActiveGoal extends React.Component {
  static navigationOptions = {
    title: "ActiveGoal"
  };
  state = {
    userID: this.props.navigation.getParam("userID", "ERROR UNDEFINED USERID"),
    goalID: this.props.navigation.getParam("goalID", "ERROR UNDEFINED GOALID"),
    eventIndex: -1,
    yesNoDisabled: false
  };

  getEventIndex = async () => {
    const goal = await Cloud.loadGoal(this.state.userID, this.state.goalID);
    const event_times = goal.event_times;

    var eventIndex = -1;
    const today = new Date();
    for (var i = 0; i < event_times.length; i++) {
      const date = event_times[i].toDate(); // time at which event opens for check in
      var midnight = new Date(date.getTime());
      midnight.setHours(23);
      midnight.setMinutes(59);
      midnight.setSeconds(59);
      midnight.setMilliseconds(999);

      if (today >= date && today <= midnight) {
        eventIndex = i;
        break; // found proper date
      }
    }

    const user_logs = goal.user_logs[this.state.userID];
    const disable = eventIndex == -1 || user_logs[eventIndex] > -1;
    return { eventIndex: eventIndex, disable: disable };
  };

  registerYes = async () => {
    this.setState({ yesNoDisabled: true });
    await Cloud.checkInToEvent(
      this.state.userID,
      this.state.goalID,
      this.state.eventIndex,
      true
    );
    Alert.alert("Keep up the good work!");
  };

  registerNo = async () => {
    this.setState({ yesNoDisabled: true });
    await Cloud.checkInToEvent(
      this.state.userID,
      this.state.goalID,
      this.state.eventIndex,
      false
    );
    Alert.alert("You have chosen...poorly.");
  };

  async componentDidMount() {
    var { eventIndex, disable } = await this.getEventIndex();
    this.setState({ eventIndex: eventIndex, yesNoDisabled: disable });
  }

  render() {
    return (
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} />
        <View style={{ flex: 0.35, alignSelf: "stretch" }}>
          <Text style={baseStyles.text}>Current GoalPost:</Text>
          <Text style={baseStyles.heading}>{this.state.goalID}</Text>
          <Text style={baseStyles.text}>Did you complete today's goal?</Text>

          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <StandardButton
              title="Yes"
              containerStyle={{
                alignSelf: "center",
                width: 100,
                marginTop: 20,
                marginHorizontal: 15
              }}
              onPress={this.registerYes}
              disabled={this.state.yesNoDisabled}
              orange
            />
            <StandardButton
              title="No"
              containerStyle={{
                alignSelf: "center",
                width: 100,
                marginTop: 20,
                marginHorizontal: 15
              }}
              onPress={this.registerNo}
              disabled={this.state.yesNoDisabled}
            />
          </View>
        </View>
        <Leaderboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
export default ActiveGoal;
