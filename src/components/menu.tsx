import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, SafeAreaView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CmlText } from '../components/text'
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#e6e6e6',
        height: 300,
        marginTop: 56,  
        backgroundColor: 'white'
    },
    avatarContainer: {
        flexDirection: 'row',
        padding: 20, 
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 8
    },
    nameContainer: {
        justifyContent: 'center',
        marginLeft: 16,
        alignItems: 'center'
    },
    welcome: {
        color: '#a9afbb',
        fontSize: 20,
    },
    name: {
        color: '#3c4858',
        fontSize: 20
    },
    menuContainer: {
        paddingLeft: 16,
        flexDirection: 'column',
        flex: 1,
        paddingBottom: 40,
        marginTop: 0,
        paddingTop: 16,
        borderTopColor: '#e3e5e6',
        borderTopWidth: 1,
        marginRight: 12,
        marginLeft: 12,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    menuLabel: {
        color: '#3c4858',
        fontSize: 16,
        marginLeft: 16,
        letterSpacing: 1.5,
        fontWeight: '500'
    },
    selectedMenu: {
        backgroundColor: '#00b7d9',
        borderRadius: 6
    },
    selectedMenuText: {
        color: 'white'
    },
    fundButtonContainer: {
        backgroundColor: '#2c2d2d',
        borderRadius: 100,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        width: 160
    },
    buttonTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600'
    }
});

class Menu extends Component {

    routes = ['Dashboard', 'MessageCenter', 'Campaign', 'Sound', 'Account', 'Support']
    constructor(props: any) {
        super(props)
        this.state= {
            currentMenu: 0,
        }
    }

    componentDidMount() {
    }

    onMenuItem = (index: number) => {
        this.setState({
            currentMenu: index
        })

        this.props.navigation.closeDrawer()
        this.props.navigation.navigate(this.routes[index])
    }

    onCreateCampaign = () => {
        this.props.navigation.closeDrawer()
        this.props.navigation.push('CreatCampaignNavigator')
    }

    logout = () => {
        this.props.navigation.closeDrawer()
        this.props.navigation.navigate('AuthNavigator')
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <View style={styles.avatarContainer}>
                        {/* <FeatherIcon name="menu" color='#535353' size={28} style={{
                            alignSelf: 'center'
                        }}/> */}
                        <Image 
                            source={{
                                uri: 'https://media-exp1.licdn.com/dms/image/C5603AQEfagEkOfFzjw/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=9R6aFkkkU0AOFbOf8AXDMG7YDTxxd_9OZy_AjgMS9Jo'
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.nameContainer}>
                            <CmlText style={styles.welcome}>Welcome,</CmlText>
                            <CmlText style={styles.name}>Mr. Wang</CmlText>
                            <TouchableOpacity style={{
                                marginTop: 16
                            }}>
                                <View style={styles.fundButtonContainer}>
                                    <CmlText style={styles.buttonTitle}>Add Funds</CmlText>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                marginTop: 8
                            }} onPress={() => this.onCreateCampaign()}>
                                <View style={[styles.fundButtonContainer, {
                                    backgroundColor: '#fda478'
                                }]}>
                                    <CmlText style={styles.buttonTitle}>Create Campaign</CmlText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={() => this.onMenuItem(0)}>
                            <View style={[styles.menuItem , this.state.currentMenu === 0 && styles.selectedMenu]}>
                                <Feather name="grid" size={24} color={this.state.currentMenu == 0 ? 'white': '#a9afbb'}/>
                                <CmlText style={[styles.menuLabel, this.state.currentMenu === 0 && styles.selectedMenuText]}>Dashboard</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(1)}>
                            <View  style={[styles.menuItem , this.state.currentMenu === 1 && styles.selectedMenu]}>
                                <Feather name="mail" size={24} color={this.state.currentMenu == 1 ? 'white': '#a9afbb'}/>
                                <CmlText style={[styles.menuLabel, this.state.currentMenu === 1 && styles.selectedMenuText]}>Message Center</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(2)}>
                            <View  style={[styles.menuItem , this.state.currentMenu === 2 && styles.selectedMenu]}>
                                <Feather name="server" size={24} color={this.state.currentMenu == 2 ? 'white': '#a9afbb'}/>
                                <CmlText style={[styles.menuLabel, this.state.currentMenu === 2 && styles.selectedMenuText]}>My Campaigns</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(3)}>
                            <View  style={[styles.menuItem , this.state.currentMenu === 3 && styles.selectedMenu]}>
                                <AntDesign name="sound" size={24} color={this.state.currentMenu == 3 ? 'white': '#a9afbb'}/>
                                <CmlText style={[styles.menuLabel, this.state.currentMenu === 3 && styles.selectedMenuText]}>Sound</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(4)}>
                            <View  style={[styles.menuItem , this.state.currentMenu === 4 && styles.selectedMenu]}>
                                <MaterialCommunityIcons name="account-circle-outline" size={24} color={this.state.currentMenu == 4 ? 'white': '#a9afbb'}/>
                                <CmlText style={[styles.menuLabel, this.state.currentMenu === 4 && styles.selectedMenuText]}>Account</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(5)}>
                            <View  style={[styles.menuItem , this.state.currentMenu === 5 && styles.selectedMenu]}>
                                <Feather name="help-circle" size={24} color={this.state.currentMenu == 5 ? 'white': '#a9afbb'}/>
                                <CmlText style={[styles.menuLabel, this.state.currentMenu === 5 && styles.selectedMenuText]}>Support</CmlText>
                            </View>
                        </TouchableOpacity>
                        <View style={{height: 50}}></View>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <View style={styles.menuItem}>
                                <AntDesign name="logout" size={24} color='#a9afbb'/>
                                <CmlText style={styles.menuLabel}>Logout</CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
  }
  
  export default Menu;