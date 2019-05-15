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
          containerStyle={styles.containerStyle}
          checked={this.props.checked}
        />
        <Text style={{ color: "#444", fontWeight: "bold" }}>
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
    borderWidth: 0
  }
});
