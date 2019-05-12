import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import ActiveGoal from "./src/screens/activeGoal";
import CreateGoal from "./src/screens/createGoal";
import Completion from "./src/screens/completeGoal";
const Project= createStackNavigator({
  Login: {
        screen: Login
  },
  Home: {
        screen: Home
  },
  ActiveGoal: {
  	screen: ActiveGoal
  },
  CreateGoal: {
  	screen: CreateGoal
  },
  Completion: {
  	screen: Completion
  }
});
export default createAppContainer(Project);
