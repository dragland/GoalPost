import React, { Component } from "react";
import { Button } from "react-native-elements";

export default class StandardButton extends Component {
  render() {
    const title = "  " + this.props.title.toUpperCase() + "  ";
    const color = this.props.orange ? "#E97C44" : "#666";

    return (
      <Button
        title={title}
        titleStyle={{ color: color }}
        buttonStyle={{
          borderColor: color,
          borderWidth: 1,
          borderRadius: 25
        }}
        containerStyle={this.props.containerStyle}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        type="clear"
      />
    );
  }
}
