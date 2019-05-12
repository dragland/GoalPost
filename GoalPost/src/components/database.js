import firebase from 'react-native-firebase';
import FireStoreParser from 'firestore-parser';
import {Alert} from "react-native";

class dataBase {

	/* User database object

		db.users[userID] : {
			user_name = "",
			profile_pic = "",
			pending_goals = [],
			active_goals = [],
			completed_goals = []
		};
	*/

	/* Goal database object

		db.goals[goalID] : {
			goal_name = "",
			user_score_map = {users : scores},
			end_date = "",
			task_times = "",
			penalty = "",
			privacy = false,
		};
	*/

	/* Called one on initialization */
	constructor() {
		this.users = firebase.firestore().collection('users');
		this.goals = firebase.firestore().collection('goals');
	}

	/*
		********************************************************************************
		API for internal use within application 
	*/
	async loginUser(userID, profile) {
		// /* Called once user logs in */
		// if (checkIfUserExists(userID)) {
		// 	user = getUser(userID);
		// 	updateUser(userID, profile, user.pending_goals, user.active_goals, user.completed_goals);
		// }
		// else {
		// 	createUser(userID, profile);
		// }
	}

	async loadUser(userID) {
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

	async loadGoal(userID, goalID) {
		// /* Called on every invocation of active, pending, & completed screens */
		// goal = getGoal(goalID);
		// if (goal.end_date < now) {
		// 	completeGoal(userID, g);
		// }
		// return goal;
	}

	async checkInToTask(userID, goalID, present) {
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

	async acceptPendingGoal(userID, goalID) {
		// activatePendingGoal(userID, goalID);
		// deletePendingGoal(userID, goalID);
	}

	async rejectPendingGoal(userID, goalID) {
		// deletePendingGoal(userID, goalID);
		// removeUserFromGoal(userID, goalID);
	}

	async addGoal(userID, friends, struct) {
		// goalID = createGoal(struct);
		// for (f in friends) {
		// 	inviteToGoal(f, goalID);
		// }
		// return goalID;

		this.goals.add({
				goal_name: struct,
			});
	}

	async test() {
		let data = await this.getUser("root");
		Alert.alert(data.user_name);
		// Alert.alert(data.profile_pic);
		// Alert.alert(JSON.stringify(data.pending_goals));
		// Alert.alert(JSON.stringify(data.active_goals));
		// Alert.alert(JSON.stringify(data.completed_goals));
	}

	/* 
		********************************************************************************
		helper functions for above API 
	*/
	async getUser(userID) {
    	let doc = await this.users.doc(userID).get();
    	return FireStoreParser(doc.data());
	}

	getGoal(goalID) {
		// return db.goals[goalID];
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