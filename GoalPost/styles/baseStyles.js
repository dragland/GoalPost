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
