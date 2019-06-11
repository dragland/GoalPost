/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Davy Ragland | dragland@stanford.edu
  Cherry Zou | cherryz@stanford.edu
  Cam Thouati | cameron8@stanford.edu
*/

import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from "react-native-fbsdk";
import { NavigationEvents } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import baseStyles from "../../styles/baseStyles";
import StandardButton from "../components/standardButton";
import CenterImage from "../components/centerImage";
import Tutorial from "../components/tutorial";

import { Cloud } from "../services/database";
import { facebookService } from "../services/FacebookService";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  state = {
    loggedIn: false,
    isModalVisible: false,
    spinner: true,
  };

  startTimer = () => {
    this.interval = setInterval(this.login, 100);
  }

  callNav = (profile) => {
    clearInterval(this.interval);
    this.props.navigation.navigate("Home", { userID: profile.id });
    this.setState({spinner: false});
  }

  login = async () => {
    const token = await AccessToken.getCurrentAccessToken();
    if (token) {
      this.setState({spinner: true});
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
    else {
      this.setState({spinner: false});
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    if (this.state.spinner) {
      return (
        <View style={styles.screen}>
          <NavigationEvents onDidFocus={this.startTimer} />
          <Spinner visible textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        </View>
      );
    }
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
              color
            />
            <Modal 
              propagateSwipe
              isVisible={this.state.isModalVisible}
              onBackButtonPress={this.toggleModal}
              onBackdropPress={this.toggleModal}
            >
              <View style={styles.modalView}>
                <Tutorial />
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