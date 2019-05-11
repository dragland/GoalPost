import firebase from 'react-native-firebase';

class dataBase {

	/* Called one on initialization */
	constructor() {
		this.users = firebase.firestore().collection('users'); // map of userIDs to struct that has lists of different states of goalIDs
		this.goals = firebase.firestore().collection('goals'); // map of goalIDs to struct that defines their properties
	}


	/*
		**************************************************
		API for internal use within application 
	*/
	loginUser(userID, profile) {
		// /* Called once user logs in */
		// if (checkIfUserExists(userID)) {
		// 	user = getUser(userID);
		// 	updateUser(userID, profile, user.pending_goals, user.active_goals, user.completed_goals);
		// }
		// else {
		// 	createUser(userID, profile);
		// }
	}

	loadUser(userID) {
		// /* Called on every invocation of home screen in order to get user profile & list of goalIDs*/
		// user = getUser(userID);
		// for (g in user.pending_goals) {
		// 	if (getGoal(g).task_times[0] < now) {
		// 		deletePendingGoal(userID, g)
		// 		removeUserFromGoal(userID, g);
		// 	}
		// }
		// for (g in user.active_goals) {
		// 	if (getGoal(g).end_date < now) {
		// 		completeGoal(userID, g);
		// 	}
		// }
		// return getUser(userID);
	}

	loadGoal(userID, goalID) {
		// /* Called on every invocation of active, pending, & completed screens */
		// goal = getGoal(goalID);
		// if (goal.end_date < now) {
		// 	completeGoal(userID, g);
		// }
		// return goal;
	}

	checkInToTask(userID, goalID, present) {
		// /* Called on every invocation of a task check-in, and returns true if that was the last check-in */
		// completed = false;
		// if (present) {
		// 	updateUserScore(userID, goalID);
		// }
		// goal = getGoal(goalID);
		// if (goal.task_times[-1] <= now) {
		// 	completed = true;
		// 	completeGoal(userID, goalID)
		// }
		// return completed;
	}  

	acceptPendingGoal(userID, goalID) {
		// activatePendingGoal(userID, goalID);
		// deletePendingGoal(userID, goalID);
	}

	rejectPendingGoal(userID, goalID) {
		// deletePendingGoal(userID, goalID);
		// removeUserFromGoal(userID, goalID);
	}

	addGoal(userID, friends, struct) {
		// goalID = createGoal(struct);
		// for (f in friends) {
		// 	inviteToGoal(f, goalID);
		// }
		// return goalID;

		this.goals.add({
				goal_name: struct,
			});
	}

	/* 
		**************************************************
		helper functions for above API 
	*/
	getUser(userID) {
		// return db.users[userID] : {
		// 	user_name = "",
		// 	profile_pic = "",
		// 	pending_goals = [],
		// 	active_goals = [],
		// 	completed_goals = []
		// };
	}

	getGoal(goalID) {
		// return db.goals[goalID] : {
		// 	goal_name = "",
		// 	user_score_map = {users : scores},
		// 	end_date = "",
		// 	task_times = "",
		// 	penalty = "",
		// 	reminders = "",
		// 	privacy = false,
		// };
	}

	checkIfUserExists(userID) {
		// return db.users[userID] != NULL;
	}

	updateUser(userID, profile, pending_goals, active_goals, completed_goals) {
		// db.users[userID].set()
	}

	createUser(userID, profile) {
		// db.users[userID].add()
	}

	removeUserFromGoal(userID, goalID) {
		// db.goals[goalID].user_score_map.remove(userID);
	}

	completeGoal(userID, goalID) {
		// db.users[userID].active_goals.remove(goalID);
		// db.users[userID].completed_goals.add(goalID);
	}

	createGoal(struct) {
		// return db.goals.add()
	}

	inviteToGoal(userID, goalID) {
		// db.users[userID].pending_goals.add(GoalID);
	}

	updateUserScore(userID, goalID) {
		// db.goals[goalID].user_score_map[userID] += db.goals[goalID].penalty;
	}

	activatePendingGoal(userID, goalID) {
		// db.users[userID].active_goals.add(goalID);
	}

	deletePendingGoal(userID, goalID) {
		// db.users[userID].pending_goals.remove(goalID);
	}
}

const Cloud = new dataBase();
export default Cloud;