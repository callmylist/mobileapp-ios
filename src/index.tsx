import {
    createAppContainer,
    createSwitchNavigator,
    SafeAreaView,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MenuProvider } from 'react-native-popup-menu';

import { createDrawerNavigator } from 'react-navigation-drawer';
import React, { Component } from 'react';
import WelcomeScreen from './screens/welcome';
import LoginScreen from './screens/login';
import ForgotPasswordScreen from './screens/forgot_password';
import RegisterScreen from './screens/register';
import DashboardScreen from './screens/dashboard';
import MessageCenterScreen from './screens/messagecenter';
import CampaignScreen from './screens/campaign';
import SoundScreen from './screens/sound';
import SettingsScreen from './screens/settings';
import AccountScreen from './screens/account';
import SupportScreen from './screens/support';
import AddAccountScreen from './screens/add_account';
import ViewContactScreen from './screens/view_contact';
import AddContactScreen from './screens/add_contact';
import ContactListScreen from './screens/contact_list';
import ContactsScreen from './screens/contacts';
import StripeScreen from './screens/stripe';

import Menu from './components/menu';
import { View, StatusBar, Platform } from 'react-native';

import CampaignCreateScreen from './screens/campaign_create';
import ScheduleScreen from './screens/popup/schedule';
import CampaignDetailScreen from './screens/campaign_detail';
import MessageHistoryScreen from './screens/message_history';
import FilteredContactsScreen from './screens/filtered_contacts';

import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'react-native-firebase';
import {REFRESH_VALUE} from './redux/actionTypes/dashboard';

import AsyncStorage from '@react-native-community/async-storage';

const CreatCampaignNavigator = createStackNavigator(
    {
        CampaignCreateScreen,
        ScheduleScreen,
    },
    {
        initialRouteName: 'CampaignCreateScreen',
        headerMode: 'none',
        navigationOptions: { header: null },
    },
);

const Main = createDrawerNavigator(
    {
        Dashboard: {
            screen: DashboardScreen,
        },
        MessageCenter: {
            screen: MessageCenterScreen,
        },
        Settings: { screen: SettingsScreen },
        Contacts: { screen: ContactsScreen },
        Sound: {
            screen: SoundScreen,
        },
        Campaign: {
            screen: CampaignScreen,
        },
        Account: {
            screen: AccountScreen,
        },
        Support: {
            screen: SupportScreen,
        },
        ContactList: {
            screen: ContactListScreen,
        },
    },
    {
        initialRouteName: 'MessageCenter',
        contentComponent: Menu,
        drawerPosition: 'left',
        drawerWidth: 300,
        headerMode: 'none',
        drawerType: 'front',
        overlayColor: 'transparent',
        backBehavior: 'none',
        drawerBackgroundColor: '#0000FF00',
    },
);

const App = createStackNavigator(
    {
        Main,
        CreatCampaignNavigator,
        CampaignDetailScreen,
        MessageHistoryScreen,
        AddAccountScreen,
        FilteredContactsScreen,
        AddContactScreen,
        ViewContactScreen,
        StripeScreen,
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none',
        navigationOptions: { header: null },
        gestureEnabled: false,
    },
);

const AuthNavigator = createSwitchNavigator(
    {
        LoginScreen,
        RegisterScreen,
        ForgotPasswordScreen,
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

    onUnsubscribeNotificaitonListener: any = null

    constructor(props: any) {
        super(props);
    }

    getToken = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log(fcmToken);
            if (fcmToken) {
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    };

    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    };

    requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();
            this.getToken();
        } catch (error) {
            console.log('permission rejected');
        }
    };

    createNotificationListeners = () => {
        this.onUnsubscribeNotificaitonListener = firebase
            .notifications()
            // .onNotificationOpened(notification => {
            //     console.log(notification)
            // })

            .onNotification(notification => {
                console.log(notification)
                store.dispatch({
                    type: REFRESH_VALUE,
                    payload: {
                        contactId: notification.data.contact_id
                    }
                });
                firebase.notifications().displayNotification(notification);
            });
        firebase.notifications().getInitialNotification().then((initialNotification) => {
            console.log("initialNotification", initialNotification);
        })
    };

    removeNotificationListeners = () => {
        if(this.onUnsubscribeNotificaitonListener)
            this.onUnsubscribeNotificaitonListener();
    };

    componentDidMount() {
        // firebase.notifications().android.createChannel(channel);
        this.checkPermission();
        this.removeNotificationListeners();
        this.createNotificationListeners();
    }

    componentWillUnmount() {
        this.removeNotificationListeners();
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}></PersistGate>
                <MenuProvider>
                    <SafeAreaView
                        style={{ flex: 0, backgroundColor: '#242536' }}
                    />
                    <AppNav style={{ flex: 1 }} />
                </MenuProvider>
            </Provider>
        );
    }
}
