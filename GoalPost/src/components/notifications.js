class localNotificationManager {
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
