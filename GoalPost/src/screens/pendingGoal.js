/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
  Davy Ragland | dragland@stanford.edu
  Jesus Cervantes | cerjesus@stanford.edu
*/

import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';
import baseStyles from "../../styles/baseStyles";
import GoBackButton from "../components/goBackButton";
import CenterImage from "../components/centerImage";
import StandardButton from "../components/standardButton";
import LetterRow from "../components/letterRow";

import { Cloud } from "../services/database";
import { facebookService } from '../services/FacebookService';
import { GoalManager } from '../services/goalManagement';
import { NotificationManager } from "../services/notifications";

class PendingGoal extends React.Component {
  static navigationOptions = {
    title: "PendingGoal"
  };
  
  state = {
    userID: "",
    goalID: "",
    goalName: "",
    startDate: "",
    endDate: "",
    members: [],
    penalty: 0,
    userMap: {},
    spinner: true
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const userID = navigation.getParam("userID", "");
    const goalID = navigation.getParam("goalID", "");

    const goal = await Cloud.loadGoal(userID, goalID);
    const checkinMap = goal.user_logs; // map of userID to array of states (-1 = unfilled, 0 = failed, 1 = checked in) in the format {'userID': [bools]]}
    const members = Object.keys(checkinMap);

    const event_times = goal.event_times;
    const startDate = event_times[0].toDate().toDateString();
    const endDate = event_times[event_times.length - 1].toDate().toDateString();

    const users = await Cloud.loadUsersMap(this.state.userID);

    this.setState({
      userID: userID,
      goalID: goalID,
      goalName: goal.goal_name,
      startDate: startDate,
      endDate: endDate,
      members: members,
      penalty: goal.penalty.toFixed(2),
      userMap: users,
      spinner: false
    });
  }

  acceptGoal = async () => {
    await Cloud.acceptPendingGoal(this.state.userID, this.state.goalID);
    NotificationManager.scheduleNotifications(
      this.state.userID,
      this.state.userMap[this.state.userID].user_name,
      this.state.goalID
    );
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  };

  rejectGoal = async () => {
    await Cloud.rejectPendingGoal(this.state.userID, this.state.goalID);
    this.props.navigation.state.params.refresh();
    this.props.navigation.goBack();
  };

  render() {
    if (this.state.spinner) {
      return (
        <View style={styles.screen}>
          <Spinner visible textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        </View>
      );
    }
    return (
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} />
        <View style={styles.letterContainer}>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.letterHeader}>RSVP!</Text>
          </View>

          <LetterRow header="what">
            <Text style={styles.letterA}>
              You've been invited to join the Goal{" "}
              <Text style={styles.highlight}>{this.state.goalName}</Text>
            </Text>
          </LetterRow>
          <LetterRow header="when">
            <Text style={styles.letterA}>
              Every M, W, F beginning{" "}
              <Text style={styles.highlight}>{this.state.startDate}</Text> until{" "}
              <Text style={styles.highlight}>{this.state.endDate}</Text>
            </Text>
          </LetterRow>
          <LetterRow header="who">
            <Text style={styles.letterA}>{GoalManager.getFriendsText(this.state.members, this.state.userID, this.state.userMap)}</Text>
          </LetterRow>
        </View>
        <View
          style={{
            flex: 0.3,
            paddingTop: 10,
            paddingBottom: 40,
            paddingHorizontal: 30
          }}
        >
          <Text style={baseStyles.text}>
            Joining a Goal means commitment! By accepting, you pledge to pay{" "}
            <Text style={[styles.highlight, { fontWeight: "bold" }]}>
              ${this.state.penalty}
            </Text>{" "}
            for every task you miss.
          </Text>

          <View
            style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
          >
            <StandardButton
              title="Accept"
              containerStyle={styles.buttonContainer}
              onPress={this.acceptGoal}
              color
            />
            <StandardButton
              title="Reject"
              containerStyle={styles.buttonContainer}
              onPress={this.rejectGoal}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  letterContainer: {
    flex: 0.6,
    alignSelf: "stretch",
    borderWidth: 2,
    borderColor: "#DDD",
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 50,
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  letterHeader: {
    textAlign: "center",
    color: "#BBB",
    fontSize: 40,
    fontStyle: "italic",
    letterSpacing: 5,
    textTransform: "uppercase"
  },
  letterA: {
    fontSize: 15,
    lineHeight: 17
  },
  highlight: {
    color: "#4DD796"
  },
  buttonContainer: {
    alignSelf: "center",
    width: 120,
    marginTop: 20,
    marginHorizontal: 15
  }
});

export default PendingGoal;