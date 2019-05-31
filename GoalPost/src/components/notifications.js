import Cloud from "./database";

class localNotificationManager {

  constructor() {
    this.PushNotification = require('react-native-push-notification');
    this.PushNotification.configure({
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
            // process the notification
        },
        popInitialNotification: true,
        requestPermissions: true,
    });
  }

  /*
    Function to schedule notifications on device for the events.
    Input:
      startDate: Date string of the start date/time
      endDate: Date string of the end date/time
      weekDays: List of ints in range [0,6] where 0 : Sunday, 1 : Monday, etc.
      time: Date string of the time for notifications
  */
  getEventTimes(startDate, endDate, weekDays, time) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    start.setHours(time.getHours(), time.getMinutes(), 0, 0);
    end.setHours(time.getHours(), time.getMinutes(), 0, 0);
    dates = [];
    for (let curr = new Date(start); curr <= end;) {
      if (
        (curr.toDateString() === start.toDateString()) 
        || weekDays.includes(curr.getDay()) 
        || (curr.toDateString() === end.toDateString())) {
        dates.push(new Date(curr));
      }
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  }

  // For users who create a goal or accept a pending goal.
  async scheduleNotifications(userName, goalID) {
    let goal = await Cloud.getGoal(goalID);
    let eventTimes = goal.event_times;
    let goalName = goal.goal_name;
    for (let ind = 0; ind < eventTimes.length; ind++) {
      let currDate = eventTimes[ind].toDate();
      this.PushNotification.localNotificationSchedule({
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        color: "#24a4ff",
        title: "Hi " + userName + ", make sure to check in!",
        message: "Did you make it to your event today for \"" + goalName + "\"?",
        playSound: false,
        actions: '["Yes", "No"]',
        date: currDate
      });
    }
  }
}

const NotificationManager = new localNotificationManager();
export default NotificationManager;