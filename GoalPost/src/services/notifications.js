import { Cloud } from "./database";

class localNotificationManager {

  constructor() {
    this.PushNotification = require('react-native-push-notification');
    this.PushNotification.configure({
        onNotification: function(info) {
          if (info.action === "Yes") {
            Cloud.checkInToEvent(info.userID, info.goalID, info.eventIndex, true);
            this.cancelLocalNotifications({id: info.notificationId});
          }
          if (info.action === "No") {
            Cloud.checkInToEvent(info.userID, info.goalID, info.eventIndex, false);
            this.cancelLocalNotifications({id: info.notificationId});
          }
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
    for (let ind = 0; ind < eventTimes.length; ind++) {
      let currDate = eventTimes[ind].toDate();
      this.PushNotification.localNotificationSchedule({
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        color: "#24a4ff",
        title: "Hi " + userName.split(" ")[0] + ", make sure to check in!",
        message: "Did you make it to your event today for " + goalName + "?",
        playSound: false,
        actions: '["Yes", "No"]',
        userID: userID,
        goalID: goalID,
        eventIndex: ind,
        date: currDate
      });
    }
  }
}

export const NotificationManager = new localNotificationManager();
