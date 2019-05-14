import React from "react";
import { Alert, SectionList, StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";

class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    userID: "undefined default userID",
    userName: "None",
    profilePic: "None",
    active: [],
    completed: [],
    pending: []
  };

  getGoalNames = async (userID, list) => {
    var goalList = list.map(async goalID => {
      const goal = await Cloud.getGoal(goalID);
      const goal_name = goal.goal_name;
      return { goalID: goalID, goalName: goal_name };
    });

    var output = await Promise.all(goalList);
    return output;
  };

  renderItem = ({ item, index, section: { title, data } }) => {
    return (
      <Button
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
        title={item.goalName}
        type="clear"
        onPress={() => {
          if (title == "Active Goals") {
            this.props.navigation.navigate("ActiveGoal", {
              userID: this.state.userID,
              goalID: item.goalID
            });
          } else if (title == "Pending Goals") {
            this.props.navigation.navigate("PendingGoal", {
              userID: this.state.userID,
              goalID: item.goalID
            });
          } else if (title == "Completed Goals") {
            this.props.navigation.navigate("CompleteGoal", {
              userID: this.state.userID,
              goalID: item.goalID
            });
          }
        }}
      />
    );
  };

  selectGoal = e => {
    this.setState({ goalID: e.nativeEvent.text });
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const userID = navigation.getParam("userID", "test");
    // TODO change from getUser to loadUser, also set up navigation from login screen

    const user = await Cloud.getUser(userID);
    const active = await this.getGoalNames(userID, user.active_goals);
    const pending = await this.getGoalNames(userID, user.pending_goals);
    const completed = await this.getGoalNames(userID, user.completed_goals);

    this.setState({
      userID: userID,
      userName: user.user_name,
      profilePic: user.profile_pic,
      active: active,
      pending: pending,
      completed: completed
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={baseStyles.heading2}>
          Hi, {this.state.userName}!{"\n"}Here are your Goals
        </Text>
        <Input placeholder="Enter goal ID here" onChange={this.selectGoal} />
        <SectionList
          sections={[
            { title: "Active Goals", data: this.state.active },
            { title: "Pending Goals", data: this.state.pending },
            { title: "Completed Goals", data: this.state.completed }
          ]}
          renderItem={this.renderItem}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />

        <Button
          title="create a goal"
          type="outline"
          raised
          onPress={() =>
            this.props.navigation.navigate("CreateGoal", {
              userID: this.state.userID
            })
          }
        />
        <Button
          title="log out"
          type="outline"
          raised
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#EEE"
  },
  buttonStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    justifyContent: "flex-start"
  },
  titleStyle: {
    color: "#484848",
    textAlign: "left"
  }
});

export default Home;
