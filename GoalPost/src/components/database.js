import firebase from 'react-native-firebase';

class dataBase {
	constructor() {
		this.ref = firebase.firestore().collection('goals');
	}
	pushGoalToDB(s) {
		this.ref.add({title: s, complete: false,});
	}
}

const Cloud = new dataBase();
export default Cloud;