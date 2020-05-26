import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/header';
import { CmlText } from '../components/text';
import { CmlTextInput } from '../components/textinput';

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
    },
    campaignLabel: {
        fontSize: 20,
        textAlign: 'center',
        color: '#515252',
        marginTop: 12,
    },
});

class MessageHistory extends Component {
    componentDidMount() { }

    onBack = () => {
        this.props.navigation.pop();
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header back={true} onBack={this.onBack} menu={false} />

                <View style={styles.container}>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -500}
                        style={{
                            flex: 1,
                        }}>
                        <CmlText style={styles.campaignLabel}>Contact List</CmlText>
                        <View
                            style={{
                                flex: 1,
                            }}>
                            <View
                                style={{
                                    marginVertical: 8,
                                }}>
                                <View
                                    style={{
                                        backgroundColor: '#ffeadf',
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#ffeadf',
                                        padding: 16,
                                        width: '80%',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}>
                                        <CmlText>+13173741485</CmlText>
                                        <View style={{ flex: 1 }} />
                                        <CmlText style={{ fontWeight: '300' }}>
                                            5/10/20, 3:33 AM
                    </CmlText>
                                    </View>

                                    <CmlText style={{ marginTop: 16 }}>
                                        For Multiline TextInput, return key enters a new line and
                                        not dismiss the keyboard. So, clicking on some other part of
                                        the View should dismiss the keyboard.
                  </CmlText>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginVertical: 8,
                                }}>
                                <View
                                    style={{
                                        backgroundColor: '#cdf4ff',
                                        borderRadius: 8,
                                        borderWidth: 1,
                                        borderColor: '#ffeadf',
                                        padding: 16,
                                        width: '80%',
                                        alignSelf: 'flex-end',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}>
                                        <CmlText>+13173741485</CmlText>
                                        <View style={{ flex: 1 }} />
                                        <CmlText style={{ fontWeight: '300' }}>
                                            5/10/20, 3:33 AM
                    </CmlText>
                                    </View>

                                    <CmlText style={{ marginTop: 16 }}>
                                        For Multiline TextInput, return key enters a new line and
                                        not dismiss the keyboard. So, clicking on some other part of
                                        the View should dismiss the keyboard.
                  </CmlText>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: 40,
                                flexDirection: 'row',
                            }}>
                            <CmlTextInput
                                style={{
                                    textAlignVertical: 'top',
                                    borderColor: '#9e9e9e',
                                    borderWidth: 1,
                                    paddingHorizontal: 8,
                                    flex: 1,
                                }}
                                placeholderTextColor="#9e9e9e"
                                placeholder="Message"
                                blurOnSubmit={true}
                            />
                            <View
                                style={{
                                    width: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity>
                                    <Feather name="send" size={24} color="#1fac75" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        );
    }
}

export default MessageHistory;
