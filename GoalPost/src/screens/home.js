/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
  Davy Ragland | dragland@stanford.edu
  Jesus Cervantes | cerjesus@stanford.edu
  Cam Thouati | cameron8@stanford.edu
*/

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  SectionList
} from "react-native";
import { Icon, ListItem, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";

import baseStyles from "../../styles/baseStyles";

import CreateGoalButton from "../components/createGoalButton";
import StandardButton from "../components/standardButton";

import { Cloud } from "../services/database";
import { facebookService } from "../services/FacebookService";
import { GoalManager } from "../services/goalManagement";

class Home extends React.Component {
  state = {
    userID: "",
    userName: "",
    profilePic: "",
    active: [],
    completed: [],
    pending: [],
    spinner: true,
    refreshing: false
  };

  static navigationOptions = {
    title: "Home"
  };

  renderItem = ({ item, index, section: { title, data } }) => {
    const color = title == "Pending Invites" ? "#666" : "#4DD796";
    return (
      <ListItem
        title={item.goalName}
        subtitle={
          "You have participated in this goal " + item.numTasks + " times!"
        }
        onPress={() => {
          if (title == "Active Goals") {
            this.props.navigation.navigate("ActiveGoal", {
              userID: this.state.userID,
              goalID: item.goalID
            });
          } else if (title == "Pending Invites") {
            this.props.navigation.navigate("PendingGoal", {
              userID: this.state.userID,
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
        containerStyle={{ marginHorizontal: 5 }}
        chevron
      />
    );
  };

  logout() {
    this.props.navigation.navigate("Login");
  }

  async populateGoalLists() {
    const { navigation } = this.props;
    const userID = navigation.getParam("userID", "");

    const user = await Cloud.loadUser(userID);
    const active = await GoalManager.getGoalNames(userID, user.active_goals);
    const pending = await GoalManager.getGoalNames(userID, user.pending_goals);
    const completed = await GoalManager.getGoalNames(
      userID,
      user.completed_goals
    );

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
    this.setState({ refreshing: true });
    this.populateGoalLists().then(() => {
      this.setState({ refreshing: false });
    });
  };

  makeButton = title => {
    title = title.toUpperCase();
    return (
      <Button
        title={title}
        titleStyle={{
          color: "#FFF",
          fontSize: 17,
          lineHeight: 18
        }}
        buttonStyle={{
          // backgroundColor: "#BABABA",
          backgroundColor: "#4dd796",
          borderColor: "#FFF",
          borderWidth: 1,
          borderRadius: 15
        }}
        containerStyle={{ 
          width: 180
        }}
        onPress={() =>
          this.props.navigation.navigate("CreateGoal", {
            userID: this.state.userID
          })
        }
        type="clear"
      />
    );
  }

  render() {
    if (this.state.spinner) {
      return (
        <View style={styles.screen}>
          <NavigationEvents onDidFocus={() => this.populateGoalLists()} />
          <Spinner
            visible
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </View>
      );
    }
    return (
      <View style={baseStyles.flatScreen}>
        <NavigationEvents onDidFocus={() => this.populateGoalLists()} />
        <View style={styles.titleBox}>
          <Text style={styles.title}>
            Hi, {this.state.userName}!{"\n"}Here are your Goals
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
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
        <View style={{flex: 0.11, alignSelf: "stretch", paddingHorizontal: 15 }}>
          <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <View style={styles.fbButtonBox}>
              {facebookService.makeLogoutButton(styles.fbButton, this.logout)}
            </View>
            {this.makeButton("Make New Goal")}
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleBox: {
    flex: 0.19,
    alignSelf: "stretch",
    backgroundColor: "#4dd796",
    paddingTop: 30,
    paddingHorizontal: 20,
    elevation: 5
  },
  title: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "400",
    textAlign: "left"
  },
  scrollView: {
    flex: 0.7,
    alignSelf: "stretch"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: "300",
    backgroundColor: "#EEE"
  },
  fbButtonBox: {
    justifyContent: "center",
    alignItems: "center",

    //backgroundColor: "#BABABA",
    backgroundColor: "#4dd796",
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 15,

    paddingVertical: 3,
    paddingHorizontal: 40,
  },
  fbButton: {
    height: 30,
    width: 85,
    //backgroundColor: "#4dd796",
    backgroundColor: "transparent",
    transform: [{ scaleY: 1.4 }, { scaleX: 1.4 }]
  }
});

export default Home;
