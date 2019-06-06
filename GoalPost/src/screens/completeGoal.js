import React from "react";
import { Button, Image, StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import baseStyles from "../../styles/baseStyles";
import StandardButton from "../components/standardButton";
import GoBackButton from "../components/goBackButton";
import CenterImage from "../components/centerImage";
import Leaderboard from "../components/leaderboard";

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
    userMap: null,
    rank: 0,
    isModalVisible: false
  };

  async componentDidMount() {
    const goal = await Cloud.loadGoal(this.state.userID, this.state.goalID);
    const users = GoalManager.getSortedUsers(goal.user_logs, goal.event_times, goal.penalty);
    const pot = GoalManager.getTotalPot(goal.user_logs, goal.event_times, goal.penalty);
    // userID, progress, debt
    const rank = users.findIndex(({ userID }) => userID == this.state.userID) + 1;
    this.setState({ userMap: users, rank: rank });
  }

  getPayouts = ({ userID, progress, debt }) => {
    // TODO actually calculate this out
    return (
      <Text style={baseStyles.text}><Text style={{ fontWeight: 'bold' }}>{userID}: </Text>{debt}</Text>
    );
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} />
        <View style={{ flex: 0.3, alignSelf: "stretch" }}>
          <Text style={baseStyles.heading}>
            Congratulations, you got {this.state.rank} place!
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
                <Text style={baseStyles.text}>How to receive your share of the pot:</Text>
                {this.state.userMap && this.state.userMap.map(this.getPayouts)}
              </View>
            </Modal>
          </View>
        </View>
        <Leaderboard users={this.state.userMap} flex={0.65} />
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
