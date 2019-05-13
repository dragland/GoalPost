import React from "react";
import { Alert, SectionList, StyleSheet, View, Text } from "react-native";
import { Button } from 'react-native-elements';
import baseStyles from '../../styles/baseStyles';
import Cloud from "../components/database";

class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    userName: 'None',
    profilePic: 'None',
    active: [],
    completed: [],
    pending: [],
  };

  getGoalName = async (goalID) => {
    //Alert.alert(goalID);
    //let goal = await Cloud.loadGoal(goalID);
    //let goal_name = goal.goal_name;
    //return goal_name;
    return goalID;
  }

  componentWillMount() {
    const { navigation } = this.props;
    const userID = navigation.getParam('userID', 'root');
    // TODO change from getUser to loadUser, also set up navigation from login screen

    Cloud.getUser(userID).then((user) => { 
      this.setState({ 
        userName: user.user_name,
        profilePic: user.profile_pic,
        active: user.active_goals,
        completed: user.completed_goals,
        pending: user.pending_goals
      }); 
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={baseStyles.heading2}>Hi, {this.state.userName}!{'\n'}Here are your Goals</Text>
        <SectionList
          sections={[
            {title: 'Active Goals', data: this.state.active},
            {title: 'Pending Goals', data: this.state.pending},
            {title: 'Completed Goals', data: this.state.completed},
          ]}
          renderItem={({item}) => 
            <Button 
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.titleStyle}
              title={item} 
              type="clear"
              onPress={() => {}}
            />
          }
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />

        <Button
          title="open active goal"
          type="outline"
          raised
          onPress={() => this.props.navigation.navigate("ActiveGoal")}
        />
        <Button
          title="accept or reject a goal"
          type="outline"
          raised
          onPress={() => this.props.navigation.navigate("PendingGoal")}
        />
        <Button
          title="create a goal"
          type="outline"
          raised
          onPress={() => this.props.navigation.navigate("CreateGoal")}
        />
        <Button
          title="view completed goal"
          type="outline"
          raised
          onPress={() => this.props.navigation.navigate("CompleteGoal")}
        />
        <Button
          title="log out"
          type="outline"
          raised
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#EEE',
  },
  buttonStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    justifyContent: 'flex-start'
  },  
  titleStyle: {
    color: '#484848',
    textAlign: 'left'
  },
})

export default Home;
