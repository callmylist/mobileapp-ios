import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Header from '../components/header';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import Utils from '../utils';
import {UserService} from '../service/user.service';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {CmlSpinner} from '../components/loading';
import {signIn} from '../redux/actions/authActions';
import {LoginUser} from '../shared/models/loginuser.model';
import {store} from '../redux/store';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
} from '../redux/actionTypes/auth';
import JwtDecode from 'jwt-decode';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    logo: {
        width: '100%',
        resizeMode: 'contain',
        height: 100,
        marginTop: 80,
    },
    icon: {
        width: 24,
        resizeMode: 'contain',
        height: 30,
    },
    inputContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        width: '80%',
        paddingLeft: 8,
        paddingRight: 8,
        margin: 16,
    },
    input: {
        height: 42,
        fontSize: 18,
        flex: 1,
    },
    backBottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        backgroundColor: '#00b7d9',
        borderRadius: 20,
        height: 40,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotContainer: {
        width: '80%',
        height: 60,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginTop: 20,
    },
    forgot: {
        color: '#7e7a7a',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

class LoginScreen extends React.Component<
    {
        assets: any;
        navigation: any;
        signIn: any;
        loading: boolean;
        error: string;
        username: string;
        password: string;
    },
    {
        username: string;
        password: string;
        loading: boolean;
    }
> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            // username: 'bilal0018@yopmail.com',
            // password: 'Lmkt@ptcl1234',
            // username: 'mfake@aol.com',
            // password: '12345678',
            // username: 'matt.erich@trustedcampaigns.com',
            // password: '12345678',
            loading: false
        };
    }

    componentDidMount() {
        if (
            this.props.username  &&
            this.props.password 
        ) {
            this.setState(
                {
                    username: this.props.username,
                    password: this.props.password,
                },
                () => {
                    this.onLogin();
                },
            );
        }
    }

    onLogin = () => {
        if (
            this.state.username.length != 0 &&
            this.state.password.length != 0
        ) {
            this.setState({
                loading: true
            })
            UserService.signIn(
                this.props.assets.domainUser.id,
                this.state.username,
                this.state.password,
            ).subscribe((response: any) => {
                if (response.success) {
                    const decodedToken: any = JwtDecode(response.token);
    
                    const loginUser = new LoginUser(
                        decodedToken.id,
                        decodedToken.version,
                        decodedToken.firstName,
                        decodedToken.lastName,
                        response.data.companyName,
                        decodedToken.email,
                        response.data.phone,
                        decodedToken.exp,
                        response.token,
                        response.data.gmailId ? true : false,
                        response.data.role,
                        {},
                        response.data.telephonicId,
                        response.data.telephonicCode,
                        response.data.parentid,
                        response.data.customize,
                        response.data.messageSubscription
                    );
    
                    store.dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: {
                            loggedInContact: loginUser,
                            username: this.state.username,
                            password: this.state.password
                        },
                    });
                    this.setState({
                        loading: false
                    })

                    let subscribed = false
                    try {
                        subscribed = 
                        response.data.messageSubscription &&
                        response.data.messageSubscription !== null &&
                        response.data.messageSubscription.subId &&
                        response.data.messageSubscription.subId !== ""  ? true : false;
                    }
                    catch(ex) {
            
                    }
                    
                    this.gotoMain(subscribed);
                } else {
                    Utils.presentToast("User name or password is incorrect");
                    this.setState({
                        loading: false
                    })
                    store.dispatch({
                        type: USER_LOGIN_FAILED,
                        payload: {
                            error: response.submessage,
                        },
                    });
                }
            })
        }
    };

    gotoMain = (subscribed: boolean) => {
        this.props.navigation.navigate(subscribed ? 'MessageCenter': 'Dashboard');
    };

    onRegister = () => {
        this.props.navigation.navigate('RegisterScreen');
    };

    onForgotPassword = () => {
        this.props.navigation.navigate('ForgotPasswordScreen');
    };

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.error) {
            Utils.presentToast(this.props.error);
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header />
                <CmlSpinner visible={this.state.loading} />
                <ScrollView
                    style={{
                        zIndex: 999,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Image
                            source={require('../assets/images/login_lock.png')}
                            style={styles.logo}
                        />
                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Username"
                                value={this.state.username}
                                autoCapitalize="none"
                                onChangeText={(value: string) =>
                                    this.setState({username: value})
                                }
                            />
                            <Image
                                source={require('../assets/images/login_user.png')}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Password"
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={(value: string) =>
                                    this.setState({password: value})
                                }
                            />
                            <Image
                                source={require('../assets/images/login_pwd.png')}
                                style={styles.icon}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.forgotContainer}
                            onPress={this.onForgotPassword}>
                            <CmlText style={styles.forgot}>
                                Forgot password?
                            </CmlText>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: '#00b7d9',
                                    },
                                ]}
                                onPress={this.onRegister}>
                                <CmlText
                                    style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: '600',
                                    }}>
                                    Sign Up
                                </CmlText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: '#323232',
                                    },
                                ]}
                                onPress={() => this.onLogin()}>
                                <CmlText
                                    style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: '600',
                                    }}>
                                    Sign In
                                </CmlText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <Image
                    source={require('../assets/images/back_bottom.png')}
                    style={styles.backBottom}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        assets: state.authReducer.assets,
        error: state.authReducer.error,
        username: state.authReducer.username,
        password: state.authReducer.password,
    };
};

export default compose(connect(mapStateToProps, {signIn}))(LoginScreen);
