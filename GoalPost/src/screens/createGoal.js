import React from "react";
import { Button, View, StyleSheet, Switch, Text } from "react-native";
import { Input } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";
import RNCalendarEvents from 'react-native-calendar-events';

class CreateGoal extends React.Component {
  static navigationOptions = {
    title: "CreateGoal"
  };
  state = {
    isDateTimePickerVisible: false,
    enablePushNotifs: true,
    goalName: null,
    startDate: null,
    endDate: null
  };

  updateGoalName = e => {
    this.setState({ goalName: e.nativeEvent.text });
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleStartDatePicked = startDate => {
    this.setState({ startDate: startDate.toLocaleDateString() });
    this.hideDateTimePicker();
  };
  handleEndDatePicked = endDate => {
    this.setState({ endDate: endDate.toLocaleDateString() });
    this.hideDateTimePicker();
  };
  togglePushNotifs = bool => {
    this.setState({ enablePushNotifs: bool });
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
            <Input value={this.state.startDate} onFocus={this.showDateTimePicker} />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>End Date</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Input value={this.state.endDate} onFocus={this.showDateTimePicker} />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleEndDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputHeaderContainer}>
            <Text style={styles.inputHeader}>Repeat?</Text>
          </View>
          <View style={styles.inputTakerContainer}>
            <Input placeholder="Weekly M, W, F" />
          </View>
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
          onPress={() => {
            Cloud.pushGoalToDB(this.state.goalName);
            this.props.navigation.navigate("Home", {goalName: this.state.goalName});
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
  }
});

export default CreateGoal;
