import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class InputRow extends Component {
  render() {
    return (
      <View style={styles.inputRow}>
        <View style={styles.inputHeaderContainer}>
          <Text style={styles.inputHeader}>{this.props.header}</Text>
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
    padding: 20
  },
  inputHeaderContainer: {
    flex: 0.18
  },
  inputHeader: {
    color: "#484848",
    fontWeight: "bold",
    fontSize: 18,
    lineHeight: 21
  },
  inputTakerContainer: {
    flex: 0.82,
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
