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
			event_times : [],
			user_logs : {user : []},
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
		
		/*
		get user
		for each pending_goals:
			if event_times[0] < now:
				rejectPendingGoal(userID, goalID)
		wait for updates
		for each active_goals:
			end = [-1].set
			if end_date < now:
				completeGoal()
		wait for updates
		return user
		*/


		// let end = new Date(eventTimes[eventTimes.length-1]);
		// data.end_date.setHours(24,0,0,0);


		// let now = new Date();
		// let promices = [];

		// user.pending_goals.forEach((g) => {
		// 	let goal = await this.getGoal(g);
		// 	let start = goal.event_times[0].toDate();
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
		// 	let end = goal.event_times[goal.event_times.length-1].toDate();
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
		if (!(userID in goal.user_logs)) {
			return null;
		}
		return goal;
	}

	async addGoal(userID, goalName, friends, eventTimes, penalty) {
		let goal = await this.createGoal(userID, goalName, friends, eventTimes, penalty);
		friends.forEach((f) => {
			this.inviteToGoal(f, goal.id);
		});
		return goal.id;
	}

	async checkInToTask(userID, goalID, present) { /*TODO */
		// let goal = await Cloud.getGoal(goalID);
		// let score = goal.user_score_map[userID] + goal.penalty;
		// let ret = this.goals.doc(goalID).update({
		// 	['user_score_map.' + userID]: score
		// });
		// return ret;
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
		// var start = new Date();
		// let event = new Date(start.getTime() + (24 * 60 * 60 * 1000));
		// let end = new Date(start.getTime() + (2* 24 * 60 * 60 * 1000));
		// var goalID = await this.addGoal("test", "debug goal", ["root"], [start, event, end], 5);
		// Alert.alert("created goal with ID: ", goalID);

		this.checkInToTask("root", "WxdZveziL4FKk7JAHW2k", true);
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
		var checkins = Array(eventTimes.length).fill(null);
		data.user_logs[userID] = checkins;
		friends.forEach((f) => {
			data.user_logs[f] = checkins;
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

const Cloud = new dataBase();
export default Cloud;