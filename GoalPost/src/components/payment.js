/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Davy Ragland | dragland@stanford.edu
*/

import React, { Component } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import baseStyles from "../../styles/baseStyles";

export default class Payment extends Component {
  calculatePaymentInfo() {
    let userID = this.props.userID;
    let users = this.props.users;
    let logs = this.props.logs;
    let pot = this.props.pot;
    let num = Object.keys(logs).length;
    let profit = (pot / num).toFixed(2);

    for (let i = 0; i < num; i++) {
      users[logs[i].userID].rank = i;
      users[logs[i].userID].debt = logs[i].debt;
    }
    return { userID, users, logs, pot, num, profit };
  }

  getCashOutText(data) {
    if (data.num === 1 || data.pot === 0) {
      return this.getCheckText();
    }
    if (data.userID === data.logs[0].userID) {
      return this.getPayAllText(
        data.userID,
        data.logs,
        data.users,
        data.num,
        data.profit
      );
    } else {
      return this.getPayInText(
        data.users[data.logs[0].userID].user_name,
        data.users[data.userID].debt,
        data.profit
      );
    }
  }

  getCheckText() {
    return (
      <Text style={styles.block}>
        Congratulations on finishing your goal, you are all set!
      </Text>
    );
  }

  getPayAllText(userID, logs, users, num, profit) {
    let data = [];
    for (let i = 0; i < num; i++) {
      let u = logs[i].userID;
      if (userID !== u) {
        let d = users[u].debt;
        let n = users[u].user_name;
        let total = profit - d;
        if (total > 0) {
          data.push({
            key: "Please pay " + n + " $" + total.toFixed(2) + "\n"
          });
        }
        if (total < 0) {
          data.push({
            key: "Please charge " + n + " $" + (-1 * total).toFixed(2) + "\n"
          });
        }
      }
    }
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.block}>{item.key}</Text>}
      />
    );
  }

  getPayInText(winner, debt, profit) {
    let total = profit - debt;
    if (total === 0) {
      return this.getCheckText();
    }
    if (total > 0) {
      return (
        <Text style={styles.block}>
          {winner} should be paying you ${total.toFixed(2)} shortly
        </Text>
      );
    } else {
      return (
        <Text style={styles.block}>
          Please pay {winner} ${(-1 * total).toFixed(2)}
        </Text>
      );
    }
  }

  render() {
    let data = this.calculatePaymentInfo();
    return (
      <View style={styles.container}>
        <Icon name="trophy" type="material-community" color="#4dd796" size={60} containerStyle={{ marginBottom: 30, marginTop: 15 }} />
        <Text style={styles.title}>
            Your share of the <Text style={styles.green}>${data.pot}</Text> pot is <Text style={styles.green}>${data.profit}</Text> and your debt is <Text style={styles.green}>${data.users[data.userID].debt}</Text>
        </Text>
        <Text style={styles.break}>{"\n"}</Text>
        {this.getCashOutText(data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 25,
    paddingBottom: 40
  },
  title: {
    color: "#484848",
    fontSize: 20,
    textAlign: "center"
  },
  block: {
    color: "#484848",
    fontSize: 20,
    textAlign: "left"
  },
  break: {
    fontSize: 15
  },
  green: {
    fontWeight: "bold"
    //color: "#4dd796"
  }
});
