import React from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Avatar, Button } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";

class ActiveGoal extends React.Component {
  static navigationOptions = {
    title: "ActiveGoal"
  };
  state = {
    userID: this.props.navigation.getParam("userID", "ERROR UNDEFINED USERID"),
    goalID: this.props.navigation.getParam("goalID", "ERROR UNDEFINED GOALID"),
    yesNoDisabled: false
  };

  registerYes = () => {
    this.setState({ yesNoDisabled: true });
    Alert.alert('Keep up the good work!');
  };

  registerNo = () => {
    this.setState({ yesNoDisabled: true });
    Alert.alert('You have chosen...poorly.');
  };

  render() {
    return (
      <View style={baseStyles.screen}>
        <Text style={baseStyles.text}>Current GoalPost:</Text>
        <Text style={baseStyles.heading}>{this.state.goalID}</Text>
        <Text style={baseStyles.text}>Did you complete today's goal?</Text>

        <View style={{ flexDirection: "row" }}>
          <Button
            buttonStyle={styles.button}
            title="Yes"
            type="outline"
            onPress={this.registerYes}
            disabled={this.state.yesNoDisabled}
          />

          <Button
            buttonStyle={styles.button}
            title="No"
            type="outline"
            onPress={this.registerNo}
            disabled={this.state.yesNoDisabled}
          />
        </View>

        <Text style={baseStyles.heading2}>Current Leaderboard:</Text>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#1</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../images/davy.jpg")}
          />
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
        </View>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#2</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../images/cherry.jpg")}
          />
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
        </View>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#3</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../images/jesus.jpg")}
          />
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
        </View>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#4</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../images/cam.jpg")}
          />
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
          <View style={styles.progressBox}></View>
        </View>

        <View style={{ flexDirection: "row" }}>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.goBack()}
        />
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
    alignSelf: "flex-start",
    margin: 5
  },
  button: {
    width: 100,
    margin: 10
  },
  progressBox: {
    backgroundColor: "#67E9AA",
    width: 20,
    height: 20,
    margin: 5,
    marginTop: 12
  },
});
export default ActiveGoal;