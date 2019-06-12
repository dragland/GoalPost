/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
  Davy Ragland | dragland@stanford.edu
*/

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import baseStyles from "../../styles/baseStyles";

import StandardButton from "../components/standardButton";
import GoBackButton from "../components/goBackButton";
import Leaderboard from "../components/leaderboard";

import { Cloud } from "../services/database";
import { facebookService } from "../services/FacebookService";
import { GoalManager } from "../services/goalManagement";

class ActiveGoal extends React.Component {
  static navigationOptions = {
    title: "ActiveGoal"
  };

  state = {
    userID: this.props.navigation.getParam("userID", ""),
    goalID: this.props.navigation.getParam("goalID", ""),
    goalName: "",
    userMap: {},
    userLogs: [],
    pot: 0,
    eventIndex: -1,
    nextEventTime: null,
    yesNoDisabled: true,
    spinner: true
  };

  registerYes = async () => {
    this.setState({ yesNoDisabled: true });
    await Cloud.checkInToEvent(
      this.state.userID,
      this.state.goalID,
      this.state.eventIndex,
      true
    );
    await this.queryGoal();
  };

  registerNo = async () => {
    this.setState({ yesNoDisabled: true });
    await Cloud.checkInToEvent(
      this.state.userID,
      this.state.goalID,
      this.state.eventIndex,
      false
    );
    await this.queryGoal();
  };

  topContent = () => {
    if (this.state.yesNoDisabled && this.state.nextEventTime) {
      if (this.state.nextEventTime.getTime() == new Date(0).getTime()) {
        return (
          <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
            <Text style={baseStyles.text}>
              You've completed all the tasks for this goal! Wait for all your
              teammates to check in.
            </Text>
          </View>
        );
      }
      return (
        <View style={{ flex: 1 }}>
          <Text style={baseStyles.text}>Your next goal will be on:</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20
            }}
          >
            <Text style={{ fontSize: 30 }}>
              {this.state.nextEventTime.toDateString()}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
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
    );
  };

  queryGoal = async () => {
    const goal = await Cloud.loadGoal(this.state.userID, this.state.goalID);
    var { eventIndex, disable } = GoalManager.getEventIndex(
      this.state.userID,
      goal.event_times,
      goal.user_logs
    );
    const users = await Cloud.loadUsersMap(this.state.userID);
    const logs = GoalManager.getSortedUsers(
      goal.user_logs,
      goal.event_times,
      goal.penalty
    );
    const pot = GoalManager.getTotalPot(
      goal.user_logs,
      goal.event_times,
      goal.penalty
    );

    nextEventTime = null;
    if (disable) {
      nextEventTime = GoalManager.getNextDate(
        this.state.userID,
        goal.event_times,
        goal.user_logs
      );
    }

    this.setState({
      eventIndex: eventIndex,
      nextEventTime: nextEventTime,
      yesNoDisabled: disable,
      userMap: users,
      userLogs: logs,
      pot: pot,
      goalName: goal.goal_name,
      spinner: false
    });
  };

  async componentDidMount() {
    await this.queryGoal();
  }

  render() {
    if (this.state.spinner) {
      return (
        <View style={styles.screen}>
          <Spinner
            visible
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      );
    }
    return (
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} flex={0.1} />
        <View style={{ flex: 0.3, alignSelf: "stretch" }}>
          <Text style={baseStyles.text}>Current GoalPost:</Text>
          <Text style={baseStyles.heading}>{this.state.goalName}</Text>
          {this.topContent()}
        </View>
        <Leaderboard
          users={this.state.userMap}
          logs={this.state.userLogs}
          pot={this.state.pot}
          flex={0.65}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default ActiveGoal;
