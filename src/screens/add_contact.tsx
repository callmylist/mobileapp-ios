import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    AsyncStorage,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Header from '../components/header';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import RestClient from '../service/restclient';
import Utils from '../utils';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {User} from '../shared/models/user.model';
import Constants from '../utils/constants';
import {CommonService} from '../service/common.service';
import {CmlSpinner} from '../components/loading';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {MessageCenterService} from '../service/message-center.service';

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
    highlight: {
        borderBottomColor: 'red',
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
    errorLabel: {
        textAlign: 'left',
        width: '80%',
        color: 'red',
    },
});

class AddContactScreen extends Component<
    {
        assets: any;
        navigation: any;
    },
    {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        companyName: string;
        note: string;
        showValidate: boolean;
        loading: boolean;
    }
> {
    constructor(props: any) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            companyName: '',
            note: '',
            showValidate: false,
            loading: false,
        };
    }

    componentDidMount() {}

    onBack = () => {
        this.props.navigation.pop();
    };

    signUp = () => {
        if (
            !this.state.firstName ||
            !this.state.lastName ||
            !this.state.email ||
            !this.state.phone ||
            !this.state.companyName ||
            !Utils.validatePhoneNumber(this.state.phone) ||
            !Utils.validateEmail(this.state.email)
        ) {
            this.setState({
                showValidate: true,
            });

            return;
        }

        let data = {
            company: this.state.companyName,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phone,
        };

        this.setState({loading: true});

        MessageCenterService.saveContact(data).subscribe((response: any) => {
            this.setState({loading: false});
            if (response.success) {
                Utils.presentToast('Successfully added contact.');
                this.props.navigation.pop();
            } else {
                Utils.presentToast(
                    response.message + '. ' + response.submessage,
                );
            }
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onBack} />
                <CmlSpinner visible={this.state.loading} />
                <KeyboardAvoidingScrollView
                    style={{
                        zIndex: 999,
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Image
                            source={require('../assets/images/register_logo.png')}
                            style={styles.logo}
                        />
                        <View
                            style={[
                                styles.inputContainer,
                                !this.state.firstName &&
                                    this.state.showValidate &&
                                    styles.highlight,
                            ]}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="First name"
                                value={this.state.firstName}
                                onChangeText={(value: string) =>
                                    this.setState({
                                        firstName: value,
                                        showValidate: false,
                                    })
                                }
                            />
                        </View>

                        <View
                            style={[
                                styles.inputContainer,
                                !this.state.lastName &&
                                    this.state.showValidate &&
                                    styles.highlight,
                            ]}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Last name"
                                value={this.state.lastName}
                                onChangeText={(value: string) =>
                                    this.setState({
                                        lastName: value,
                                        showValidate: false,
                                    })
                                }
                            />
                        </View>
                        <View
                            style={[
                                styles.inputContainer,
                                !this.state.companyName &&
                                    this.state.showValidate &&
                                    styles.highlight,
                            ]}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Company name"
                                value={this.state.companyName}
                                onChangeText={(value: string) =>
                                    this.setState({
                                        companyName: value,
                                        showValidate: false,
                                    })
                                }
                            />
                        </View>

                        <View
                            style={[
                                styles.inputContainer,
                                (!Utils.validateEmail(this.state.email) ||
                                    !this.state.email) &&
                                    this.state.showValidate &&
                                    styles.highlight,
                            ]}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Email address"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={this.state.email}
                                onChangeText={(value: string) =>
                                    this.setState({
                                        email: value,
                                        showValidate: false,
                                    })
                                }
                            />
                        </View>
                        {!Utils.validateEmail(this.state.email) &&
                            this.state.showValidate && (
                                <CmlText style={styles.errorLabel}>
                                    Email format is invalid
                                </CmlText>
                            )}

                        <View
                            style={[
                                styles.inputContainer,
                                (!Utils.validatePhoneNumber(this.state.phone) ||
                                    !this.state.phone) &&
                                    this.state.showValidate &&
                                    styles.highlight,
                            ]}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Phone no"
                                keyboardType="phone-pad"
                                value={this.state.phone}
                                onChangeText={(value: string) =>
                                    this.setState({
                                        phone: value,
                                        showValidate: false,
                                    })
                                }
                            />
                        </View>

                        <View
                            style={[
                                styles.inputContainer,
                                !this.state.note &&
                                    this.state.showValidate &&
                                    styles.highlight,
                            ]}>
                            <CmlTextInput
                                style={[
                                    styles.input,
                                    {
                                        height: 100,
                                        textAlignVertical: 'top',
                                        width: '100%',
                                    },
                                ]}
                                placeholder="Note"
                                value={this.state.note}
                                multiline={true}
                                blurOnSubmit={true}
                                onChangeText={(value: string) =>
                                    this.setState({
                                        note: value,
                                        showValidate: false,
                                    })
                                }
                            />
                        </View>

                        <View
                            style={{
                                width: '80%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 16,
                            }}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: '#00b7d9',
                                    },
                                ]}
                                onPress={() => this.signUp()}>
                                <CmlText
                                    style={{
                                        color: 'white',
                                        fontSize: 18,
                                        fontWeight: '600',
                                    }}>
                                    Add Contact
                                </CmlText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingScrollView>

                {/* <Image 
                    source={require("../assets/images/back_bottom.png")}
                    style={styles.backBottom}
                /> */}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        assets: state.authReducer.assets,
    };
};

export default compose(connect(mapStateToProps, {}))(AddContactScreen);