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

	getEventIndex(userID, eventTimes, userLogs) {
		var eventIndex = -1;
		const today = new Date();
		for (var i = 0; i < eventTimes.length; i++) {
			const date = eventTimes[i].toDate(); // time at which event opens for check in
			var midnight = new Date(date.getTime());
			midnight.setHours(23,59,59,9999);

			if (today >= date && today <= midnight) {
				eventIndex = i;
				break; // found proper date
			}
		}

		const log = userLogs[userID];
		const disable = (eventIndex == -1) || (log[eventIndex] > -1);
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

	getUserProgress(userID, userLogs) {
		let done = 0;
		let total = userLogs[userID].length;
		for (let i = 0; i < total; i++) {
			if (userLogs[userID][i] === 1) {
				done++;
			}
		}
		return ((done/total) * 100).toFixed(2);
	}

	getUserScore(userID, userLogs, penalty) {
		let score = 0;
		for (let i = 0; i < userLogs[userID].length; i++) {
			let dif = 0;
			if (userLogs[userID][i] === 1) {
				dif = penalty;
			}
			if (userLogs[userID][i] === 0) {
				dif = -1 * penalty;
			}
			score += dif;
		}
		return score;
	}

	getSortedUsers(userLogs, penalty) {
		let l = [];
		Object.keys(userLogs).forEach((u) => {
			let s = this.getUserScore(u, userLogs, penalty);
			l.push({
				userID: u,
				score: s
			});
		});
		l.sort(function(a, b) {
			return a.score - b.score;
		});
		return l.reverse();
	}

	getTotalPot(userLogs, penalty) {
		let count = 0;
		Object.keys(userLogs).forEach((u) => {
			for (let i = 0; i < userLogs[u].length; i++) {
				if (userLogs[u][i] === 0) {
					count++;
				}
			}
		});
		return count * penalty;
	}

	getCashOutMap(userID, userLogs, penalty) {
		let order = this.getSortedUsers(userLogs, penalty);
		let pot = getTotalPot(userLogs, penalty);
		if (pot === 0) {
			//return congrats you all did the thing weeeeee
		}
		if (userID === order[0].userID) {
			// return everybody else owes u so much :()
		}
		else {
			let score = getUserScore(userID, userLogs, penalty);
			if (score >= 0) {
				// return order[0].userID owes you *score
			}
			else {
				// return please pay order[0].userID -1*score
			}
		}
	}
}

export const GoalManager = new goalManager();