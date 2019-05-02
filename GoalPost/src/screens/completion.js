import React from 'react';
import { Button, View, Text } from 'react-native';
class Completion extends React.Component {
  static navigationOptions = {
    title: 'Completion'
   };
 render() {
 return (
  <View style={{ 
   flex: 1,
   alignItems:'center',
   justifyContent:'center'
  }}>
   <Button title="Go Back"
    onPress={() => this.props.navigation.goBack()}
   />
  </View>
);
}
}
export default Completion;