import React from "react";
import { Button, View, Text } from "react-native";
import { Input } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";

class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  state = {
    userID: this.props.navigation.getParam("userID", "ERROR UNDEFINED USERID"),
    goalID: "undefined default goalID"
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
        <Text style={baseStyles.text}>Welcome <Text style={{ fontWeight: "bold" }}>{this.state.userID}</Text></Text>
        <Input placeholder="Enter goal ID here" onChange={this.selectGoal} />
        <Button
          title="open active goal"
          onPress={() =>this.props.navigation.navigate("ActiveGoal", {goalID: this.state.goalID})}
        />
        <Button
          title="accept or reject a goal"
          onPress={() => this.props.navigation.navigate("PendingGoal", {goalID: this.state.goalID})}
        />
        <Button
          title="create a goal"
          onPress={() => this.props.navigation.navigate("CreateGoal")}
        />
        <Button
          title="view completed goal"
          onPress={() => this.props.navigation.navigate("CompleteGoal", {goalID: this.state.goalID})}
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