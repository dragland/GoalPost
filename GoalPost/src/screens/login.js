/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Davy Ragland | dragland@stanford.edu
  Cherry Zou | cherryz@stanford.edu
  Cam Thouati | cameron8@stanford.edu
*/

import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { AccessToken, GraphRequest, GraphRequestManager, LoginButton } from "react-native-fbsdk";
import { NavigationEvents } from "react-navigation";
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal";

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
    this.interval = setInterval(this.login, 200);
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

  makeButton = title => {
    title = "  " + title.toUpperCase() + "  ";
    return (
      <Button
        title={title}
        titleStyle={{ 
          color: "#FFF",
          fontSize: 20,
          letterSpacing: 1
        }}
        buttonStyle={{
          borderColor: "#FFF",
          borderWidth: 2,
          borderRadius: 25
        }}
        containerStyle={{ width: 180 }}
        onPress={this.toggleModal}
        type="clear"
      />
    );
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
        <View style={styles.titleBox}>
          <Text style={styles.title}>Welcome to GoalPost!</Text>
        </View>
        <View style={styles.buttonBox}>
          {this.makeButton("User Guide")}
        </View>
            <Modal 
              propagateSwipe
              isVisible={this.state.isModalVisible}
              onBackButtonPress={this.toggleModal}
              onBackdropPress={this.toggleModal}
            >
              <View style={styles.modalView}>
                <Tutorial />
                <Button title="Got it" titleStyle={{ fontSize: 18 }} containerStyle={{ height: 60, justifyContent: "center" }} onPress={this.toggleModal} type='clear' />
              </View>
            </Modal>
        <View style={styles.fbButtonBox}>
          <LoginButton style={styles.fbButton} readPermissions={["public_profile"]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleBox: {
    flex: 1, // 0.57
    backgroundColor: "#4dd796",
    paddingTop: 200,
    paddingHorizontal: 30
  },
  title: {
    color: "#FFF",
    fontSize: 60,
    fontWeight: "400",
    textAlign: "left",
  },
  buttonBox: {
    top: "67%", // "57%",
    alignItems: "flex-start",
    paddingLeft: 30,
    position: "absolute",
    zIndex: 100
  },
  fbButtonBox: {
    top: "58%",
    left: "0%",
    borderColor: "#FFF",
    borderWidth: 1.3,
    borderRadius: 25,
    
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: 85,
    paddingLeft: 15,
    paddingVertical: 1,

    transform: [
      { scaleY: 1.5 },
      { scaleX: 1.5 },
    ],
    zIndex: 100
  },
  fbButton: {
    height: 30, // 50,
    width: 190, //280,
    backgroundColor: "transparent",
  },
  modalView: {
    flex: 0.7,
    backgroundColor: '#FFF',
    borderRadius: 10,
  }
});
