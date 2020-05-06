import {
    createAppContainer,
    createSwitchNavigator,
    SafeAreaView
} from 'react-navigation';
import React, { Component } from 'react';
import WelcomeScreen from './screens/welcome'
import { View, StatusBar, Platform } from 'react-native';

const MainNavigator = createSwitchNavigator(
    {
      WelcomeScreen,
    },
    {
      initialRouteName: 'WelcomeScreen',
      headerMode: 'none',
      navigationOptions: { header: null },
    },
  );
const AppNav = createAppContainer(MainNavigator);

export default class MainApp extends Component {
    constructor(props: any) {
      super(props);
    }
  
    render() {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
  
          <AppNav style={{ flex: 1 }} />
        </SafeAreaView>
      );
    }
  }