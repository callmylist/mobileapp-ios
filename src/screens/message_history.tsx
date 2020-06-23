import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/header';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {MessageCenterService} from '../service/message-center.service';
import moment from 'moment';
import {compose} from 'redux';
import {connect} from 'react-redux';

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

class MessageHistory extends Component<
    {
        navigation: any;
        loggedInContact: any;
    },
    {
        contact: any;
        messageList: any[];
        message: string;
    }
> {
    flatList: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            contact: null,
            messageList: [],
            message: '',
        };
    }

    componentDidMount() {
        this.setState(
            {
                contact: this.props.navigation.state.params.contact,
                messageList: [],
            },
            () => {
                this.loadMessages();
            },
        );
    }

    loadMessages = () => {
        MessageCenterService.getMessageList(this.state.contact.id).subscribe(
            (response: any) => {
                if (response.success) {
                    this.setState({
                        messageList: response.data,
                    });
                }
            },
        );
    };

    onBack = () => {
        this.props.navigation.pop({
            refresh: false,
        });
    };

    sendMessage = () => {
        if (this.state.message.trim().length == 0) {
            return;
        }

        Keyboard.dismiss();

        MessageCenterService.sendNewMessage(
            this.state.message,
            this.state.contact.id,
        ).subscribe((response: any) => {
            this.setState({
                message: '',
            });

            this.loadMessages();
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onBack} menu={false} />

                <View style={styles.container}>
                    <CmlText style={styles.campaignLabel}>Contact List</CmlText>
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={
                            Platform.OS === 'ios' ? 100 : -500
                        }
                        style={{
                            flex: 1,
                        }}>
                        <FlatList
                            inverted
                            data={this.state.messageList}
                            ref={(ref) => (this.flatList = ref)}
                            renderItem={(item: any) => (
                                <>
                                    {item.item.messageType == 2 && (
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
                                                    <CmlText
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}>
                                                        {this.state.contact
                                                            .firstName +
                                                            ' ' +
                                                            (this.state.contact
                                                                .lastName
                                                                ? this.state
                                                                      .contact
                                                                      .lastName
                                                                : '')}
                                                    </CmlText>
                                                    <View style={{flex: 1}} />
                                                    <CmlText
                                                        style={{
                                                            fontWeight: '300',
                                                        }}>
                                                        {moment(
                                                            item.item
                                                                .createDate,
                                                        ).format(
                                                            'MM/DD/YY, h:mm a',
                                                        )}
                                                    </CmlText>
                                                </View>

                                                <CmlText>
                                                    {
                                                        this.state.contact
                                                            .companyName
                                                    }
                                                </CmlText>
                                                <CmlText
                                                    style={{marginTop: 16}}>
                                                    {item.item.body}
                                                </CmlText>
                                            </View>
                                        </View>
                                    )}
                                    {item.item.messageType == 1 && (
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
                                                    <CmlText
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}>
                                                        {
                                                            this.props
                                                                .loggedInContact
                                                                .firstName
                                                        }{' '}
                                                        {
                                                            this.props
                                                                .loggedInContact
                                                                .lastName
                                                        }
                                                    </CmlText>
                                                    <View style={{flex: 1}} />
                                                    <CmlText
                                                        style={{
                                                            fontWeight: '300',
                                                        }}>
                                                        {moment(
                                                            item.item
                                                                .createDate,
                                                        ).format(
                                                            'MM/DD/YY, h:mm a',
                                                        )}
                                                    </CmlText>
                                                </View>

                                                <CmlText>
                                                    {
                                                        this.props
                                                            .loggedInContact
                                                            .companyName
                                                    }
                                                </CmlText>
                                                <CmlText
                                                    style={{marginTop: 16}}>
                                                    {item.item.body}
                                                </CmlText>
                                            </View>
                                        </View>
                                    )}
                                </>
                            )}></FlatList>
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
                                value={this.state.message}
                                onChangeText={(value: string) =>
                                    this.setState({message: value})
                                }
                            />
                            <View
                                style={{
                                    width: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => this.sendMessage()}>
                                    <Feather
                                        name="send"
                                        size={24}
                                        color="#1fac75"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loggedInContact: state.authReducer.loggedInContact,
    };
};

export default compose(connect(mapStateToProps, {}))(MessageHistory);
