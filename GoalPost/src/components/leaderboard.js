import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";

export default class Leaderboard extends Component {
  render() {
    return (
      <View style={[styles.mainContainer, { flex: this.props.flex || 0.55 }]}>
        <Text style={baseStyles.text}>
          <Text style={{ fontWeight: "bold" }}>CURRENT LEADERBOARD</Text>
        </Text>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#1</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../res/davy.jpg")}
          />
          <View style={[styles.progressBox, { width: 160}]} />
          <Text style={baseStyles.text}>+$15.00</Text>
        </View>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#2</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../res/cam.jpg")}
          />
          <View style={[styles.progressBox, { width: 120}]} />
          <Text style={baseStyles.text}>-$5.00</Text>
        </View>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#3</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../res/jesus.jpg")}
          />
          <View style={[styles.progressBox, { width: 120}]} />
          <Text style={baseStyles.text}>-$5.00</Text>
        </View>
        <View style={styles.boardEntry}>
          <Text style={baseStyles.heading2}>#4</Text>
          <Avatar
            size="medium"
            rounded
            source={require("../../res/cherry.jpg")}
          />
          <View style={[styles.progressBox, { width: 80}]} />
          <Text style={baseStyles.text}>-$15.00</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    marginTop: 40,
    marginBottom: 40,
    marginHorizontal: 15
  },
  boardEntry: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    margin: 5
  },
  progressBox: {
    backgroundColor: "#2CAAFF",
    height: 15,
    margin: 5,
    marginRight: 15
  },
});
