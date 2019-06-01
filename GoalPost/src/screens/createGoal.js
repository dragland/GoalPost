import React from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Picker,
  Alert
} from "react-native";
import { Input, CheckBox } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import baseStyles from "../../styles/baseStyles";

// import custom components
import RepeatCheckBox from "../components/repeatCheckBox";
import InputRow from "../components/inputRow";
import GoBackButton from "../components/goBackButton";
import StandardButton from "../components/standardButton";
import update from "immutability-helper";
import Modal from "react-native-modal";
import MultiSelect from 'react-native-multiple-select';

// import custom functions
import { Cloud } from "../services/database";
import { facebookService } from '../services/FacebookService';
import { NotificationManager } from "../services/notifications";

class CreateGoal extends React.Component {
  static navigationOptions = {
    title: "CreateGoal"
  };
  state = {
    userID: this.props.navigation.getParam("userID", "ERROR UNDEFINED USERID"),
    userName: this.props.navigation.getParam("userName", "ERROR UNDEFINED USERNAME"),
    goalID: "undefined default goalID",
    isDatePicker1Visible: false,
    isDatePicker2Visible: false,
    goalName: null,
    startDate: null,
    endDate: null,
    time: null,
    cost: null,
    members: [],
    recurArray: [
      { title: "S", checked: false },
      { title: "M", checked: false },
      { title: "T", checked: false },
      { title: "W", checked: false },
      { title: "Th", checked: false },
      { title: "F", checked: false },
      { title: "S", checked: false }
    ],
    userMap: {},
    isModalVisible: false
  };

  async componentDidMount() {
    const users = await Cloud.loadUserList(this.state.userID);
    /* @Cam TODO append to users each userid who is an inviteable friend with users[userid] = "userName" */
    this.setState({
      userMap: users
    });
  }

  createUserList = (map) => {
    let l = [];
    for (k in map) {
      if (k != this.state.userID) {
        l.push({userID: k, user_name: map[k]});
      }
    }
    return l;
  }

  updateGoalName = e => {
    this.setState({ goalName: e.nativeEvent.text });
  };
  updateCost = e => {
    this.setState({
      cost: Math.round(parseFloat(e.nativeEvent.text) * 100) / 100
    });
  };

  showDatePicker1 = () => {
    this.setState({ isDatePicker1Visible: true });
  };
  hideDatePicker1 = () => {
    this.setState({ isDatePicker1Visible: false });
  };
  showDatePicker2 = () => {
    this.setState({ isDatePicker2Visible: true });
  };
  hideDatePicker2 = () => {
    this.setState({ isDatePicker2Visible: false });
  };
  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };
  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };
  handleStartDatePicked = startDate => {
    this.setState({ startDate: startDate });
    this.hideDatePicker1();
  };
  handleEndDatePicked = endDate => {
    this.setState({ endDate: endDate });
    this.hideDatePicker2();
  };
  handleTimePicked = time => {
    this.setState({ time: time });
    this.hideTimePicker();
  };
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  selectFriend = e => {
    this.setState({ members: e });
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

    var eventTimes = NotificationManager.getEventTimes(
      this.state.startDate,
      this.state.endDate,
      weekdays,
      this.state.time
    );

    var goalID = await Cloud.addGoal(
      this.state.userID,
      this.state.goalName,
      this.state.members,
      eventTimes,
      this.state.cost
    );
    await NotificationManager.scheduleNotifications(this.state.userName, goalID);
    Alert.alert("successfully created goal with ID: ", goalID);

    this.props.navigation.goBack();
  };

  render() {
    const { members } = this.state;
    const { userMap } = this.state;
    let items = this.createUserList(userMap);

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
            <TouchableWithoutFeedback onPress={this.showDatePicker1}>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>
                  {this.state.startDate
                    ? this.state.startDate.toLocaleDateString()
                    : ""}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <DateTimePicker
              isVisible={this.state.isDatePicker1Visible}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDatePicker1}
              minimumDate={new Date()}
              maximumDate={this.state.endDate ? this.state.endDate : undefined}
            />
          </InputRow>

          <InputRow header="End Date">
            <TouchableWithoutFeedback onPress={this.showDatePicker2}>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>
                  {this.state.endDate
                    ? this.state.endDate.toLocaleDateString()
                    : ""}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <DateTimePicker
              isVisible={this.state.isDatePicker2Visible}
              onConfirm={this.handleEndDatePicked}
              onCancel={this.hideDatePicker2}
              minimumDate={
                this.state.startDate ? this.state.startDate : new Date()
              }
            />
          </InputRow>

          <InputRow header="Notifs Time">
            <TouchableWithoutFeedback onPress={this.showTimePicker}>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>
                  {this.state.time
                    ? this.state.time.getHours() + ":" + this.state.time.getMinutes()
                    : ""}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <DateTimePicker
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this.handleTimePicked}
              onCancel={this.hideTimePicker}
              mode="time"
              timePickerModeAndroid="spinner"
            />
          </InputRow>

          <InputRow header="Repeat Every">
            {this.state.recurArray.map((item, i) => (
              <RepeatCheckBox
                title={item.title}
                key={i}
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
              onChange={this.updateCost}
            />
          </InputRow>

          <InputRow header="Members">
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <View style={styles.inputView}>
                <Text style={styles.inputText}>
                  { this.state.members.length > 0 ? 
                      this.state.members.map(e => this.state.userMap[e]).join(", ") : "" }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </InputRow>

          <Modal isVisible={this.state.isModalVisible}
            onBackButtonPress={this.toggleModal}
            onBackdropPress={this.toggleModal}
          >
            <View style={{ flex: 0.7 }}>
              <MultiSelect
                items={items}
                uniqueKey="userID"
                displayKey="user_name"
                hideTags
                hideSubmitButton
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.selectFriend}
                selectedItems={members}
                selectText="Search Friends..."
                searchInputPlaceholderText="Search Friends..."
                tagRemoveIconColor="#666"
                tagBorderColor="#666"
                tagTextColor="#666"
                styleMainWrapper={{ borderRadius: 20, backgroundColor: '#FFF', padding: 10 }}
                styleDropdownMenuSubsection={{ borderWidth: 0, borderColor: '#FFF' }}
                styleListContainer={{ paddingTop: 10 }}
                styleTextDropdown={{ fontSize: 16 }}
                styleTextDropdownSelected={{ fontSize: 16 }}
              />
              <View>
                {this.multiSelect && this.multiSelect.getSelectedItemsExt(members)}
              </View>
            </View>
          </Modal>

        </View>

        <View style={{ flex: 0.2, paddingHorizontal: 30, alignSelf: "center" }}>
          <StandardButton
            title="Create New Goal"
            containerStyle={{ alignSelf: "center", marginTop: 20 }}
            onPress={this.createNewGoal}
            disabled={
              !(
                this.state.goalName &&
                this.state.startDate &&
                this.state.endDate &&
                this.state.time &&
                this.state.cost
              )
            }
            orange
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderBottomColor: "#86939e",
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  inputText: {
    fontSize: 16,
    color: "#000"
  },
});
export default CreateGoal;
