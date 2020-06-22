import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/header';
import {createDrawerNavigator} from 'react-navigation-drawer';
import DashboardScreen from '../screens/dashboard';
import Menu from '../components/menu';
import Content from './content';
class Home extends Component {
    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    render() {
        return (
            <>
                <Header onMenu={this.onMenu} />
                <Content />
            </>
        );
    }
}

export default Home;
