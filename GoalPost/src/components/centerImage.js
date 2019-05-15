import React, { Component } from "react";
import { View, Image } from "react-native";

export default class CenterImage extends Component {
  render() {
    return (
      <View
        style={{
          flex: this.props.flex,
          alignItems: "flex-end",
          alignSelf: "stretch",
          paddingHorizontal: 50,
          paddingTop: 50
        }}
      >
        <Image
          style={{ flex: 1, alignSelf: "stretch", width: "auto" }}
          source={this.props.image}
          resizeMode={"contain"}
        />
      </View>
    );
  }
}
