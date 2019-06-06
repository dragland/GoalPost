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
      this.PushNotification.localNotificationSchedule({
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        color: "#4DD798",
        title: "Hi " + userName.split(" ")[0] + ", make sure to check in!",
        message: "Did you make it to your event today for " + goalName + "?",
        playSound: false,
        userID: userID,
        goalID: goalID,
        eventIndex: i,
        date: currDate
      });
    }
  }
}

export const NotificationManager = new localNotificationManager();