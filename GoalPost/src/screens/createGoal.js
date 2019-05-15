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
import Cloud from "../components/database";
import RNCalendarEvents from "react-native-calendar-events";
import NotificationManager from "../components/notifications";
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
    isRepeatUnitPickerVisible: false,
    enablePushNotifs: true,
    goalName: null,
    startDate: null,
    endDate: null,
    recurRule: null, // do we need this?
    recurFreq: 0, // do we need this?
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
  showRepeatUnitPicker = () => {
    this.setState({ isRepeatUnitPickerVisible: true });
  };
  hideRepeatUnitPicker = () => {
    this.setState({ isRepeatUnitPickerVisible: false });
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

  repeatUnitChosen = timeUnit => {
    this.setState({ recurRule: timeUnit });
  };
  repeatFreqChosen = freq => {
    this.setState({ recurFreq: parseInt(freq, 10) });
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

        <Button
          title="Create New Goal"
          onPress={async () => {
            let event = new Date();
            let start = new Date(event.getTime() - 10 * 24 * 60 * 60 * 1000);
            let end = new Date(event.getTime() + 10 * 24 * 60 * 60 * 1000);
            let goalID = await Cloud.addGoal(
              "test",
              "new invited goal from test",
              ["cherry", "davy"],
              [start, event, end],
              5
            );
            Alert.alert("created goal with ID: ", goalID);
          }}
        />
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
