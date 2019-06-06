import React, { Component } from "react";
import { View, FlatList, ScrollView, Text, StyleSheet } from "react-native";
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
      return this.getPayAllText(data.userID, data.logs, data.users, data.num, data.profit);
    }
    else {
      return this.getPayInText(data.users[data.logs[0].userID].user_name, data.users[data.userID].debt, data.profit);
    }
  }

  getCheckText() {
    return <Text style={styles.block}>Congratulations on finishing your goal, you are all set!</Text>;
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
          data.push({key: "Please pay "+n+" $"+total+".\n"});
        }
        if (total < 0) {
          data.push({key: "Please charge "+n+" $"+-1*total+".\n"});
        }
      }
    }
    return <FlatList
      data={data}
      renderItem={({item}) => <Text style={styles.block}>{item.key}</Text>}
    />
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