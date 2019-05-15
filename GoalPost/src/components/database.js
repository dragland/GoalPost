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
		if (user.exists) {
			let ret = this.updateUser(userID, userName, userPic);
			return ret;
		}
		else {
			let ret = this.createUser(userID, userName, userPic);
			return ret;
		}
	}

	async loadUser(userID) {/* TODO */
		/* Called on every invocation of home screen in order to get user profile & lists of goalIDs */
		let user = await this.getUser(userID);
		// let now = new Date();
		// let promices = [];

		// user.pending_goals.forEach((g) => {
		// 	let goal = await this.getGoal(g);
		// 	let start = goal.task_times[0].toDate();
		// 	if (start.getTime() < now.getTime()) {
		// 		let write_1 = await this.deletePendingGoal(userID, g)
		// 		let write_2 = await this.removeFromGoal(userID, g);
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
		if (!(userID in goal.user_score_map)) {
			return null;
		}
		return goal;
	}

	async addGoal(userID, goalName, friends, taskTimes, penalty) {/* TODO */
		let goal = await this.createGoal(userID, goalName, friends, taskTimes, penalty);
		friends.forEach((f) => {
			await this.inviteToGoal(f, goal.id);
		});
		return goal.id;
	}

	async checkInToTask(userID, goalID, present) {/* TODO */
		// /* Called on every invocation of a task check-in, and returns true if that was the last check-in */
		// completed = false;
		// if (present) {
		// 	await updateUserScore(userID, goalID);
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
		let ret_1 = this.activatePendingGoal(userID, goalID);
		let ret_2 = this.deletePendingGoal(userID, goalID);
		return Promise.all([ret_1, ret_2]);
	}

	async rejectPendingGoal(userID, goalID) {
		let ret_1 = this.deletePendingGoal(userID, goalID);
		let ret_2 = this.removeFromGoal(userID, goalID);
		return Promise.all([ret_1, ret_2]);
	}

	async test() {
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
		let doc = this.users.doc(userID).get();
		return doc;
	}

	async createUser(userID, userName, userPic) {
		let data = {
			user_name : userName,
			profile_pic : userPic,
			pending_goals : [],
			active_goals : [],
			completed_goals : []
		};
		let ret = this.users.doc(userID).set(data);
		return ret;
	}

	async updateUser(userID, userName, userPic) {
		let data = {
			user_name : userName,
			profile_pic : userPic
		};
		let ret = this.users.doc(userID).set(data, {merge: true});
		return ret;
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
		await this.activatePendingGoal(userID, doc.id);
		return doc;
	}

	async inviteToGoal(userID, goalID) {
		let user = await this.checkIfUserExists(userID);
		if (user.exists) {
			let ret = this.users.doc(userID).update({
				pending_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
			});
			return ret;
		}
		else {
			let new_user = await this.createUser(userID, "", "");
			let ret = this.users.doc(userID).update({
				pending_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
			});
			return ret;
		}
	}

	async removeFromGoal(userID, goalID) {
		let ret = this.goals.doc(goalID).update({
			['user_score_map.' + userID]: firebase.firestore.FieldValue.delete()
		});
		return ret;
	}

	async updateUserScore(userID, goalID) {
		let goal = await Cloud.getGoal(goalID);
		let score = goal.user_score_map[userID] + goal.penalty;
		let ret = this.goals.doc(goalID).update({
			['user_score_map.' + userID]: score
		});
		return ret;
	}

	async completeGoal(userID, goalID) {
		let ret_1 = this.users.doc(userID).update({
			active_goals: firebase.firestore.FieldValue.arrayRemove(goalID)
		});
		let ret_2 = this.users.doc(userID).update({
			completed_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
		});
		return Promise.all([ret_1, ret_2]);
	}

	async activatePendingGoal(userID, goalID) {
		let ret = this.users.doc(userID).update({
			active_goals: firebase.firestore.FieldValue.arrayUnion(goalID)
		});
		return ret;
	}

	async deletePendingGoal(userID, goalID) {
		let ret = this.users.doc(userID).update({
			pending_goals: firebase.firestore.FieldValue.arrayRemove(goalID)
		});
		return ret;
	}
}

const Cloud = new dataBase();
export default Cloud;