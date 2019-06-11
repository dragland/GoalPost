/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cherry Zou | cherryz@stanford.edu
*/

import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

export default class GoBackButton extends Component {
  render() {
    return (
      <View
        style={{
          flex: this.props.flex || 0.1,
          paddingHorizontal: 20,
          paddingVertical: 10
        }}
      >
        <Button
          title="GO BACK"
          titleStyle={{ color: "#666" }}
          onPress={() => this.props.navigation.goBack()}
          type="clear"
        />
      </View>
    );
  }
}
