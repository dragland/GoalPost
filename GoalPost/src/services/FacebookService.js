/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Cam Thouati | cameron8@stanford.edu
*/

import React from "react";
import FBSDK from "react-native-fbsdk";

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

class FacebookService {
  constructor() {
    this.requestManager = new GraphRequestManager();
  }

  makeLoginButton(callback) {
    return (
      <LoginButton
        readPermissions={["public_profile", "user_friends"]}
        onLoginFinished={(error, result) => {
          alert('finished login');
          if (error) {
            console.log(error);
          } else if (result.isCancelled) {
            console.log("result cancelled!!!");
          } else {
            callback();
            AccessToken.getCurrentAccessToken()
              .then(data => {
                callback(data.accessToken);
              })
              .catch(error => {
                console.log(error);
              });
          }
        }}
      />
    );
  }

  makeLogoutButton(style, callback) {
    return (
      <LoginButton
        style={style}
        onLogoutFinished={() => {
          callback();
        }}
      />
    );
  }

  async fetchProfile(callback) {
    return new Promise((resolve, reject) => {
      const request = new GraphRequest("/me", null, (error, result) => {
        if (result) {
          const profile = result;
          profile.avatar =
            "https://graph.facebook.com/" + result.id + "/picture";
          resolve(profile);
        } else {
          reject(error);
        }
      });
      this.requestManager.addRequest(request).start();
    });
  }
}

export const facebookService = new FacebookService();
