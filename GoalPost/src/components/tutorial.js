/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Davy Ragland | dragland@stanford.edu
*/

import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

import baseStyles from "../../styles/baseStyles";

export default class Tutorial extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.title, {textAlign: "left", fontSize: 22, fontWeight: "bold"}]}>
            GoalPost helps you reach your
            goals through friendly competition :)
        </Text>
        <Text style={styles.break}>{"\n\n\n"}</Text>
        <Text style={styles.block}>
          <Text style={{ fontWeight: "bold" }}>Goals</Text>
        </Text>
        <Text style={styles.block}>
          Is there something you always wanted to achieve that felt far away?
          Take your first baby steps by creating a goal!
          {"\n\n"}
          By clicking on the big plus button at the top of the home page, you
          will be able to create a goal that you want to accomplish.
          {"\n\n"}
          You can select when you want it to start, when you want it to end, and
          each day that you want to take a baby step "event" on.
          {"\n\n"}
          Also, as a personal incentive, you can set a penalty for each time an
          event is missed.
        </Text>
        <Text style={styles.break}>{"\n"}</Text>
        <Text style={styles.block}>
          <Text style={{ fontWeight: "bold" }}>Friends</Text>
        </Text>
        <Text style={styles.block}>
          Goals are better with friends! When you create a new goal, you can
          invite friends on the app to help you complete it.
          {"\n\n"}
          Also, on your home screen, you can see pending goal invitations from
          your friends. You can then click on it to view the details and decide
          if you want to join.
        </Text>
        <Text style={styles.break}>{"\n"}</Text>
        <Text style={styles.block}>
          <Text style={{ fontWeight: "bold" }}>Checking in</Text>
        </Text>
        <Text style={styles.block}>
          Once your goal is active, you will be reminded each event day to check
          in. You can do so by navigating to that goal's page from your home
          list.
          {"\n\n"}
          If you have completed your event for the day, check in and your
          overall progress score will go up! If you fail however, you will be
          charged the set penalty.
        </Text>
        <Text style={styles.break}>{"\n"}</Text>
        <Text style={styles.block}>
          <Text style={{ fontWeight: "bold" }}>Money</Text>
        </Text>
        <Text style={styles.block}>
          Staying on track with your goals can be hard. Luckily, we have a fun
          and playful incentive for you: your friend's money!
          {"\n\n"}
          Each time you or your friends miss an event, the money gets added to
          the pot, and at the end, the pot gets split evenly between all goal
          members.
          {"\n\n"}
          If you stay on track and make it to the end of the goal, you will earn
          money, but if you miss more events than your friends, their dinner
          will be on you.
          {"\n\n"}
          Have fun and good luck on all your goals!
          {"\n\n"}
          {"\n\n"}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    color: "#484848",
    fontSize: 18,
    textAlign: "center"
  },
  block: {
    color: "#484848",
    fontSize: 18,
    textAlign: "left"
  },
  break: {
    fontSize: 5
  }
});
