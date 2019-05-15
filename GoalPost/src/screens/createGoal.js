import React from "react";
import { Button, View, StyleSheet, Switch, Text, TextInput, Picker, Alert} from "react-native";
import { Input, CheckBox } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";
import RNCalendarEvents from 'react-native-calendar-events';
import NotificationManager from "../components/notifications"

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
    recurRule: null,
    recurFreq: 0
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
    this.setState({recurRule: timeUnit})
  };
  repeatFreqChosen = freq => {
    this.setState({recurFreq: parseInt(freq,10)})
  };

  render() {
    return (
      <View style={baseStyles.screen}>
        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>Goal Name</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Input placeholder="Gym Buddies" onChange={this.updateGoalName} />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>Start Date</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Input value={this.state.startDate} onFocus={this.showDateTimePicker1} />
            <DateTimePicker
              isVisible={this.state.isDateTimePicker1Visible}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDateTimePicker1}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>End Date</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Input value={this.state.endDate} onFocus={this.showDateTimePicker2} />
            <DateTimePicker
              isVisible={this.state.isDateTimePicker2Visible}
              onConfirm={this.handleEndDatePicked}
              onCancel={this.hideDateTimePicker2}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>Repeat Every</Text>
          </View>
        </View>
        <View style={styles.inputRow}>
          <CheckBox title='S' style={styles.dayCheckBox} checked={this.state.checked} />
          <CheckBox title='M' style={styles.dayCheckBox} checked={this.state.checked} />
          <CheckBox title='T' style={styles.dayCheckBox} checked={this.state.checked} />
          <CheckBox title='W' style={styles.dayCheckBox} checked={this.state.checked} />
          <CheckBox title='Th' style={styles.dayCheckBox} checked={this.state.checked} />
          <CheckBox title='F' style={styles.dayCheckBox} checked={this.state.checked} />
          <CheckBox title='S' style={styles.dayCheckBox} checked={this.state.checked} />
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>Cost/miss</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Input placeholder="$5.00" />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>Members</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Input placeholder="Choose from FB" />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>Push notifications?</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Switch
              onValueChange={this.togglePushNotifs}
              value={this.state.enablePushNotifs}
            />
          </View>
        </View>

        <Button
          title="Create New Goal"
          onPress={ async () => {
            let event = new Date();
            let start = new Date(event.getTime() - (10* 24*60*60*1000));
            let end = new Date(event.getTime() + (10 * 24*60*60*1000));
            let goalID = await Cloud.addGoal("test", "new goal from test", ["cherry"], [start, event, end], 5);
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
    flex: 0.4
  },
  inputHeader: {
    color: "#484848",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 21
  },
  inputTakerContainer: {
    flex: 0.6,
    alignItems: "flex-start"
  },
  dayCheckBox: {
    width: 10
  }
});
export default CreateGoal;
