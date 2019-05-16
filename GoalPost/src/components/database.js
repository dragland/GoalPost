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
			event_times : [date],
			user_logs : {user : [bool]},
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

	async loadUser(userID) {
		/* Called on every invocation of home screen in order to get user profile & lists of goalIDs */
		// let user = await this.getUser(userID);
		// promices = [];
		// let now = new Date();

		// for (let g in user.pending_goals) {
		// 	let goal = await this.getGoal(g);
		// 	let start = goal.event_times[0].toDate();
		// 	if (start.getTime() < now.getTime()) {
		// 		let ret = this.rejectPendingGoal(userID, g);
		// 		promices.push(ret);
		// 	}
			
		// }

		// for (let g in user.active_goals) {
		// 	let goal = await this.getGoal(g);
		// 	let end = goal.event_times[goal.event_times.length-1].toDate();
		// 	end.setHours(24,0,0,0);
		// 	if (end.getTime() < now.getTime()) {
		// 		let ret = this.completeGoal(userID, g);
		// 		promices.push(ret);
		// 	}
		// }

		// await Promise.all(promices);
		let updated_user = await this.getUser(userID);
		return updated_user;
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
		let goalID = await this.createGoal(userID, goalName, friends, eventTimes, penalty);
		friends.forEach((f) => {
			this.inviteToGoal(f, goalID);
		});
		return goalID;
	}

	async checkInToEvent(userID, goalID, eventIndex, present) {
		let goal = await this.getGoal(goalID);
		logs = goal.user_logs[userID];
		logs[eventIndex] = (present) ? 1 : 0;
		let ret = this.goals.doc(goalID).update({
			['user_logs.' + userID]: logs
		});
		return ret;
	}

	async acceptPendingGoal(userID, goalID) {
		let ret_1 = this.deletePendingGoal(userID, goalID);
		let ret_2 = this.activatePendingGoal(userID, goalID);
		return Promise.all([ret_1, ret_2]);
	}

	async rejectPendingGoal(userID, goalID) {
		let ret_1 = this.deletePendingGoal(userID, goalID);
		let ret_2 = this.removeFromGoal(userID, goalID);
		return Promise.all([ret_1, ret_2]);
	}

	async test() {
		/* Initialize default users */
		// this.loginUser("davy", "Davy Ragland", "https://profile.com/pic.jpg");
		// this.loginUser("cherry", "Cherry Zou", "https://profile.com/pic.jpg");
		// this.loginUser("jesus", "Jesus Cervantes", "https://profile.com/pic.jpg");
		// this.loginUser("cam", "Cam Thouati", "https://profile.com/pic.jpg");

		/* Initialize default goals */
		// let now = new Date();
		// let start = new Date(now.getTime() + (2* 24 * 60 * 60 * 1000));
		// let event_1 = new Date(now.getTime() + (3* 24 * 60 * 60 * 1000));
		// let event_2 = new Date(now.getTime() + (4* 24 * 60 * 60 * 1000));
		// let end = new Date(now.getTime() + (5* 24 * 60 * 60 * 1000));
		// let eventTimes = [start, event_1, event_2, end];

		// this.addGoal("davy", "Davy's Goal #1", ["cherry", "jesus", "cam"], eventTimes, 5);
		// this.addGoal("cherry", "Cherry's Goal #1", ["davy", "jesus", "cam"], eventTimes, 5);
		// this.addGoal("cherry", "Cherry's Goal #2", ["davy", "jesus", "cam"], eventTimes, 5);

		/* Initialize default conditions*/
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

const Cloud = new dataBase();
export default Cloud;