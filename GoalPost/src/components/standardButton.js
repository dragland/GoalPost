import React, { Component } from "react";
import { Button } from "react-native-elements";

export default class StandardButton extends Component {
  render() {
    const title = "  " + this.props.title.toUpperCase() + "  ";
    const color = this.props.orange ? "#2CAAFF" : "#666";

    return (
      <Button
        title={title}
        titleStyle={{ color: color }}
        buttonStyle={{
          borderColor: color,
          borderWidth: 1,
          borderRadius: 25
        }}
        disabled={this.props.disabled}
        disabledStyle={{ 
          borderWidth: 0 
        }}
        disabledTitleStyle={{
          color: "#BBB"
        }}
        containerStyle={this.props.containerStyle}
        onPress={this.props.onPress}
        type="clear"
      />
    );
  }
}
