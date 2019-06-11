/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Davy Ragland | dragland@stanford.edu
  Cherry Zou | cherryz@stanford.edu
*/

import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import CreateGoal from "./src/screens/createGoal";
import PendingGoal from "./src/screens/pendingGoal";
import ActiveGoal from "./src/screens/activeGoal";
import CompleteGoal from "./src/screens/completeGoal";

const Project = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    CreateGoal: {
      screen: CreateGoal
    },
    PendingGoal: {
      screen: PendingGoal
    },
    ActiveGoal: {
      screen: ActiveGoal
    },
    CompleteGoal: {
      screen: CompleteGoal
    }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
export default createAppContainer(Project);