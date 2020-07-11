import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/header';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';
import {CmlButton} from '../components/button';
import Modal from 'react-native-modal';
import AppStyle from '../shared/styles';
import {MessageCenterService} from '../service/message-center.service';
import moment from 'moment';
import {CmlSpinner} from '../components/loading';
import MultiSelect from '../components/quick-select';
import Utils from '../utils';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    messageList: {
        marginTop: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        // borderTopWidth: 0,
        borderRadius: 8,
        overflow: 'hidden',
    },
    messageContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    messageInfoContainer: {
        flex: 1,
        marginLeft: 20,
    },
    messageName: {
        color: '#383838',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messagePhone: {
        color: '#383838',
        fontSize: 16,
    },
    messageTime: {
        color: '#00b7d9',
        fontSize: 14,
    },
    message: {
        color: '#fa8c56',
    },
    searchContainer: {
        borderRadius: 20,
        height: 40,
        borderWidth: 1,
        borderColor: '#b8b8b8',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },
    searchBox: {
        height: 36,
        fontSize: 18,
        color: '#acabab',
        marginLeft: 20,
        marginRight: 20,
        flex: 1,
    },
    tabButton: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    dialogContainer: {
        backgroundColor: '#000000bb',
        width: '80%',
    },
    dialogTitle: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 20,
    },
    dialogSwitchContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    borderBottom: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    dialogTimeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingVertical: 8,
        flexDirection: 'row',
    },
    dialogTimePlaceholder: {
        color: 'white',
        fontSize: 10,
        marginTop: 12,
        flex: 1,
    },
    dialogDescription: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
        marginTop: 16,
    },
    dialogSmallTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
    },
    input: {
        height: 42,
        width: '50%',
        fontSize: 14,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignSelf: 'center',
    },
});

class ContactsScreen extends Component<
    {
        navigation: any;
    },
    {
        contact_filter: number;
        messages: any[];
        loading: boolean;
        showOnboarding: boolean;
        newMessage: boolean;
        areaCodeTemp: string;
        areaCode: string;
        gettingNumber: boolean;
        pickContact: boolean;
        contacts: any[];
        selectedContact: string;
        message: string;
        keyword: string;
        followUpDialog: boolean;
        temp: any;
        deleteDialog: boolean;
    }
