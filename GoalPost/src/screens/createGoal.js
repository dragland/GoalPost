import React from 'react';
import { Button, View, StyleSheet, Switch, Text } from 'react-native';
import { Input } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

class CreateGoal extends React.Component {
  static navigationOptions = {
    title: 'CreateGoal'
   };
  state = {
    isDateTimePickerVisible: false,
    enablePushNotifs: true,
    goalName: null,
    date: null,
  };

  updateGoalName = (e) => {
    this.setState({ goalName: e.nativeEvent.text });
  };

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleDatePicked = date => {
    this.setState({ date: date.toLocaleDateString() });
    this.hideDateTimePicker();
  };

  togglePushNotifs = bool => {
    this.setState({ enablePushNotifs: bool });
  };


render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'flex-start'
  }}>

   <View style={styles.inputRow}>
     <View style={styles.inputHeaderContainer}>
       <Text style={styles.inputHeader}>Goal Name</Text>
     </View>
     <View style={styles.inputTakerContainer}>
       <Input
         placeholder='Gym Buddies' 
         onChange={this.updateGoalName}
       />
     </View>
   </View>

   <View style={styles.inputRow}>
     <Text style={styles.inputHeader}>Start Date</Text>
     <Input
       value={this.state.date}
       onFocus={this.showDateTimePicker}
     />
     <DateTimePicker
       isVisible={this.state.isDateTimePickerVisible}
       onConfirm={this.handleDatePicked}
       onCancel={this.hideDateTimePicker}
     />
   </View>

   <View style={styles.inputRow}>
     <Text style={styles.inputHeader}>Repeat?</Text>
     <Input placeholder='Weekly M, W, F' />
   </View>
   <View style={styles.inputRow}>
     <Text style={styles.inputHeader}>Cost/miss</Text>
     <Input placeholder='$5.00' />
   </View>
   <View style={styles.inputRow}>
     <Text style={styles.inputHeader}>Members</Text>
     <Input placeholder='Choose from FB' />
   </View>

   <View style={styles.inputRow}>
     <Text style={styles.inputHeader}>Push notifications?</Text>
     <Switch
       onValueChange={this.togglePushNotifs}
       value={this.state.enablePushNotifs}
     />
   </View>

   <Button title="Go to Goal Completion screen"
    onPress={() => this.props.navigation.navigate('Completion', {
      goalName: this.state.goalName,
    })}
   />
   <Button title="Go Back"
    onPress={() => this.props.navigation.goBack()}
   />

  </View>
);
}
}

const styles = StyleSheet.create({
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputHeaderContainer: {
    flex: 0.4,
  },
  inputHeader: {
    color: '#484848',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  inputTakerContainer: {
    flex: 0.5,
  },
});

export default CreateGoal;
