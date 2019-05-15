import React from "react";
import {
  Button,
  View,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Picker,
  Alert
} from "react-native";
import { Input, CheckBox } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import baseStyles from "../../styles/baseStyles";

// import custom functions
import Cloud from "../components/database";
import NotificationManager from "../components/notifications";

// import custom components
import RepeatCheckBox from "../components/repeatCheckBox";
import InputRow from "../components/inputRow";
import update from "immutability-helper";

class CreateGoal extends React.Component {
  static navigationOptions = {
    title: "CreateGoal"
  };
  state = {
    userID: this.props.navigation.getParam("userID", "ERROR UNDEFINED USERID"),
    goalID: "undefined default goalID",
    isDateTimePicker1Visible: false,
    isDateTimePicker2Visible: false,
    enablePushNotifs: true,
    goalName: null,
    startDate: null,
    endDate: null,
    recurArray: [
      { title: "S", checked: false },
      { title: "M", checked: false },
      { title: "T", checked: false },
      { title: "W", checked: false },
      { title: "Th", checked: false },
      { title: "F", checked: false },
      { title: "S", checked: false }
    ]
  };

  updateGoalName = e => {
    this.setState({ goalName: e.nativeEvent.text });
  };

  showDateTimePicker1 = () => {
    this.setState({ isDateTimePicker1Visible: true });
  };
  hideDateTimePicker1 = () => {
    this.setState({ isDateTimePicker1Visible: false });
  };
  showDateTimePicker2 = () => {
    this.setState({ isDateTimePicker2Visible: true });
  };
  hideDateTimePicker2 = () => {
    this.setState({ isDateTimePicker2Visible: false });
  };
  handleStartDatePicked = startDate => {
    this.setState({ startDate: startDate.toLocaleDateString() });
    this.hideDateTimePicker1();
  };
  handleEndDatePicked = endDate => {
    this.setState({ endDate: endDate.toLocaleDateString() });
    this.hideDateTimePicker2();
  };

  togglePushNotifs = bool => {
    this.setState({ enablePushNotifs: bool });
  };
  createNewGoal = async () => {
    // retrieves weekday array of type [0, 1, 5, ...] from state
    var weekdays = this.state.recurArray
      .map((item, i) => ({
        checked: item.checked,
        index: i
      }))
      .filter(item => item.checked)
      .map(item => item.index);

    var taskTimes = NotificationManager.scheduleNotifications(
      this.state.startDate,
      this.state.endDate,
      weekdays
    );

    // USE AS: Cloud.addGoal(userID, goalName, friends, taskTimes, penalty);
    var goalID = await Cloud.addGoal(
      this.state.userID,
      this.state.goalName,
      ["cherry", "davy"],
      taskTimes,
      5
    );
    Alert.alert("created goal with ID: ", goalID);
  };

  render() {
    return (
      <View style={baseStyles.screen}>
        <InputRow header="Goal Name">
          <Input placeholder="Gym Buddies" onChange={this.updateGoalName} />
        </InputRow>

        <InputRow header="Start Date">
          <Input
            value={this.state.startDate}
            onFocus={this.showDateTimePicker1}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePicker1Visible}
            onConfirm={this.handleStartDatePicked}
            onCancel={this.hideDateTimePicker1}
          />
        </InputRow>

        <InputRow header="End Date">
          <Input
            value={this.state.endDate}
            onFocus={this.showDateTimePicker2}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePicker2Visible}
            onConfirm={this.handleEndDatePicked}
            onCancel={this.hideDateTimePicker2}
          />
        </InputRow>

        <InputRow header="Repeat Every">
          {this.state.recurArray.map((item, i) => (
            <RepeatCheckBox
              title={item.title}
              checked={item.checked}
              onIconPress={() => {
                this.setState({
                  recurArray: update(this.state.recurArray, {
                    [i]: { checked: { $set: !item.checked } }
                  })
                });
              }}
            />
          ))}
        </InputRow>

        <InputRow header="Cost/miss">
          <Input placeholder="$5.00" />
        </InputRow>

        <InputRow header="Members">
          <Input placeholder="Choose from FB" />
        </InputRow>

        <InputRow header="Push notifs?">
          <Switch
            onValueChange={this.togglePushNotifs}
            value={this.state.enablePushNotifs}
          />
        </InputRow>

        <Button title="Create New Goal" onPress={this.createNewGoal} />
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  inputHeaderContainer: {
    flex: 0.18
  },
  inputHeader: {
    color: "#484848",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 21
  },
  inputTakerContainer: {
    flex: 0.82,
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
export default CreateGoal;
