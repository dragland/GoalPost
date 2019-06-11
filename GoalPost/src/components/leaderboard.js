/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
  Davy Ragland | dragland@stanford.edu
*/

import React, { Component } from "react";
import { FlatList, ScrollView, View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import ProgressBar from 'react-native-progress/Bar';

import baseStyles from "../../styles/baseStyles";

import { Cloud } from "../services/database";

export default class Leaderboard extends Component {

  populateUsers() {
    let users = this.props.users;
    let pot = this.props.pot;
    let data = this.props.logs.map(({ userID, progress, debt }) => {
      const { user_name, profile_pic } =  users[userID];
      return { 
        key : userID,
        user_name : user_name,
        profile_pic : profile_pic,
        progress : progress, 
        debt : debt,
      };
    });
    return {data, pot};
  }

  renderItem = ({ item, index }) => {
    var avatar = <Avatar size="medium" rounded />;
    if (item.profile_pic.length > 0) {
      avatar = <Avatar size="medium" rounded source={{ uri: item.profile_pic }} />;
    }
    return(
      <View style={styles.boardEntry}>
        <Text style={baseStyles.heading2}>#{index + 1}</Text>
        { avatar }
        <Text style={baseStyles.text}> </Text>
        <ProgressBar progress={item.progress/100} width={140} height={15} color={"#4DD796"} />
        <Text style={baseStyles.text}> -${item.debt}</Text>
      </View>
    );
  }

  render() {
    let parsed = this.populateUsers();
    return (
      <View style={[styles.mainContainer, { flex: this.props.flex || 0.55 }]}>
        <Text style={baseStyles.text}>
          <Text style={{ fontWeight: "bold" }}>TOTAL POT: ${parsed.pot}{"\n"}</Text>
        </Text>
        <Text style={baseStyles.text}>
          <Text style={{ fontWeight: "bold" }}>CURRENT LEADERBOARD</Text>
        </Text>
        <ScrollView>
          <FlatList 
            data={parsed.data} 
            renderItem={this.renderItem} 
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    marginTop: 40,
    marginBottom: 40,
    marginHorizontal: 15
  },
  boardEntry: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 5
  }
});