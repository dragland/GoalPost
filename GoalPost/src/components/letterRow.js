/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
*/

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class LetterRow extends Component {
  render() {
    return (
      <View style={styles.letterRow}>
        <View style={{ flex: 0.3, marginRight: 15 }}>
          <Text style={styles.letterQ}>{this.props.header}{"  "}&middot;</Text>
        </View>
        <View style={{ flex: 0.7 }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  letterRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  letterQ: {
    color: "#666",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "right"
  },
});