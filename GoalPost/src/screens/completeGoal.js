import React from "react";
import { Button, Image, StyleSheet, View, Text } from "react-native";
import baseStyles from "../../styles/baseStyles";
import GoBackButton from "../components/goBackButton";
import CenterImage from "../components/centerImage";
import Leaderboard from "../components/leaderboard";

import { Cloud } from "../services/database";
import { facebookService } from '../services/FacebookService';

class CompleteGoal extends React.Component {
  static navigationOptions = {
    title: "CompleteGoal"
  };
  state = {
    userID: this.props.navigation.getParam("userID", "ERROR UNDEFINED USERID"),
    goalID: this.props.navigation.getParam("goalID", "ERROR UNDEFINED GOALID")
  };

  render() {
    return (
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} />
        <View styles={{ flex: 0.35, alignSelf: "stretch" }}>
          <Text>This will soon contain other, better things</Text>
        </View>
        <Leaderboard />
      </View>
    );
  }
}

export default CompleteGoal;
