import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'

class MessageCenter extends Component {

    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    render() {
        return (
            <>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={{
                    flex: 1,
                    padding: 8
                }}>
                    <View style={{
                        borderRadius: 20,
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#b8b8b8',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingRight: 16
                    }}>
                        <CmlTextInput 
                            placeholder="search"
                            style={{
                                height: 36,
                                fontSize: 18,
                                color: '#acabab',
                                marginLeft: 20,
                                marginRight: 20,
                                flex: 1
                            }}
                        />
                        <AntDesign name="search1" size={20} color={'#a9afbb'}/>
                    </View>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={{
                            marginTop: 16,
                            flex: 1
                        }}>
                            <View style={{
                                backgroundColor: '#00b7d9',
                                borderRadius: 100,
                                height: 32,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <CmlText style={{
                                    color: 'white',
                                    fontSize: 14,
                                    fontWeight: '600'
                                }}>Add Funds</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: 16,
                            flex: 1,
                            marginRight: 8,
                            marginLeft: 8
                        }}>
                            <View style={{
                                backgroundColor: '#2c2d2d',
                                borderRadius: 100,
                                height: 32,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <CmlText style={{
                                    color: 'white',
                                    fontSize: 14,
                                    fontWeight: '600'
                                }}>Favourite</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: 16,
                            flex: 1
                        }}>
                            <View style={{
                                backgroundColor: '#fa8c56',
                                borderRadius: 100,
                                height: 32,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <CmlText style={{
                                    color: 'white',
                                    fontSize: 14,
                                    fontWeight: '600'
                                }}>Follow up</CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
    }
  }
  
export default MessageCenter;