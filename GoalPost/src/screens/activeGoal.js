import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import GoBackButton from "../components/goBackButton";
import StandardButton from "../components/standardButton";
import Leaderboard from "../components/leaderboard";

import { Cloud } from "../services/database";
import { facebookService } from '../services/FacebookService';
import { GoalManager } from '../services/goalManagement';

class ActiveGoal extends React.Component {
  static navigationOptions = {
    title: "ActiveGoal"
  };
  state = {
    userID: this.props.navigation.getParam("userID", ""),
    goalID: this.props.navigation.getParam("goalID", ""),
    goalName: "",
    userMap: {},
    eventIndex: -1,
    yesNoDisabled: false
  };

  registerYes = async () => {
    this.setState({ yesNoDisabled: true });
    await Cloud.checkInToEvent(
      this.state.userID,
      this.state.goalID,
      this.state.eventIndex,
      true
    );
  };

  registerNo = async () => {
    this.setState({ yesNoDisabled: true });
    await Cloud.checkInToEvent(
      this.state.userID,
      this.state.goalID,
      this.state.eventIndex,
      false
    );
  };

  async componentDidMount() {
    const goal = await Cloud.loadGoal(this.state.userID, this.state.goalID);
    var { eventIndex, disable } = GoalManager.getEventIndex(this.state.userID, goal.event_times, goal.user_logs);
    const users = GoalManager.getSortedUsers(goal.user_logs, goal.event_times, goal.penalty);
    const pot = GoalManager.getTotalPot(goal.user_logs, goal.event_times, goal.penalty);

    this.setState({
      eventIndex: eventIndex,
      yesNoDisabled: disable,
      userMap: users,
      goalName: goal.goal_name
    });
  }

  render() {
    return (
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} flex={0.1} />
        <View style={{ flex: 0.3, alignSelf: "stretch" }}>
          <Text style={baseStyles.text}>Current GoalPost:</Text>
          <Text style={baseStyles.heading}>{this.state.goalName}</Text>
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
              color
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
        <Leaderboard users={this.state.userMap} flex={0.65} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
export default ActiveGoal;
