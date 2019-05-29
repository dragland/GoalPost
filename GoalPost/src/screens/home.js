import React from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  SectionList,
  StyleSheet,
  View,
  Text
} from "react-native";
import { Button, Input, Icon, ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import baseStyles from "../../styles/baseStyles";
import Cloud from "../components/database";
import CreateGoalButton from "../components/createGoalButton";

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
    pending: [],
    spinner: true,
    refreshing: false
  };

  getGoalNames = async (userID, list) => {
    var goalList = list.map(async goalID => {
      const goal = await Cloud.loadGoal(userID, goalID);
      const goal_name = goal.goal_name;

      var num_completed_tasks = 0;
      const arr = goal.user_logs[userID]
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
          num_completed_tasks++;
        }
      }
      return { goalID: goalID, goalName: goal_name, numTasks: num_completed_tasks };
    });

    var output = await Promise.all(goalList);
    return output.reverse();
  };

  renderItem = ({ item, index, section: { title, data } }) => {
    const color = title == "Pending Invites" ? "#666" : "#2CAAFF";
    return (
      <ListItem
        title={item.goalName}
        subtitle={"You have completed this task " + item.numTasks + " times!"}
        onPress={() => {
          if (title == "Active Goals") {
            this.props.navigation.navigate("ActiveGoal", {
              userID: this.state.userID,
              goalID: item.goalID
            });
          } else if (title == "Pending Invites") {
            this.props.navigation.navigate("PendingGoal", {
              userID: this.state.userID,
              userName: this.state.userName,
              goalID: item.goalID,
              refresh: this.componentDidMount.bind(this)
            });
          } else if (title == "Completed Goals") {
            this.props.navigation.navigate("CompleteGoal", {
              userID: this.state.userID,
              goalID: item.goalID
            });
          }
        }}
        leftIcon=<Icon name="flag" type="font-awesome" color={color} />
        chevron
      />
    );
  };

  async populateGoalLists() {
    const { navigation } = this.props;
    const userID = navigation.getParam("userID", "undefined default userID");

    const user = await Cloud.loadUser(userID);
    const active = await this.getGoalNames(userID, user.active_goals);
    const pending = await this.getGoalNames(userID, user.pending_goals);
    const completed = await this.getGoalNames(userID, user.completed_goals);

    this.setState({
      userID: userID,
      userName: user.user_name,
      profilePic: user.profile_pic,
      active: active,
      pending: pending,
      completed: completed,
      spinner: false
    });
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    this.populateGoalLists().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ spinner: false });
    }, 5000); // experiment with this
  }

  render() {
    if (this.state.spinner) {
      return (
        <View style={styles.screen}>
          <NavigationEvents onDidFocus={() => this.populateGoalLists()} />
          <Spinner visible textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        </View>
      );
    }
    return (
      <View style={styles.screen}>
        <NavigationEvents onDidFocus={() => this.populateGoalLists()} />
        <View style={{ flex: 0.17, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.8 }}>
            <Text style={baseStyles.heading2}>
              Hi, {this.state.userName}!{"\n"}Here are your Goals
            </Text>
          </View>
          <CreateGoalButton
            userID={this.state.userID}
            userName={this.state.userName}
            navigation={this.props.navigation}
          />
        </View>
        <View
          style={{
            flex: 0.83,
            borderTopWidth: 2,
            borderTopColor: "#444",
            borderBottomWidth: 4,
            borderBottomColor: "#DDD"
          }}
        >
          <ScrollView
            refreshControl={ 
              <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
          }>
            <SectionList
              sections={[
                { title: "Active Goals", data: this.state.active },
                { title: "Pending Invites", data: this.state.pending },
                { title: "Completed Goals", data: this.state.completed }
              ]}
              renderItem={this.renderItem}
              renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
              keyExtractor={(item, index) => index}
            />
          </ScrollView>
        </View>

          <Button
            title="LOG OUT"
            type="clear"
            titleStyle={{ color: "#666" }}
            containerStyle={{ marginTop: 10, marginBottom: 20 }}
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
