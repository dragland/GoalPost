import React from "react";
import { Button, Image, StyleSheet, View, Text } from "react-native";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";
import GoBackButton from "../components/goBackButton";
import CenterImage from "../components/centerImage";

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
        <CenterImage
          flex={0.7}
          image={require("../../images/ginger-cat-track-statistics.png")}
        />
        <View
          style={{
            flex: 0.2,
            paddingTop: 10,
            paddingBottom: 40,
            paddingHorizontal: 30
          }}
        >
          <Text style={baseStyles.text}>
            Congratulations!{"\n"}You've completed the goal{" "}
            <Text style={baseStyles.highlight}>{this.state.goalID}</Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default CompleteGoal;
