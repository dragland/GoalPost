import React from "react";
import { Button, Image, StyleSheet, View, Text } from "react-native";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";

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
      <View style={baseStyles.screen}>
        <Text style={baseStyles.heading}>Congratulations!</Text>
        <Text style={baseStyles.text}>You've completed the goal&nbsp;
          <Text style={{ fontWeight: "bold" }}>{this.state.goalID}</Text>
        !</Text>

        <Image
          style={styles.image}
          source={require('../../images/trophy.png')}
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
  image: {
    height: 150,
    width: 150,
    margin: 20
  }
});
export default CompleteGoal;