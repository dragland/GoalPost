import firebase from 'react-native-firebase';
import FireStoreParser from 'firestore-parser';
import {Alert} from "react-native";

class dataBase {

	/* User database object

		db.users[userID] : {
			user_name : "",
			profile_pic : "",
			pending_goals : [],
			active_goals : [],
			completed_goals : []
		};
	*/

	/* Goal database object

		db.goals[goalID] : {
			goal_name : "",
			user_score_map : {users : scores},
			task_times : [],
			penalty : 0
		};
	*/

	/* Called once on initialization */
	constructor() {
		this.users = firebase.firestore().collection('users');
		this.goals = firebase.firestore().collection('goals');
	}

	/*
		**************************************************
		API for internal use within application
	*/
	async loginUser(userID, userName, userPic) {
		/* Called once user logs in after authenticating */
		let user = await this.checkIfUserExists(userID);
		if (!user.exists) {
			this.createUser(userID, userName, userPic);
		}
		else {
			this.updateUser(userID, userName, userPic);
		}
		//TODO return user
	}

	async loadUser(userID) {
		/* Called on every invocation of home screen in order to get user profile & list of goalIDs */
		let user = await this.getUser(userID);
		// let now = new Date();
		// let promices = [];

		// user.pending_goals.forEach((g) => {
		// 	let goal = await this.getGoal(g);
		// 	let start = goal.task_times[0].toDate();
		// 	if (start.getTime() < now.getTime()) {
		// 		let write_1 = await this.deletePendingGoal(userID, g)
		// 		let write_2 = await this.removeUserFromGoal(userID, g);
		// 		promices.push(write_1);
		// 		promices.push(write_2);
		// 	}
		// });

		// let update = await Promise.all(promices);
		// promices = [];
		// let user = await this.getUser(userID);

		// user.active_goals.forEach((g) => {
		// 	let goal = await this.getGoal(g);
		// 	let end = goal.task_times[goal.task_times.length-1].toDate();
		// 	if (end.getTime() < now.getTime()) {
		// 		let write = await this.completeGoal(userID, g);
		// 		promices.push(write);
		// 	}
		// });

		// let update = await Promise.all(promices);
		// let updated_user = await this.getUser(userID);
		// return updated_user;
		return user;
	}

	async loadGoal(userID, goalID) {
		/* Called on every invocation of active, pending, & completed screens */
		let goal = await this.getGoal(goalID);
		// let now = new Date();
		// let end = goal.task_times[goal.task_times.length-1].toDate();
		// if (end.getTime() < now.getTime()) {
		// 	let write = await this.completeGoal(userID, goalID);
		// 	let updated_goal = await this.getGoal(goalID);
		// 	return updated_goal;
		// }
		return goal;
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
		// TODO return promice
	}

	async acceptPendingGoal(userID, goalID) {
		this.activatePendingGoal(userID, goalID);
		this.deletePendingGoal(userID, goalID);
		// TODO return promice
	}

	async rejectPendingGoal(userID, goalID) {
		this.deletePendingGoal(userID, goalID);
		this.removeUserFromGoal(userID, goalID);
		// TODO return promice
	}

	async addGoal(userID, goalName, friends, taskTimes, penalty) {
		let goal = await this.createGoal(userID, goalName, friends, taskTimes, penalty);
		friends.forEach((f) => {
			this.inviteToGoal(f, goal.id);
		});
		return goal.id;
	}

	async test() {
		// let u = await this.loadUser("dragland");
		// Alert.alert(JSON.stringify(u.pending_goals));
	}

	/*
		**************************************************
		helper functions for above API
	*/
	async getUser(userID) {
		let doc = await this.users.doc(userID).get();
		return FireStoreParser(doc.data());
	}

	async getGoal(goalID) {
		let doc = await this.goals.doc(goalID).get();
		return FireStoreParser(doc.data());
	}

	async checkIfUserExists(userID) {
		let doc = await this.users.doc(userID).get();
		return doc;
	}

	async updateUser(userID, userName, userPic) {
		let data = {
			user_name : userName,
			profile_pic : userPic
		};
		this.users.doc(userID).set(data, {merge: true});
		// TODO return promice
	}

	async createUser(userID, userName, userPic) {
		let data = {
			user_name : userName,
			profile_pic : userPic,
			pending_goals : [],
			active_goals : [],
			completed_goals : []
		};
		this.users.doc(userID).set(data);
		// TODO return promice
	}

	async removeUserFromGoal(userID, goalID) {
		this.goals.doc(goalID).update({
			['user_score_map.' + userID]: firebase.firestore.FieldValue.delete()
		});
		// TODO return promice
	}

	async completeGoal(userID, goalID) {
		let write_1 = this.users.doc(userID).update({
			active_goals: firebase.firestore.FieldValue.arrayRemove(goalID)
		});
		let write_2 = this.users.doc(userID).update({
			completed_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
		});
		return Promise.all([write_1, write_2]);
	}

	async createGoal(userID, goalName, friends, taskTimes, penalty) {
		let data = {
			goal_name : goalName,
			user_score_map : {},
			task_times : taskTimes,
			penalty : penalty
		}
		data.user_score_map[userID] = 0;
		friends.forEach((f) => {
			data.user_score_map[f] = 0;
		});
		let doc = await this.goals.add(data);
		this.activatePendingGoal(userID, doc.id);
		return doc;
	}

	async inviteToGoal(userID, goalID) {
		let user = await this.checkIfUserExists(userID);
		if (!user.exists) {
			let new_user = await this.createUser(userID, "", "");
			this.users.doc(userID).update({
				pending_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
			});
		}
		else {
			this.users.doc(userID).update({
				pending_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
			});
		}
		// TODO return promice
	}

	async updateUserScore(userID, goalID) {
		let goal = await Cloud.getGoal(goalID);
		let score = goal.user_score_map[userID] + goal.penalty;
		this.goals.doc(goalID).update({
			['user_score_map.' + userID]: score
		});
		// TODO return promice
	}

	async activatePendingGoal(userID, goalID) {
		this.users.doc(userID).update({
			active_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
		});
		// TODO return promice
	}

	async deletePendingGoal(userID, goalID) {
		this.users.doc(userID).update({
			pending_goals: firebase.firestore.FieldValue.arrayRemove(goalID)
		});
		// TODO return promice
	}
}

const Cloud = new dataBase();
export default Cloud;