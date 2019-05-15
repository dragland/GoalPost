import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import ActiveGoal from "./src/screens/activeGoal";
import CreateGoal from "./src/screens/createGoal";
import PendingGoal from "./src/screens/pendingGoal";
import CompleteGoal from "./src/screens/completeGoal";

const Project = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Home: {
      screen: Home
    },
    ActiveGoal: {
      screen: ActiveGoal
    },
    PendingGoal: {
      screen: PendingGoal
    },
    CreateGoal: {
      screen: CreateGoal
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
