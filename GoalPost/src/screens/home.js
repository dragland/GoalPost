import React from "react";
import { Button, View, Text } from "react-native";
import { Input } from "react-native-elements";
import Cloud from "../components/database";

class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  state = {
    goalID: "undefined"
  };

  selectGoal = e => {
    this.setState({ goalID: e.nativeEvent.text });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View>
            <Input placeholder="Enter goal ID here" onChange={this.selectGoal} />
        </View>
        <Button
          title="open active goal"
          onPress={() =>this.props.navigation.navigate("ActiveGoal", {goalName: this.state.goalID})}
        />
        <Button
          title="accept or reject a goal"
          onPress={() => this.props.navigation.navigate("PendingGoal", {goalName: this.state.goalID})}
        />
        <Button
          title="create a goal"
          onPress={() => this.props.navigation.navigate("CreateGoal")}
        />
        <Button
          title="view completed goal"
          onPress={() => this.props.navigation.navigate("CompleteGoal", {goalName: this.state.goalID})}
        />
        <Button
          title="log out"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
export default Home;