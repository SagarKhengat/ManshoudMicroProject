import { createStackNavigator } from 'react-navigation';
import React from 'react';
import Home from './Home';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
// components
import Dashboard from '../screens/dashboard';
import PostImage from '../screens/postImage'
import EditImage from '../screens/editImage'
const window = Dimensions.get("screen");

const AppNavigator = createStackNavigator(
  {
    home: {
      screen: Home, navigationOptions: {
        header: null
      },
    },
    dashboard: {
      screen: Dashboard, navigationOptions: {
        headerTitle: <View style={{ marginLeft: window.width / 2 - 25, alignSelf: "center" }}><Text style={{ textAlign: "center", fontSize: 20, fontWeight: '400' }}>{'Home'}</Text></View>,
        headerLeft: null
      }
    },
    postimage: {
      screen: PostImage, navigationOptions: {
        headerTitle: "Post Image",
      }
    },
    editimage: {
      screen: EditImage, navigationOptions: {
        headerTitle: "Edit Image",
      }
    }
  },
);

export default AppNavigator;
