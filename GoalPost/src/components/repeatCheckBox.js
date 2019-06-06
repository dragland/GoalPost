import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";

export default class RepeatCheckBox extends Component {
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <CheckBox
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="#4DD796"
          containerStyle={styles.containerStyle}
          checked={this.props.checked}
          onIconPress={this.props.onIconPress}
        />
        <Text style={styles.text}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderColor: "#666",
    borderWidth: 0,
    padding: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: 10
  },
  text: {
    color: "#666",
    fontSize: 16,
    fontWeight: "bold",
  }
});
