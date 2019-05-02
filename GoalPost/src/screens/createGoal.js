import React from 'react';
import { Button, View, Text } from 'react-native';
class CreateGoal extends React.Component {
  static navigationOptions = {
    title: 'CreateGoal'
   };
 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
   <Button title="Go to Goal Completion screen"
    onPress={() => this.props.navigation.navigate('Completion')}
   />
   <Button title="Go Back"
    onPress={() => this.props.navigation.goBack()}
   />
  </View>
);
}
}
export default CreateGoal;