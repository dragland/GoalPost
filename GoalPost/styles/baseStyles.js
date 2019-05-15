import React, { StyleSheet } from "react-native"

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  heading: {
    color: "#484848",
    fontWeight: "bold",
    fontSize: 36,
    lineHeight: 42,
    margin: 15
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
    color: "#E97C44",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default baseStyles;
