import React from "react";
import { Button, View, StyleSheet, Switch, Text, TextInput, Picker } from "react-native";
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
    isRepeatUnitPickerVisible: true,
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

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  showRepeatUnitPicker = () => {
      this.setState({ isRepeatUnitPickerVisible: true });
    };
  hideRepeatUnitPicker = () => {
    this.setState({ isRepeatUnitPickerVisible: false });
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
            <Text style={styles.inputHeader}>Repeat Every</Text>
          </View>
          <View style={styles.inputTakerContainer}>
                      <TextInput placeholder="1"
                      keyboardType = 'numeric'
                      onChangeText = {this.repeatFreqChosen}
                      />
          </View>
          <View style={styles.inputTakerContainer}>
            <Input value={this.state.recurRule} onFocus={this.showRepeatUnitPicker} />
            <Picker
              isVisible={this.state.isRepeatUnitPickerVisible}
              onCancel={this.hideRepeatUnitPicker}
              selectedValue={this.state.recurRule}
              style={styles.inputTakerContainer}
              onValueChange={this.repeatUnitChosen}>
              <Picker.Item label="Daily" value="Days" />
              <Picker.Item label="Weekly" value="Weeks" />
              <Picker.Item label="Monthly" value="Months" />
              <Picker.Item label="Yearly" value="Years" />
            </Picker>
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
            Cloud.addGoal("0", "0", this.state.goalName);
            this.props.navigation.navigate("ActiveGoal", {goalName: this.state.goalName});
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
