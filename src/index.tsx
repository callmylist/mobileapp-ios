import {
    createAppContainer,
    createSwitchNavigator,
    SafeAreaView
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MenuProvider } from 'react-native-popup-menu';

import {
  createDrawerNavigator
} from 'react-navigation-drawer';
import React, { Component } from 'react';
import WelcomeScreen from './screens/welcome'
import LoginScreen from './screens/login'
import RegisterScreen from './screens/register'
import DashboardScreen from './screens/dashboard'
import MessageCenterScreen from './screens/messagecenter'
import CampaignScreen from './screens/campaign'
import SoundScreen from './screens/sound'
import AccountScreen from './screens/account'
import SupportScreen from './screens/support'
import ContactListScreen from './screens/contact_list'
import Menu from './components/menu'
import { View, StatusBar, Platform } from 'react-native';

import CampaignCreateScreen from './screens/campaign_create'
import ScheduleScreen from './screens/popup/schedule'
import CampaignDetailScreen from './screens/campaign_detail'

const CreatCampaignNavigator = createStackNavigator(
  {
    CampaignCreateScreen,
    ScheduleScreen
  },
  {
    initialRouteName: 'CampaignCreateScreen',
    headerMode: 'none',
    navigationOptions: { header: null },
  },
);

const Dashboard = createDrawerNavigator({
  Dashboard: {
    screen: DashboardScreen
  },
  MessageCenter: {
    screen: MessageCenterScreen
  },
  Sound: {
    screen: SoundScreen
  },
  Campaign: {
    screen: CampaignScreen
  },
  Account: {
    screen: AccountScreen
  },
  Support: {
    screen: SupportScreen
  },
  ContactList: {
    screen: ContactListScreen
  },
  
}, {
  initialRouteName: 'Account',
  contentComponent: Menu,
  drawerPosition: 'left',
  drawerWidth: 300,
  headerMode: 'none',
  drawerType: 'front',
  overlayColor: 'transparent',
  backBehavior: 'none',
  drawerBackgroundColor: '#0000FF00',
});

const App = createStackNavigator({
  Dashboard,
  CreatCampaignNavigator,
  CampaignDetailScreen
},
{
  initialRouteName: 'Dashboard',
  headerMode: 'none',
  navigationOptions: {header: null},
  gestureEnabled: false,
})

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
      App,
    },
    {
      initialRouteName: 'WelcomeScreen',
      headerMode: 'none',
      navigationOptions: { header: null },
    },
  );

const AppNav = createAppContainer(MainNavigator);

console.disableYellowBox = true;


export default class MainApp extends Component {
    constructor(props: any) {
      super(props);
    }
  
    render() {
      return (
        <MenuProvider>
          <AppNav style={{ flex: 1 }} />
        </MenuProvider>
      );
    }
  }