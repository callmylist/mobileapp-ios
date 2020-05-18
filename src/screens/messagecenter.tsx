import React, {Component} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'
import { Menu, MenuTrigger, MenuOptions, MenuOption} from 'react-native-popup-menu';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }, 
    messageList: {
        // marginTop: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        borderTopWidth: 0,
    },
    messageContainer: {
        flexDirection: 'row',
        padding: 16
    },
    messageInfoContainer: {
        flex: 1,
        marginLeft: 20,
    },
    messagePhone: {
        color: '#383838',
        fontSize: 18
    },
    messageTime: {
        color: '#00b7d9',
        marginLeft: 16
    },
    message: {
        color: '#fa8c56'
    },
    searchContainer: {
        borderRadius: 20,
        height: 40,
        borderWidth: 1,
        borderColor: '#b8b8b8',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16
    },
    searchBox: {
        height: 36,
        fontSize: 18,
        color: '#acabab',
        marginLeft: 20,
        marginRight: 20,
        flex: 1
    },
    tabButton: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 0
    }
});

class MessageCenter extends Component {

    state = {
        messages: [
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
            {
                phone: '+13172892420',
                time: '9:36AM',
                comment: 'Can I get 6 pack 16oz bud light can'
            },
        ],
        index: 0
    }

    componentDidMount() {
    }
    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    onTab = (index: number) => {
        this.setState({
            index: index
        })
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={{
                    flex: 1,
                    padding: 8
                }}>
                    <View style={styles.searchContainer}>
                        <CmlTextInput 
                            placeholder="search"
                            style={styles.searchBox}
                        />
                        <AntDesign name="search1" size={20} color={'#a9afbb'}/>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }}>
                        <TouchableOpacity style={{
                            marginTop: 16,
                            flex: 1
                        }}
                        onPress={() => this.onTab(0)}>
                            <View style={[styles.tabButton ,{
                                backgroundColor: this.state.index == 0?'white':'#00b7d9',
                                borderColor: this.state.index == 0?'#9e9e9e':'#00b7d9'
                            }]}>
                                <CmlText style={{
                                    color: this.state.index == 0?'black':'white',
                                    fontSize: 14,
                                    fontWeight: '600'
                                }}>Recent</CmlText>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            width: 8,
                            borderBottomWidth: 1,
                            borderColor: '#9e9e9e'
                        }} />
                        <TouchableOpacity style={{
                            marginTop: 16,
                            flex: 1,
                        }}
                        onPress={() => this.onTab(1)}>
                            <View style={[styles.tabButton, {
                                backgroundColor: this.state.index == 1?'white':'#2c2d2d',
                                borderColor: this.state.index == 1?'#9e9e9e':'#2c2d2d'
                            }]}>
                                <CmlText style={{
                                    color: this.state.index == 1?'black':'white',
                                    fontSize: 14,
                                    fontWeight: '600'
                                }}>Favourite</CmlText>
                            </View>
                        </TouchableOpacity>

                        <View style={{
                            width: 8,
                            borderBottomWidth: 1,
                            borderColor: '#9e9e9e'
                        }} />
                        <TouchableOpacity style={{
                            marginTop: 16,
                            flex: 1
                        }}
                        onPress={() => this.onTab(2)}>
                            <View style={[styles.tabButton, {
                                backgroundColor: this.state.index == 2?'white':'#fa8c56',
                                borderColor: this.state.index == 2?'#9e9e9e':'#fa8c56'
                            }]}>
                                <CmlText style={{
                                    color: this.state.index == 2?'black':'white',
                                    fontSize: 14,
                                    fontWeight: '600'
                                }}>Follow up</CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.messageList}>
                        <FlatList 
                            data={this.state.messages}
                            renderItem={(item: any) => {
                                console.log(item.item)
                            return <View style={[styles.messageContainer, {
                                backgroundColor: item.index % 2 == 1? '#f7f7f7': 'white'
                            }]}>
                                <Feather name="star" size={20} color={'#fa8c56'} style={{marginTop: 8}}/>
                                <View style={styles.messageInfoContainer}>
                                    <CmlText style={styles.messagePhone}>{item.item.phone}</CmlText>
                                    <CmlText style={styles.messageTime}>{item.item.time}</CmlText>
                                </View>
                                <View style={{
                                    flex: 1
                                }}>
                                    <CmlText style={styles.message}>{item.item.comment}</CmlText>
                                </View>
                                <Menu>
                                    <MenuTrigger>
                                        <Entypo name="dots-three-vertical" size={20} color={'#7b7b7b'} style={{marginTop: 8}}/>
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{
                                        optionText: {
                                            padding: 4
                                        }
                                    }}>
                                        <MenuOption text='View Contact' />
                                        <MenuOption text='Mark As Favorite' />
                                        <MenuOption text='Create Follow Up Task' />
                                        <MenuOption text='Edit' />
                                        <MenuOption text='Delete' />
                                        <MenuOption text='Archive' />
                                    </MenuOptions>
                                </Menu>
                            </View>;
                        }}>

                        </FlatList>

                    </View>
                </View>
            </SafeAreaView>
        );
    }
  }
  
export default MessageCenter;