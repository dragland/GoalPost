import firebase from 'react-native-firebase';

class dataBase {
	constructor() {
		this.users = firebase.firestore().collection('users'); // map of userIDs to struct that has lists of different states of goalIDs
		this.goals = firebase.firestore().collection('goals'); // map of goalIDs to struct that defines their properties
	}

	getUser(userID) {
		/*CALLED WHEN USER LOGS IN*/
		// return map[userID]
	}

	addUser(userID) {
		/*CALLED WHEN USER LOGS IN*/

		// pend = []
		// act = []
		// if map[userID] != NULL {
		// 	pend = getPendingGoals(userID);
		// 	act = pend
		// 	pend = []
		// }

		// map[userID] = {
		// 	user_name = ""
		// 	profile_pic = ""
		// 	pending_goals = pend
		// 	active_goals = act
		// 	completed_goals = []
		// }
	}

	acceptPendingGoal(userID, goalID) {
		// map[userID.active_goals.add(goalID)
		// map[userID.pending_goals.remove(goalID)
	}

	rejectPendingGoal(userID, goalID) {
		// map[userID.pending_goals.remove(goalID)
	}

	addGoal(userID, friends, struct) {
		/*CALLED WHEN USER CREATES GOAL*/

		// act = fb.installedFriends(friends)
		// pend = friends - act
		// for f in pend {
		// 	map[userID.pending_goals.append(goalID)
		// }

		// map[goalID] = {
		// 	goal_name = ""
		// 	pending_users = pend
		// 	active_users= userID + act
		// 	duration = ""
		// 	task_times = ""
		// 	penalty = ""
		// 	reminders = ""
		// 	privacy = false
		// 	completed = false
		// }
		this.goals.add({
				goal_name: struct,
			});
		// return goalID??????
	}

	updateGoal(userID, goalID) {
		/*CALLED ONLY WHEN TASK EXPIRES*/

		// if last task {
		// 	map[userID.active_goals.remove(goalID)
		// 	map[userID.completed_goals.add(goalID)
		// }
	}

	getPendingGoals(userID) {
		// return [] = map[userID.pending_goals
	}

	getActiveGoals(userID) {
		// return [] = map[userID.active_goals
	}

	getCompletedGoals(userID) {
		// return [] = map[userID.completed_goals
	}
}

const Cloud = new dataBase();
export default Cloud;