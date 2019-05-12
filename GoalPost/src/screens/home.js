import React from "react";
import { Button, View, Text } from "react-native";
import Cloud from "../components/database";

class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
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
        <Button
          title="open active goal"
          onPress={() => this.props.navigation.navigate("ActiveGoal")}
        />
        <Button
          title="accept or reject a goal"
          onPress={() => this.props.navigation.navigate("PendingGoal")}
        />
        <Button
          title="create a goal"
          onPress={() => this.props.navigation.navigate("CreateGoal")}
        />
        <Button
          title="view completed goal"
          onPress={() => this.props.navigation.navigate("CompleteGoal")}
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