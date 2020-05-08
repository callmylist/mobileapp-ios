import React, {Component} from 'react';
import {StyleSheet, Image, View, TextInput, Text, TouchableOpacity, ScrollView} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }, 
    logo: {
        width: '100%',
        resizeMode: 'contain',
        height: 100,
        marginTop: 80
    },
    icon: {
        width: 24,
        resizeMode: 'contain',
        height: 30
    },
    inputContainer: {
        borderBottomColor:'black',
        borderBottomWidth: 1,
        flexDirection:'row',
        width: '80%',
        paddingLeft: 8,
        paddingRight: 8,
        margin: 16
    },
    input: {
        height: 42,
        fontSize: 18,
        flex: 1
    },
    backBottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
    button: {
        backgroundColor: '#00b7d9',
        borderRadius: 20,
        height: 40,
        width: '48%',
        justifyContent: 'center',
        alignItems:'center'
    },
    forgotContainer: {
        width: '80%',
        height: 60,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 20
    },
    forgot: {
        color: '#7e7a7a',
        fontSize: 16,
        fontWeight: '600'
    },
    buttonContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent:'space-between'
    }
});
  
class LoginScreen extends React.Component {
    constructor(props: any) {
        super(props);
    }
    
    onLogin = () => {
        this.props.navigation.navigate('Dashboard')
    }

    onRegister = () => {
        this.props.navigation.navigate('RegisterScreen')
    }
    
    render() {
        return (
            <>
                <Header/>
                <ScrollView style={{
                    zIndex: 999
                }}>
                    <View style={{
                        alignItems:'center',
                        flex: 1
                    }}>
                        <Image 
                            source={require("../assets/images/login_lock.png")}
                            style={styles.logo}
                        />
                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Username"
                            />
                            <Image 
                                source={require("../assets/images/login_user.png")}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Password"
                            />
                            <Image 
                                source={require("../assets/images/login_pwd.png")}
                                style={styles.icon}
                            />
                        </View>
                        <TouchableOpacity style={styles.forgotContainer}>
                                <CmlText style={styles.forgot}>Forgot password?</CmlText>
                            </TouchableOpacity>
                        <View
                            style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, {
                                backgroundColor: '#00b7d9'
                            }]}
                            onPress={this.onRegister}>
                                <CmlText style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: '600'
                                }}>Sign Up</CmlText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {
                                backgroundColor: '#323232'
                            }]} onPress={() => this.onLogin()}>
                                <CmlText style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: '600'
                                }}>Sign In</CmlText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                
                <Image 
                    source={require("../assets/images/back_bottom.png")}
                    style={styles.backBottom}
                />
            </>
        );
    }
  }
  
  export default LoginScreen;