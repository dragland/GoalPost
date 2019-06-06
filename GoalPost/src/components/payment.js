import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import baseStyles from "../../styles/baseStyles";

export default class Payment extends Component {

  calculatePaymentInfo() {
    let userID = this.props.userID;
    let users = this.props.users;
    let logs = this.props.logs;
    let pot = this.props.pot;
    let num = Object.keys(logs).length
    let profit = pot/num;

    for (let i = 0; i < num; i++) {
      users[logs[i].userID].rank = i;
      users[logs[i].userID].debt = logs[i].debt;
    }
    return {userID, users, logs, pot, num, profit};
  }

  getCashOutText(data) {
    if ((data.num === 1) || (data.pot === 0)) {
      return this.getCheckText();
    }
    if (data.userID === data.logs[0].userID) {
      return this.getPayAllText(data.logs, data.users, data.profit);
    }
    else {
      return this.getPayInText(data.users[data.logs[0].userID].user_name, data.users[data.userID].debt, data.profit);
    }
  }

  getCheckText() {
    return <Text style={styles.block}>Congratulations on finishing your goal, you are all set!</Text>;
  }

  getPayAllText(logs, users, profit) {
    // let u = "832129823840667";
    let u = "2503986359645412";
    let s = "";
    let d = users[u].debt;
    let n = users[u].user_name;

    let total = profit - d;
    if (total > 0) {
      return <Text style={styles.block}>Please pay {n} ${total}.</Text>;
    }
    if (total < 0) {
      return <Text style={styles.block}>Please charge {n} ${-1*total}.</Text>;
    }
  }

  getPayInText(winner, debt, profit) {
    let total = profit - debt;
    if (total === 0) {
      return this.getCheckText();
    }
    if (total > 0) {
      return <Text style={styles.block}>{winner} should be paying you ${total} shortly.</Text>;
    }
    else {
      return <Text style={styles.block}>Please pay {winner} ${-1*total}.</Text>;
    }
  }

  render() {
    let data = this.calculatePaymentInfo();
    return (
      <View>
        <Text style={styles.title}><Text style={{ fontWeight: 'bold' }}>In order to receive your money, refer to the following instructions:</Text></Text>
        <Text style={styles.break}>{"\n"}</Text>
        {this.getCashOutText(data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: "#484848",
    fontSize: 30,
    textAlign: "center"
  },
  block: {
    color: "#484848",
    fontSize: 25,
    textAlign: "left"
  },
  break: {
    fontSize: 5,
  }
});