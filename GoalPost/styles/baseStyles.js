/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
*/

import React, { Dimensions, StyleSheet } from "react-native";

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  flatScreen: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  heading: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 32,
    margin: 10
  },
  heading2: {
    color: "#484848",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 42,
    margin: 15
  },
  text: {
    color: "#484848",
    fontSize: 18,
    textAlign: "center"
  },
  highlight: {
    color: "#4DD796",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default baseStyles;