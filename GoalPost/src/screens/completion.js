import React from 'react';
import { Button, View, Text } from 'react-native';
class Completion extends React.Component {
  static navigationOptions = {
    title: 'Completion'
   };


 render() {
  /* Get passed params, provide fallback if nothing set */
  const { navigation } = this.props;
  const goalName = navigation.getParam('goalName', 'NO-GOAL-NAME');
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>

   <Text>{goalName}</Text>
   <Button title="Go Back"
    onPress={() => this.props.navigation.goBack()}
   />
  </View>
);
}
}
export default Completion;
