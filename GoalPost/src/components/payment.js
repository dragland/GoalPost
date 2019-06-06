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
    return {userID, users, logs, pot, num, profit}
  }

  getCashOutText(data) {
    if (data.num === 1) {
      return this.getCheckText();
    }
    // if (rank = 0) {
    //    return this.getPayAllText();
    // }
    // else {
    //   return this.getPayInText(winner, debt, profit);
    // }
  }

  getCheckText() {
    return <Text style={styles.block}>Congratulations on finishing your goal, you are all set!</Text>;
  }

  getPayAllText() {
    // for each user:
    //   request debt
    //   pay profit
    return <Text>getPayAllText()</Text>;
  }

  getPayInText(winner, debt, profit) {
    if (debt > 0) {
      // return <Text>Please pay {winner} {debt}.</Text>;
      // add
    }
    if (pot > 0) {
      // return <Text>{winner} should be paying you {profit} shortly.</Text>;
      // add
    }
    return "idk bro";
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