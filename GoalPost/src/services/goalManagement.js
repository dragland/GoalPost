import {Alert} from "react-native";
import { Cloud } from "./database";

class goalManager {
	constructor() {
	}

	async getGoalNames(userID, list) {
		var goalList = list.map(async goalID => {
			const goal = await Cloud.loadGoal(userID, goalID);
			const goal_name = goal.goal_name;

			var num_completed_tasks = 0;
			const arr = goal.user_logs[userID]
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == 1) {
					num_completed_tasks++;
				}
			}
			return { goalID: goalID, goalName: goal_name, numTasks: num_completed_tasks };
		});

		var output = await Promise.all(goalList);
		return output.reverse();
	};

	getEventTimes(startDate, endDate, weekDays, time) {
		let start = new Date(startDate);
		let end = new Date(endDate);
		start.setHours(time.getHours(), time.getMinutes(), 0, 0);
		end.setHours(time.getHours(), time.getMinutes(), 0, 0);
		let dates = [];
		for (let curr = new Date(start); curr <= end;) {
			if ((curr.toDateString() === start.toDateString()) 
			|| weekDays.includes(curr.getDay()) 
			|| (curr.toDateString() === end.toDateString())) {
				dates.push(new Date(curr));
			}
			curr.setDate(curr.getDate() + 1);
		}
		return dates;
	}

	async getEventIndex(userID, goalID) {
		const goal = await Cloud.loadGoal(userID, goalID);
		const event_times = goal.event_times;

		var eventIndex = -1;
		const today = new Date();
		for (var i = 0; i < event_times.length; i++) {
			const date = event_times[i].toDate(); // time at which event opens for check in
			var midnight = new Date(date.getTime());
			midnight.setHours(23,59,59,9999);

			if (today >= date && today <= midnight) {
				eventIndex = i;
				break; // found proper date
			}
		}

		const user_logs = goal.user_logs[userID];
		const disable = eventIndex == -1 || user_logs[eventIndex] > -1;
		return { eventIndex: eventIndex, disable: disable };
	};


	formatUserList(map, userID) {
		let l = [];
		for (k in map) {
			if (k != userID) {
				l.push({userID: k, user_name: map[k].user_name});
			}
		}
		return l;
	}

	getFriendsText(members, userID, userMap) {
		// remove self from list
		var i = members.indexOf(userID);
		if (i > -1) {
			members.splice(i, 1);
		}

		let friends = members.map(e => userMap[e].user_name);

		if (friends.length == 1) {
			// one other member -- the creator
			return "Your friend " + friends[0] + " wants you to join now!";
		} else if (friends.length == 2) {
			// one other invitee
			return (
				"Your friends " +
				friends.join(" and ") +
				" are also invited. Don't be the last to join!"
			);
		}
		// else 2+ other invitees
		return (
			"Your friends " +
			friends.slice(0, -1).join(", ") +
			", and " +
			friends[friends.length - 1] +
			" are also invited. Don't be the last to join!"
		);
	};
}

export const GoalManager = new goalManager();