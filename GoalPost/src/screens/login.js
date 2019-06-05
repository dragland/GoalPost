import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from "react-native-fbsdk";
import { NavigationEvents } from "react-navigation";
import baseStyles from "../../styles/baseStyles";
import StandardButton from "../components/standardButton";
import CenterImage from "../components/centerImage";

import { Cloud } from "../services/database";
import { facebookService } from "../services/FacebookService";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    loggedIn: false,
    isModalVisible: false
  };

  startTimer = () => {
    this.interval = setInterval(this.login, 100);
  }

  callNav = (profile) => {
    clearInterval(this.interval);
    this.props.navigation.navigate("Home", { userID: profile.id });
  }

  login = async () => {
    const token = await AccessToken.getCurrentAccessToken();
    if (token) {
      // let result = await facebookService.fetchProfile();
      const infoRequest = new GraphRequest('/me', null, async (error, result) => {
        if (error) {
          alert(error);
        } else {
          const r = await Cloud.loginUser(result.id, result.name, "https://graph.facebook.com/" + result.id + "/picture");
          this.callNav(result);
        }
      });
      new GraphRequestManager().addRequest(infoRequest).start();
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View style={baseStyles.flatScreen}>
        <NavigationEvents onDidFocus={this.startTimer} />
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: "center", alignItems: 'center' }} >
            <Text style={baseStyles.heading}>
              Welcome to GoalPost!
            </Text>
            <CenterImage
              flex={1}
              image={require("../../res/logo.png")}
            />
            <StandardButton
              title="User Guide"
              containerStyle={{
                alignSelf: "center",
                width: 150,
                marginTop: 20,
                marginHorizontal: 15
              }}
              onPress={this.toggleModal}
              orange
            />
            <Modal
              isVisible={this.state.isModalVisible}
              onBackButtonPress={this.toggleModal}
              onBackdropPress={this.toggleModal}
            >
              <View style={styles.modalView}>
                <Text style={baseStyles.text}>
                  <Text style={{ fontWeight: 'bold' }}>
                    GoalPost is a social app that incentivizes users to help reach their goals through collaborative dynamics and friendly competition.
                  </Text>
                </Text>
                <Text style={baseStyles.text}>
                  For example, if a group of friends wanted to go to the gym every week until summer and hold each other accountable, they would be able to configure this goal through our app and also invite their friends. Then, at each event during the goal, users would check in using the app, facilitating group accountability. As an extra incentive, when a user fails to check in, they will get charged a penalty which goes into a central pot. At the end of the goal, the pot gets split evenly, incentivizing users to maximize their goal completion through fostering a culture of collaborative competition.
                </Text>
                <Button title="Got it" onPress={this.toggleModal} />
              </View>
            </Modal>
          </View>
          <View style={styles.container}>
            <LoginButton readPermissions={["public_profile"]} />
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 0.7,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10
  }
});