/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
*/

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class InputRow extends Component {
  render() {
    const header = this.props.header.toUpperCase();

    return (
      <View style={styles.inputRow}>
        <View style={styles.inputHeaderContainer}>
          <Text style={styles.inputHeader}>{header}</Text>
        </View>
        <View style={styles.inputTakerContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  inputHeaderContainer: {
    flex: 0.27
  },
  inputHeader: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputTakerContainer: {
    flex: 0.73,
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
