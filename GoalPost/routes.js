import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from "./src/screens/home";
import CreateGoal from "./src/screens/createGoal";
const Project= createStackNavigator({
  Home: {
   screen: Home
  },
  CreateGoal: {
   screen: CreateGoal
  }
});
export default createAppContainer(Project);