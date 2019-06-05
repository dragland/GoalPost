import React, { Component } from "react";
import { FlatList, ScrollView, View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import baseStyles from "../../styles/baseStyles";
import { NavigationEvents } from "react-navigation";
import { Cloud } from "../services/database";

export default class Leaderboard extends Component {
  state = {
    data: []
  }

  async populateUsers() {
    const usersMap = await Cloud.loadUsersMap('this_text_doesnt_matter?');
    data = this.props.users.map(({ userID, progress, debt }) => {
      const { user_name, profile_pic } =  usersMap[userID];
      return { 
        key : userID,
        user_name : user_name,
        profile_pic : profile_pic,
        progress : progress, 
        debt : debt,
      };
    });
    this.setState({ data: data });
  }

  renderItem = ({ item, index }) => {
    var avatar = <Avatar size="medium" rounded />;
    if (item.profile_pic.length > 0) {
      avatar = <Avatar size="medium" rounded source={{ uri: item.profile_pic }} />;
    }
    return(
      <View style={styles.boardEntry}>
        <Text style={baseStyles.heading2}>#{index + 1}</Text>
        { avatar }
        <View style={[styles.progressBox, { width: Math.round(item.progress) }]} />
        <Text style={baseStyles.text}> -${item.debt}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.mainContainer, { flex: this.props.flex || 0.55 }]}>
        <NavigationEvents onDidFocus={() => this.populateUsers()} />
        <Text style={baseStyles.text}>
          <Text style={{ fontWeight: "bold" }}>CURRENT LEADERBOARD</Text>
        </Text>
        <ScrollView>
          <FlatList 
            data={this.state.data} 
            renderItem={this.renderItem} 
          />
        </ScrollView>
      </View>
    );
    /*
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
            source={{uri: "https://graph.facebook.com/2285281658220754/picture"}}
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
    */
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
    marginLeft: 10,
    marginRight: 15,
    borderRadius: 20
  },
});
