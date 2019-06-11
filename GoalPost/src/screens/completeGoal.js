import React from "react";
import { Button, Image, StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import Spinner from 'react-native-loading-spinner-overlay';
import baseStyles from "../../styles/baseStyles";
import StandardButton from "../components/standardButton";
import GoBackButton from "../components/goBackButton";
import CenterImage from "../components/centerImage";
import Leaderboard from "../components/leaderboard";
import Payment from "../components/payment";

import { Cloud } from "../services/database";
import { facebookService } from "../services/FacebookService";
import { GoalManager } from "../services/goalManagement";

class CompleteGoal extends React.Component {
  static navigationOptions = {
    title: "CompleteGoal"
  };

  state = {
    userID: this.props.navigation.getParam("userID", ""),
    goalID: this.props.navigation.getParam("goalID", ""),
    userMap: {},
    userLogs: [],
    pot: 0,
    rank: 0,
    isModalVisible: false,
    spinner: true
  };

  async componentDidMount() {
    const goal = await Cloud.loadGoal(this.state.userID, this.state.goalID);
    const users = await Cloud.loadUsersMap(this.state.userID);
    const logs = GoalManager.getSortedUsers(goal.user_logs, goal.event_times, goal.penalty);
    const pot = GoalManager.getTotalPot(goal.user_logs, goal.event_times, goal.penalty);
    // userID, progress, debt
    const rank = logs.findIndex(({ userID }) => userID == this.state.userID) + 1;
    this.setState({
      userMap: users,
      userLogs: logs,
      pot: pot,
      rank: rank,
      spinner: false
    });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  getRankText = () => {
    let j = this.state.rank % 10;
    let k = this.state.rank % 100;
    let s = this.state.rank.toString();
    if (j == 1 && k != 11) {
        return s + "st";
    }
    if (j == 2 && k != 12) {
        return s + "nd";
    }
    if (j == 3 && k != 13) {
        return s + "rd";
    }
    return s + "th";
  }

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
        <View style={{ flex: 0.3, alignSelf: "stretch" }}>
          <Text style={baseStyles.heading}>
            Congratulations, you got {this.getRankText()} place!
          </Text>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }} >
            <StandardButton
              title="Cash Out"
              containerStyle={{
                alignSelf: "center",
                width: 150,
                marginTop: 20,
                marginHorizontal: 15
              }}
              onPress={this.toggleModal}
              color
            />
            <Modal
              isVisible={this.state.isModalVisible}
              onBackButtonPress={this.toggleModal}
              onBackdropPress={this.toggleModal}
            >
              <View style={styles.modalView}>
                <Payment userID={this.state.userID} users={this.state.userMap} logs={this.state.userLogs} pot={this.state.pot} />
              </View>
            </Modal>
          </View>
        </View>
        <Leaderboard users={this.state.userMap} logs={this.state.userLogs} pot={this.state.pot} flex={0.65} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    flex: 0.7,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10
  }
});

export default CompleteGoal;