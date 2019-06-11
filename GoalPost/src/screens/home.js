/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
  Davy Ragland | dragland@stanford.edu
  Jesus Cervantes | cerjesus@stanford.edu
  Cam Thouati | cameron8@stanford.edu
*/

import React from "react";
import { Text, View, StyleSheet, RefreshControl, ScrollView, SectionList } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';

import baseStyles from "../../styles/baseStyles";

import CreateGoalButton from "../components/createGoalButton";

import { Cloud } from "../services/database";
import { facebookService } from '../services/FacebookService';
import { GoalManager } from '../services/goalManagement';

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
        subtitle={"You have participated in this goal " + item.numTasks + " times!"}
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
    const completed = await GoalManager.getGoalNames(userID, user.completed_goals);

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

        <View style={styles.container}>
          {facebookService.makeLogoutButton(() => {
              this.logout();
          })}
        </View>

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