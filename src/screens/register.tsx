import React, {Component} from 'react';
import {StyleSheet, Image, View, TextInput, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView} from 'react-native';
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
    }
});
  
class RegisterScreen extends Component {

    onLogin = () => {
        this.props.navigation.navigate('LoginScreen')
    }
    
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onLogin}/>
                <KeyboardAvoidingView
                    style={{
                        flex: 1
                    }}
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS==="ios"?40:-500}>
                    <ScrollView style={{
                        zIndex: 999
                    }}>
                        <View style={{
                            alignItems:'center',
                            flex: 1
                        }}>
                            <Image 
                                source={require("../assets/images/register_logo.png")}
                                style={styles.logo}
                            />
                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="First name"
                                />
                            </View>                        

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Last name"
                                />
                            </View>                        

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Email address"
                                />
                            </View>                        

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Phone no"
                                />
                            </View>                        

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Company name"
                                />
                            </View>                        

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Password"
                                />
                            </View>                        

                            <View
                                style={{
                                    width: '80%',
                                    flexDirection: 'row',
                                    justifyContent:'center'
                                }}>
                                <TouchableOpacity style={[styles.button, {
                                    backgroundColor: '#00b7d9'
                                }]}>
                                    <CmlText style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: '600'
                                    }}>Sign Up</CmlText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                
                
                {/* <Image 
                    source={require("../assets/images/back_bottom.png")}
                    style={styles.backBottom}
                /> */}
            </SafeAreaView>
        );
    }
  }
  
  export default RegisterScreen;