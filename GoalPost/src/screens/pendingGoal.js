import React from "react";
import { Alert, Image, View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";
import GoBackButton from "../components/goBackButton";
import CenterImage from "../components/centerImage";

class PendingGoal extends React.Component {
  static navigationOptions = {
    title: "PendingGoal"
  };
  state = {
    userID: "undefined default userID",
    goalID: "undefined default goalID",
    goalName: "None",
    friendsList: []
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const userID = navigation.getParam("userID", "ERROR UNDEFINED USERID");
    const goalID = navigation.getParam("goalID", "ERROR UNDEFINED GOALID");

    const goal = await Cloud.loadGoal(userID, goalID);
    const scoreMap = goal.user_score_map; // map of format {'userID': score}
    const friendsList = Object.keys(scoreMap);

    this.setState({
      userID: userID,
      goalID: goalID,
      goalName: goal.goal_name,
      friendsList: friendsList
    });
  }

  render() {
    return (
      <View style={baseStyles.flatScreen}>
        <GoBackButton navigation={this.props.navigation} />
        <CenterImage
          flex={0.5}
          image={require("../../images/ginger-cat-message-sent.png")}
        />
        <View
          style={{
            flex: 0.4,
            paddingTop: 10,
            paddingBottom: 40,
            paddingHorizontal: 30
          }}
        >
          <Text style={baseStyles.text}>
            {" "}
            You've been invited to join the Goal{" "}
            <Text style={baseStyles.highlight}>{this.state.goalName}</Text>.
            Your friends {this.state.friendsList.join(" and ")} have already
            joined!
          </Text>
          <Button
            title="  ACCEPT GOAL  "
            titleStyle={{ color: "#E97C44" }}
            buttonStyle={{
              borderColor: "#E97C44",
              borderWidth: 1,
              borderRadius: 25
            }}
            containerStyle={{ alignSelf: "center", marginTop: 30 }}
            onPress={() => {
              Cloud.acceptPendingGoal(this.state.userID, this.state.goalID);
              this.props.navigation.goBack();
            }}
            type="clear"
          />
          <Button
            title="  REJECT GOAL  "
            titleStyle={{ color: "#666" }}
            buttonStyle={{
              borderColor: "#666",
              borderWidth: 1,
              borderRadius: 25
            }}
            containerStyle={{ alignSelf: "center", marginTop: 20 }}
            onPress={() => {
              Cloud.rejectPendingGoal(this.state.userID, this.state.goalID);
              this.props.navigation.goBack();
            }}
            type="clear"
          />
        </View>
      </View>
    );
  }
}
export default PendingGoal;
