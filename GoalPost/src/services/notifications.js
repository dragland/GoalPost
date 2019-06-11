/*
  Stanford University
  CS194W | GoalPost | Spring 2019

  Jesus Cervantes | cerjesus@stanford.edu
  Davy Ragland | dragland@stanford.edu
*/

import { Cloud } from "./database";

class localNotificationManager {

  constructor() {
    this.PushNotification = require('react-native-push-notification');
    this.PushNotification.configure({
        onNotification: function(notification) {
          console.log(notification);
        },
        popInitialNotification: true,
        requestPermissions: true,
    });
  }

  // For users who create a goal or accept a pending goal.
  async scheduleNotifications(userID, userName, goalID) {
    let goal = await Cloud.loadGoal(userID, goalID);
    let eventTimes = goal.event_times;
    let goalName = goal.goal_name;

    for (let i = 0; i < eventTimes.length; i++) {
      let currDate = eventTimes[i].toDate();
      let title = "Hi " + userName.split(" ")[0] + ", make sure to check in!";
      let message = "Did you make it to your event today for " + goalName + "?";
      if (i == 0) {
        title = "Your goal " + goalName + ", has just begun!";
        message = "Start off strong and remember to check in today!";
      }
      this.PushNotification.localNotificationSchedule({
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        color: "#4DD796",
        title: title,
        message: message,
        playSound: false,
        userID: userID,
        goalID: goalID,
        eventIndex: i,
        date: currDate
      });
    }
    let end = goal.event_times[goal.event_times.length-1].toDate();
    end.setHours(23,59,59,9999);
    title = goalName + " has just ended!";
    message = "Open the app to see how you did and see your earnings!"
    this.PushNotification.localNotificationSchedule({
      largeIcon: "ic_launcher",
      smallIcon: "ic_notification",
      color: "#4DD796",
      title: title,
      message: message,
      playSound: false,
      userID: userID,
      goalID: goalID,
      date: end
    });
  }
}

export const NotificationManager = new localNotificationManager();
