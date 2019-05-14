

class localNotificationManager {

  /* Called once on initialization */
  constructor() {
    // this.PushNotification = require('react-native-push-notification');
    // this.PushNotification.configure({
    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification: function(notification) {
    //     console.log( 'NOTIFICATION:', notification );
    //     // process the notification
    //   },
    //   // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    //   senderID: "YOUR GCM (OR FCM) SENDER ID", //Don't need for local notifications
    // });
  }


  /*
		**************************************************
		API for internal use within application
	*/

  scheduleNotifications(startDate,endDate,weekDays) {
    /*
      Function to schedule notifications on device for the events.
      Input:
        startDate: Date string of the start date/time
        endDate: Date string of the end date/time
        weekDays: List of ints in range [0,6] where 0 : Sunday, 1 : Monday, etc.
      Output:
        succeeded: Bool, true if succeeded, false if failed
    */
    var dates = [];
    for (i = 0; i < weekDays.length; i++) {
      var curDayDate = this.dateOfNextDay(startDate,weekDays[i]);
      while (curDayDate.parse() < endDate.parse()) {
        //Set Notification for date
        // this.PushNotification.localNotificationSchedule({
        //   //... You can use all the options from localNotifications
        //   message: "My Notification Message", // (required)
        //   date: curDayDate // new Date(Date.now() + (10 * 1000)) // in 10 sec
        // });
        curDayDate.setDate(curDayDate.getDate() + 7); //go to the next week
        dates.push(curDayDate);
      }
    }
    return dates;
  }

  /*
		**************************************************
		helper functions for above API
	*/

  //Take as input the Date object of start date and a day of the week (int in set [0,6])
  //Return Date object of the next date of that day
  dateOfNextDay(startDate,day) {
    var currentDay = startDate.getDay();
    var offset = 0;
    if (currentDay > day) {
      offset = day - currentDay + 7;
    } else if (currentDay < day) {
      offset = day - currentDay;
    }
    var newDate = new Date(startDate.parse());
    newDate.setDate(newDate.getDate() + offset);
    return newDate;

  }

}

const NotificationManager = new localNotificationManager();
export default NotificationManager;
