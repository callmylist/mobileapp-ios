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
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
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
        justifyContent: 'flex-end',
        marginTop: 20,
    },
});

class ForgotPasswordScreen extends React.Component<
    {
        assets: any;
        navigation: any;
        signIn: any;
    },
    {
        loading: boolean;
        email: string;
    }
> {
    constructor(props: any) {
        super(props);

        this.state = {
            loading: false,
            email: '',
        };
    }

    onLogin = () => {
        this.props.navigation.navigate('LoginScreen');
    };

    onForgotPassword = () => {
        this.setState({loading: true});
        UserService.forgotPassword(
            this.props.assets.domainUser.id,
            this.state.email,
        ).subscribe((response: any) => {
            this.setState({loading: false});
            if (response.success) {
                this.onLogin();
                Utils.presentToast(response.submessage);
            } else {
                Utils.presentToast('The email address does not exist.');
            }
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onLogin} />
                <CmlSpinner visible={this.state.loading} />
                <ScrollView
                    style={{
                        zIndex: 999,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1,
                            paddingTop: 60,
                        }}>
                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Email Address"
                                value={this.state.email}
                                autoCapitalize="none"
                                onChangeText={(value: string) =>
                                    this.setState({email: value})
                                }
                            />
                            <Image
                                source={require('../assets/images/login_user.png')}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: '#00b7d9',
                                    },
                                ]}
                                onPress={this.onForgotPassword}>
                                <CmlText
                                    style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: '600',
                                    }}>
                                    Reset Password
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
    };
};

export default compose(connect(mapStateToProps, {signIn}))(
    ForgotPasswordScreen,
);
