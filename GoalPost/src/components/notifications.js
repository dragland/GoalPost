

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
    Output:
      succeeded: Bool, true if succeeded, false if failed
  */
  scheduleNotifications(startDate, endDate, weekDays, time) {
    const hour = time.getHours();
    const mins = time.getMinutes();
    endDate = this.setTimeOfDay(endDate, 23, 59, 59, 999);

    var dates = [];
    for (var currDate = startDate; currDate <= endDate; ) {

      var day = currDate.getDay();
      if (weekDays.includes(day)) {
        currDate = this.setTimeOfDay(currDate, hour, mins, 0, 0);
            this.PushNotification.localNotificationSchedule({
              largeIcon: "ic_launcher",
              smallIcon: "ic_notification",
              color: "#24a4ff",
              title: "Hi user_name, make sure to check in!",
              message: "Did you make it to your event today for goal_name?",
              playSound: false,
              actions: '["Yes", "No"]',
              date: currDate
          });
        dates.push(currDate);
      }

      var nextDate = new Date();
      nextDate.setDate(currDate.getDate() + 1);
      currDate = nextDate;
    }

    return dates;
  }

  setTimeOfDay(date, hours, mins, secs, millis) {
    var output = new Date();
    output.setDate(date.getDate());
    output.setHours(hours);
    output.setMinutes(mins);
    output.setSeconds(secs);
    output.setMilliseconds(millis);
    return output;
  }
}

const NotificationManager = new localNotificationManager();
export default NotificationManager;
