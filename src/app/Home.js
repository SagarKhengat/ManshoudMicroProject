import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'dashboard' })],
  key: null,
});
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(resetAction);
    }, 1500);
  }




  render() {
    return (
      <View style={{ backgroundColor: '#FFF' }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="stretch"
          source={require('../assets/images/screen.png')}
        />
      </View>
    );
  }
}

export default Home;
