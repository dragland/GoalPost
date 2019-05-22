import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Avatar, Button } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";
import GoBackButton from "../components/goBackButton";
import StandardButton from "../components/standardButton";

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

        <View
          style={{
            flex: 0.55,
            alignSelf: "stretch",
            justifyContent: "flex-end",
            marginTop: 40,
            marginBottom: 40,
            marginHorizontal: 15
          }}
        >
          <Text style={baseStyles.text}>
            <Text style={{ fontWeight: "bold" }}>CURRENT LEADERBOARD</Text>
          </Text>
          <View style={styles.boardEntry}>
            <Text style={baseStyles.heading2}>#1</Text>
            <Avatar
              size="medium"
              rounded
              source={require("../../images/davy.jpg")}
            />
            <View style={styles.progressBox1} />
            <Text style={baseStyles.text}>+$15.00</Text>
          </View>
          <View style={styles.boardEntry}>
            <Text style={baseStyles.heading2}>#2</Text>
            <Avatar
              size="medium"
              rounded
              source={require("../../images/cam.jpg")}
            />
            <View style={styles.progressBox2} />
            <Text style={baseStyles.text}>-$5.00</Text>
          </View>
          <View style={styles.boardEntry}>
            <Text style={baseStyles.heading2}>#3</Text>
            <Avatar
              size="medium"
              rounded
              source={require("../../images/jesus.jpg")}
            />
            <View style={styles.progressBox2} />
            <Text style={baseStyles.text}>-$5.00</Text>
          </View>
          <View style={styles.boardEntry}>
            <Text style={baseStyles.heading2}>#4</Text>
            <Avatar
              size="medium"
              rounded
              source={require("../../images/cherry.jpg")}
            />
            <View style={styles.progressBox3} />
            <Text style={baseStyles.text}>-$15.00</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boardEntry: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 5
  },
  progressBox1: {
    backgroundColor: "#E97C44",
    width: 160,
    height: 15,
    margin: 5,
    marginRight: 15
  },
  progressBox2: {
    backgroundColor: "#E97C44",
    width: 120,
    height: 15,
    margin: 5,
    marginRight: 15
  },
  progressBox3: {
    backgroundColor: "#E97C44",
    width: 80,
    height: 15,
    margin: 5,
    marginRight: 15
  }
});
export default ActiveGoal;
