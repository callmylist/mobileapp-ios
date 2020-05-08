import {
    createAppContainer,
    createSwitchNavigator,
    SafeAreaView
} from 'react-navigation';
import {
  createDrawerNavigator
} from 'react-navigation-drawer';
import React, { Component } from 'react';
import WelcomeScreen from './screens/welcome'
import LoginScreen from './screens/login'
import RegisterScreen from './screens/register'
import DashboardScreen from './screens/dashboard'
import MessageCenterScreen from './screens/messagecenter'
import Menu from './components/menu'
import { View, StatusBar, Platform } from 'react-native';

const Dashboard = createDrawerNavigator({
  Dashboard: {
    screen: DashboardScreen
  },
  MessageCenter: {
    screen: MessageCenterScreen
  }
}, {
  initialRouteName: 'Dashboard',
  contentComponent: Menu,
  drawerPosition: 'left',
  drawerWidth: 300,
  headerMode: 'none',
  drawerType: 'front',
  overlayColor: 'transparent',
  backBehavior: 'none',
  drawerBackgroundColor: '#0000FF00',
});

const AuthNavigator = createSwitchNavigator(
  {
    LoginScreen,
    RegisterScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    navigationOptions: { header: null },
  },
);

const MainNavigator = createSwitchNavigator(
    {
      WelcomeScreen,
      AuthNavigator,
      Dashboard
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
        <AppNav style={{ flex: 1 }} />
      );
    }
  }