import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from "./src/screens/home";
import ActiveGoal from "./src/screens/activeGoal";
import CreateGoal from "./src/screens/createGoal";
import Completion from "./src/screens/completion";
const Project= createStackNavigator({
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