> {
    constructor(props: any) {
        super(props);

        this.state = {
            contact_filter: 1,
            newMessage: false,
            messages: [],
            loading: false,
            showOnboarding: false,
            areaCodeTemp: '',
            areaCode: '',
            gettingNumber: false,
            pickContact: false,
            contacts: [],
            selectedContact: '',
            message: '',
            keyword: '',
            followUpDialog: false,
            temp: null,
            deleteDialog: false,
        };
    }

    componentDidMount() {
        this.didAppear();
        this.props.navigation.addListener('willFocus', this.didAppear);
    }

    didAppear = () => {
        MessageCenterService.GetAllContactsSearch('', 500, 1).subscribe(
            (response: any) => {
                this.setState({
                    contacts: response.data,
                });
            },
        );
    };

    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    onGetPhoneNumber = () => {
        if (this.state.areaCodeTemp.length == 0) {
            return;
        }

        MessageCenterService.savePhoneNumber({
            areaCode: this.state.areaCodeTemp,
        }).subscribe((response: any) => {
            let data = response.data;
            this.setState({
                areaCode: data.phoneNumber,
            });
        });
    };

    onGetStartedPhone = () => {
        this.setState({
            showOnboarding: false,
        });
    };

    sendMessage = () => {
        if (this.state.selectedContact.length == 0) {
            Utils.presentToast('Please select the customer.');
            return;
        }

        if (this.state.message.length == 0) {
            Utils.presentToast('Please enter message');
            return;
        }

        this.setState({
            newMessage: false,
            loading: true,
        });

        MessageCenterService.sendNewMessage(
            this.state.message,
            this.state.selectedContact,
        ).subscribe((response: any) => {
            if (response.success) {
                this.setState({
                    loading: false,
                });
            }
        });
    };

    filter = () => {
        MessageCenterService.GetAllContactsSearch(
            this.state.keyword,
            500,
            1,
        ).subscribe((response: any) => {
            if (response.success) {
                if (response.pageinfo.totalCount > 0) {
                    console.log(response);
                    this.setState({
                        contacts: response.data,
                    });
                } else {
                    Utils.presentToast('No contacts to display.');
                }
            } else {
                Utils.presentToast('Error occured. Please try again later.');
            }
        });
    };

    markAsFavorite = (item: any) => {
        let param = 1;
        if (item.isFavourite) {
            param = 2;
        }
        MessageCenterService.MarkUnmarkFavourite(item.id, param).subscribe(
            (response: any) => {
                console.log(response);
                if (response.success) {
                    this.filter();
                }
            },
        );
    };

    onFollow = (item: any) => {
        this.setState({
            followUpDialog: true,
            temp: item,
        });
    };

    createFollowUp = () => {
        this.setState({
            followUpDialog: false,
        });

        let param = 1;
        if (this.state.temp.sendFollowUp == true) param = 2;

        MessageCenterService.markfollowup(this.state.temp.id, param).subscribe(
            (response: any) => {
                if (response.success) {
                    Utils.presentToast('Follow Up successfully');
                } else {
                    Utils.presentToast(
                        response.message + '. ' + response.submessage,
                    );
                }
            },
        );
    };
    onDelete = (item: any) => {
        this.setState({
            deleteDialog: true,
            temp: item,
        });
    };
    deleteContact = () => {
        this.setState({
            deleteDialog: false,
        });
        MessageCenterService.onDelete(this.state.temp.id).subscribe(
            (response: any) => {
                if (response.success) {
                    Utils.presentToast('Contact deleted successfully');
                    this.filter();
                } else {
                    Utils.presentToast(
                        response.message + '. ' + response.submessage,
                    );
                }
            },
        );
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true} />
                {/* <CmlSpinner visible={this.state.loading} /> */}
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <>
                        <View
                            style={{
                                flex: 1,
                                padding: 8,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    height: 60,
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                    marginBottom: 8,
                                }}>
                                <CmlButton
                                    title="New Message"
                                    backgroundColor="#ffa67a"
                                    style={{marginTop: 16}}
                                    onPress={() =>
                                        this.setState({newMessage: true})
                                    }
                                />
                                <CmlButton
                                    title="Add Contact"
                                    backgroundColor="#02b9db"
                                    style={{marginTop: 16, marginLeft: 8}}
                                    onPress={() =>
                                        this.props.navigation.push(
                                            'AddContactScreen',
                                        )
                                    }
                                />
                            </View>
                            <View style={styles.searchContainer}>
                                <CmlTextInput
                                    placeholder="search"
                                    style={styles.searchBox}
                                    value={this.state.keyword}
                                    onChangeText={(value: string) => {
                                        this.setState({
                                            keyword: value,
                                        });
                                    }}
                                    onSubmitEditing={() => {
                                        this.filter();
                                    }}
                                />
                                <AntDesign
                                    name="search1"
                                    size={20}
                                    color={'#a9afbb'}
                                />
                            </View>

                            <View style={styles.messageList}>
                                <FlatList
                                    data={this.state.contacts}
                                    renderItem={(item: any) => {
                                        return (
                                            <>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.props.navigation.push(
                                                            'MessageHistoryScreen',
                                                            {
                                                                contact:
                                                                    item.item,
                                                            },
                                                        )
                                                    }>
                                                    <View
                                                        style={[
                                                            styles.messageContainer,
                                                            {
                                                                backgroundColor:
                                                                    item.index %
                                                                        2 ==
                                                                    1
                                                                        ? '#f7f7f7'
                                                                        : 'white',
                                                            },
                                                        ]}>
                                                        <AntDesign
                                                            name={
                                                                item.item
                                                                    .isFavourite
                                                                    ? 'star'
                                                                    : 'staro'
                                                            }
                                                            size={20}
                                                            color={'#fa8c56'}
                                                            style={{
                                                                marginTop: 8,
                                                            }}
                                                        />
                                                        <View
                                                            style={
                                                                styles.messageInfoContainer
                                                            }>
                                                            <CmlText
                                                                style={
                                                                    styles.messageName
                                                                }>
                                                                {item.item
                                                                    .firstName +
                                                                    ' ' +
                                                                    (item.item
                                                                        .lastName
                                                                        ? item
                                                                              .item
                                                                              .lastName
                                                                        : '')}
                                                            </CmlText>
                                                            <CmlText
                                                                style={
                                                                    styles.messagePhone
                                                                }>
                                                                {
                                                                    item.item
                                                                        .companyName
                                                                }
                                                            </CmlText>
                                                            <CmlText
                                                                style={
                                                                    styles.messagePhone
                                                                }>
                                                                {
                                                                    item.item
                                                                        .email
                                                                }
                                                            </CmlText>
                                                            <CmlText
                                                                style={
                                                                    styles.messagePhone
                                                                }>
                                                                {
                                                                    item.item
                                                                        .phone
                                                                }
                                                            </CmlText>
                                                        </View>
                                                        <Menu>
                                                            <MenuTrigger>
                                                                <Entypo
                                                                    name="dots-three-vertical"
                                                                    size={20}
                                                                    color={
                                                                        '#7b7b7b'
                                                                    }
                                                                    style={{
                                                                        marginTop: 8,
                                                                    }}
                                                                />
                                                            </MenuTrigger>
                                                            <MenuOptions
                                                                customStyles={{
                                                                    optionText: {
                                                                        padding: 4,
                                                                    },
                                                                }}>
                                                                <MenuOption
                                                                    text={
                                                                        item
                                                                            .item
                                                                            .isFavourite
                                                                            ? 'Unmark As Favorite'
                                                                            : 'Mark As Favorite'
                                                                    }
                                                                    onSelect={() => {
                                                                        this.markAsFavorite(
                                                                            item.item,
                                                                        );
                                                                    }}
                                                                />
                                                                <MenuOption
                                                                    text="Create Follow Up Task"
                                                                    onSelect={() => {
                                                                        this.onFollow(
                                                                            item.item,
                                                                        );
                                                                    }}
                                                                />
                                                                <MenuOption
                                                                    text="Delete"
                                                                    onSelect={() => {
                                                                        this.onDelete(
                                                                            item.item,
                                                                        );
                                                                    }}
                                                                />
                                                            </MenuOptions>
                                                        </Menu>
                                                    </View>
                                                </TouchableOpacity>
                                            </>
                                        );
                                    }}></FlatList>
                            </View>
                        </View>
                    </>
                </TouchableWithoutFeedback>

                <Modal
                    isVisible={this.state.newMessage}
                    backdropOpacity={0}
                    onBackdropPress={() => this.setState({newMessage: false})}>
                    <View style={AppStyle.dialogContainer}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss();
                            }}>
                            <View>
                                <CmlText style={AppStyle.dialogSmallTitle}>
                                    New Message
                                </CmlText>
                                <View
                                    style={[
                                        {
                                            height: 70,
                                        },
                                    ]}></View>
                                <View style={AppStyle.dialogTimeContainer}>
                                    <CmlTextInput
                                        style={[
                                            AppStyle.dialogTimePlaceholder,
                                            {
                                                height: 100,
                                                textAlignVertical: 'top',
                                                fontSize: 14,
                                                width: '100%',
                                            },
                                        ]}
                                        placeholderTextColor="white"
                                        placeholder="Message"
                                        multiline={true}
                                        value={this.state.message}
                                        onChangeText={(value: string) => {
                                            this.setState({
                                                message: value,
                                            });
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 16,
                                    }}>
                                    <CmlButton
                                        title="Send"
                                        backgroundColor="#02b9db"
                                        style={{width: 100, marginTop: 16}}
                                        onPress={() => {
                                            this.sendMessage();
                                        }}
                                    />
                                    <View style={{flex: 1}} />
                                    <CmlButton
                                        title="Cancel"
                                        backgroundColor="#ffa67a"
                                        style={{
                                            width: 100,
                                            marginTop: 16,
                                            marginLeft: 16,
                                        }}
                                        onPress={() => {
                                            this.setState({
                                                newMessage: false,
                                                message: '',
                                                selectedContact: '',
                                            });
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: 60,
                                        width: '100%',
                                    }}>
                                    <MultiSelect
                                        items={this.state.contacts}
                                        uniqueKey="id"
                                        onSelectedItemsChange={(value: any) => {
                                            this.setState({
                                                selectedContact: value,
                                            });
                                        }}
                                        selectText={
                                            this.state.contacts.filter(
                                                (contact) =>
                                                    contact.id ==
                                                    this.state.selectedContact,
                                            ).length > 0
                                                ? this.state.contacts.filter(
                                                      (contact) =>
                                                          contact.id ==
                                                          this.state
                                                              .selectedContact,
                                                  )[0].firstName +
                                                  ' ' +
                                                  this.state.contacts.filter(
                                                      (contact) =>
                                                          contact.id ==
                                                          this.state
                                                              .selectedContact,
                                                  )[0].firstName
                                                : 'Select Contact'
                                        }
                                        searchInputPlaceholderText="Search Contacts..."
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        searchInputStyle={{color: '#CCC'}}
                                        submitButtonColor="#CCC"
                                        submitButtonText="Submit"
                                        single={true}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.followUpDialog}
                    backdropOpacity={0}
                    onBackdropPress={() =>
                        this.setState({followUpDialog: false})
                    }>
                    <View style={AppStyle.dialogContainer}>
                        <View>
                            <CmlText
                                style={[
                                    AppStyle.dialogTitle,
                                    {
                                        textAlign: 'center',
                                        fontSize: 16,
                                    },
                                ]}>
                                Confirmation
                            </CmlText>
                            <CmlText style={AppStyle.dialogDescription}>
                                Are you sure you want delete this campaign?
                            </CmlText>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: 32,
                                    justifyContent: 'flex-end',
                                }}>
                                <CmlButton
                                    title="Yes"
                                    backgroundColor="#ffa67a"
                                    style={{
                                        marginTop: 16,
                                        marginRight: 16,
                                    }}
                                    onPress={() => this.createFollowUp()}
                                />
                                <CmlButton
                                    title="No"
                                    backgroundColor="#02b9db"
                                    style={{marginTop: 16}}
                                    onPress={() =>
                                        this.setState({
                                            followUpDialog: false,
                                        })
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.deleteDialog}
                    backdropOpacity={0}
                    onBackdropPress={() =>
                        this.setState({deleteDialog: false})
                    }>
                    <View style={AppStyle.dialogContainer}>
                        <View>
                            <CmlText
                                style={[
                                    AppStyle.dialogTitle,
                                    {
                                        textAlign: 'center',
                                        fontSize: 16,
                                    },
                                ]}>
                                Confirmation
                            </CmlText>
                            <CmlText style={AppStyle.dialogDescription}>
                                Are you sure you would like to delete this?
                            </CmlText>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: 32,
                                    justifyContent: 'flex-end',
                                }}>
                                <CmlButton
                                    title="Yes"
                                    backgroundColor="#ffa67a"
                                    style={{
                                        marginTop: 16,
                                        marginRight: 16,
                                    }}
                                    onPress={() => this.deleteContact()}
                                />
                                <CmlButton
                                    title="No"
                                    backgroundColor="#02b9db"
                                    style={{marginTop: 16}}
                                    onPress={() =>
                                        this.setState({
                                            deleteDialog: false,
                                        })
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

export default ContactsScreen;
