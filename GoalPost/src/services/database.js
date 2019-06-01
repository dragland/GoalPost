import firebase from 'react-native-firebase';
import FireStoreParser from 'firestore-parser';
import {Alert} from "react-native";

class dataBase {

	/* Called once on initialization */
	constructor() {
		this.users = firebase.firestore().collection('users');
		this.goals = firebase.firestore().collection('goals');
	}

	/*
		**************************************************
		API for internal use within application
	*/
	/* Called once user logs in after authenticating */
	async loginUser(userID, userName, userPic) {
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

	/* Called on every invocation of home screen in order to get user profile & lists of goalIDs */
	async loadUser(userID) {
		let user = await this.getUser(userID);
		promices = [];
		let now = new Date();

		for (let i in user.pending_goals) {
			let goalId = user.pending_goals[i];
			let goal = await this.getGoal(goalId);
			let start = goal.event_times[0].toDate();
			if (start.getTime() < now.getTime()) {
				let ret = this.rejectPendingGoal(userID, goalId);
				promices.push(ret);
			}
		}

		for (let i in user.active_goals) {
			let goalId = user.active_goals[i];
			let goal = await this.getGoal(goalId);
			let end = goal.event_times[goal.event_times.length-1].toDate();
			end.setHours(23,59,59,9999);
			if (end.getTime() < now.getTime()) {
				let ret = this.completeGoal(userID, goalId);
				promices.push(ret);
			}
		}

		await Promise.all(promices);
		let updated_user = await this.getUser(userID);
		return updated_user;
	}

	/* Called on every invocation of active, pending, & completed screens */
	async loadGoal(userID, goalID) {
		let goal = await this.getGoal(goalID);
		if (!(userID in goal.user_logs)) {
			return null;
		}
		return goal;
	}

	/* Called when creating a new goal, with the eventTimes being an array of date objects specifying each individual event that exists for the goal */
	async addGoal(userID, goalName, friends, eventTimes, penalty) {
		let goalID = await this.createGoal(userID, goalName, friends, eventTimes, penalty);
		friends.forEach((f) => {
			this.inviteToGoal(f, goalID);
		});
		return goalID;
	}

	/* Called only during window of specific event, and index of that event from eventTimes is passed down */
	async checkInToEvent(userID, goalID, eventIndex, present) {
		let goal = await this.getGoal(goalID);
		logs = goal.user_logs[userID];
		logs[eventIndex] = (present) ? 1 : 0;
		let ret = this.goals.doc(goalID).update({
			['user_logs.' + userID]: logs
		});
		return ret;
	}

	/* Called in order to synchronize goal and user objects when dealing with a new invited goal*/
	async acceptPendingGoal(userID, goalID) {
		let ret_1 = this.deletePendingGoal(userID, goalID);
		let ret_2 = this.activatePendingGoal(userID, goalID);
		return Promise.all([ret_1, ret_2]);
	}

	/* Called in order to synchronize goal and user objects when dealing with a new invited goal*/
	async rejectPendingGoal(userID, goalID) {
		let ret_1 = this.deletePendingGoal(userID, goalID);
		let ret_2 = this.removeFromGoal(userID, goalID);
		return Promise.all([ret_1, ret_2]);
	}

	/* Called when a list of all users is required*/
	async loadUserList() {
		let users = {};
		let docs = await this.users.get();
		docs.forEach((doc) => {
			users[doc.id] = FireStoreParser(doc.data()).user_name;
		});
		return users;
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

	async createGoal(userID, goalName, friends, eventTimes, penalty) {
		let data = {
			goal_name : goalName,
			event_times : eventTimes,
			user_logs : {},
			penalty : penalty
		}
		
		var logs = Array(eventTimes.length).fill(-1);
		data.user_logs[userID] = logs;

		friends.forEach((f) => {
			data.user_logs[f] = logs;
		});

		let doc = await this.goals.add(data);
		await this.activatePendingGoal(userID, doc.id);
		return doc.id;
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
			['user_logs.' + userID]: firebase.firestore.FieldValue.delete()
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

export const Cloud = new dataBase();