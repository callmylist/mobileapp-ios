import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'
import { ScrollView } from 'react-native-gesture-handler';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CmlButton } from '../components/button'
import { UserService } from '../service/user.service';
import Utils from '../utils'

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1
    },
    campaignLabel: {
        fontSize: 20,
        textAlign: 'center',
        color: '#515252',
        marginTop: 12
    },
    inputContainer: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8,
        margin: 16,
    },
    input: {
        height: 36,
        fontSize: 16,
        flex: 1
    },
});

class SupportScreen extends Component<{
    navigation: any,
    account: any
}, {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    message: string
}> {

    constructor(props: any) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: ""
        }
    }

    componentDidUpdate() {
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.account.firstName,
            lastName: this.props.account.lastName,
            email: this.props.account.email,
            phoneNumber: this.props.account.phone
        })
    }

    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    sendMessage = () => {
        if (this.state.message.trim().length == 0) {
            Utils.presentToast("Please enter message");
            return;
        }
        if (this.state.firstName.trim().length == 0) {
            Utils.presentToast("Please enter valid first name.");
            return;
        }
        if (this.state.lastName.trim().length == 0) {
            Utils.presentToast("Please enter valid last name.");
            return;
        }
        if (this.state.email.trim().length == 0 || !Utils.validateEmail(this.state.email)) {
            Utils.presentToast("Please enter valid email.");
            return;
        }
        if (this.state.phoneNumber.trim().length == 0 || !Utils.validatePhoneNumber(this.state.phoneNumber)) {
            Utils.presentToast("Please enter valid email.");
            return;
        }

        UserService.sendSupportMessage({
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "phone": this.state.phoneNumber,
            "message": this.state.message
        }).subscribe((response: any) => {
            if (response.success) {
                Utils.presentToast("Message sent successfully.")
                this.setState({ message: "" })
            }
            else {
                Utils.presentToast("Error occured. Please try again.")
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header onMenu={this.onMenu} menu={true} />
                <View style={styles.container}>

                    <CmlText style={styles.campaignLabel}>
                        Support
                    </CmlText>

                    <KeyboardAvoidingView
                        style={{
                            flex: 1,
                        }}
                        behavior="position"
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
                        <ScrollView>
                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="First name"
                                    value={this.state.firstName}
                                    onChangeText={(value: string) =>
                                        this.setState({ firstName: value })
                                    }
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Last name"
                                    value={this.state.lastName}
                                    onChangeText={(value: string) =>
                                        this.setState({ lastName: value })
                                    }
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Email address"
                                    autoCapitalize='none'
                                    value={this.state.email}
                                    onChangeText={(value: string) =>
                                        this.setState({ email: value })
                                    }
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    keyboardType='phone-pad'
                                    value={this.state.phoneNumber}
                                    onChangeText={(value: string) =>
                                        this.setState({ phoneNumber: value })
                                    }
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <CmlTextInput
                                    style={[styles.input, {
                                        height: 100,
                                        textAlignVertical: "top"
                                    }]}
                                    value={this.state.message}
                                    onChangeText={(value: string) =>
                                        this.setState({ message: value })
                                    }
                                    placeholder="Message"
                                    multiline={true}
                                />
                            </View>
                            <CmlButton title="Send Message" backgroundColor="#ffa67a" style={{ width: '100%' }} onPress={() => this.sendMessage()} />

                        </ScrollView>
                    </KeyboardAvoidingView>

                </View>
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        account: state.authReducer.loggedInContact
    };
};

export default compose(connect(mapStateToProps, {}))(SupportScreen);