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
import GoBackButton from "../components/goBackButton";
import StandardButton from "../components/standardButton";
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
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} />
        <View
          style={{
            flex: 0.7,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: 30
          }}
        >
          <InputRow header="Goal Name">
            <Input
              placeholder="GYM BUDDIES"
              inputStyle={styles.inputText}
              onChange={this.updateGoalName}
            />
          </InputRow>

          <InputRow header="Start Date">
            <Input
              value={this.state.startDate}
              inputStyle={styles.inputText}
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
              inputStyle={styles.inputText}
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
            <Input
              placeholder="5.00 (USD)"
              keyboardType="numeric"
              inputStyle={styles.inputText}
            />
          </InputRow>

          <InputRow header="Members">
            <Input placeholder="CHOOSE FROM FB" inputStyle={styles.inputText} />
          </InputRow>

          <InputRow header="Push notifs?">
            <Switch
              onValueChange={this.togglePushNotifs}
              value={this.state.enablePushNotifs}
              thumbColor="#E97C44"
              trackColor={{ false: null, true: "#f2b190" }}
            />
          </InputRow>
        </View>

        <View style={{ flex: 0.2, paddingHorizontal: 30, alignSelf: "center" }}>
          <StandardButton
            title="Create New Goal"
            containerStyle={{ alignSelf: "center", marginTop: 20 }}
            onPress={this.createNewGoal}
            orange
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputText: {
    fontSize: 16
  }
});
export default CreateGoal;
