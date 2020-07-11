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
import {and} from 'react-native-reanimated';
import {AnonymousSubject} from 'rxjs/internal/Subject';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    messageList: {
        // marginTop: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: '#9e9e9e',
        borderTopWidth: 0,
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

class MessageCenter extends Component<
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

        MessageCenterService.GetAllContactsSearch('', 500, 1).subscribe(
            (response: any) => {
                this.setState({
                    contacts: response.data,
                });
            },
        );
    }

    didAppear = () => {
        this.getMessageInfo();
        this.onTab(1);
    };

    getMessageInfo = () => {
        MessageCenterService.getMessageInfo().subscribe((response: any) => {
            let data = response.data;
            if (data.phoneNumber == '') {
                this.setState({
                    showOnboarding: true,
                });
            } else {
                this.setState({
                    showOnboarding: false,
                });
            }
        });
    };

    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    onTab = (index: number) => {
        this.setState(
            {
                contact_filter: index,
            },
            () => {
                this.loadContacts();
            },
        );
    };

    loadContacts = () => {
        this.setState({
            loading: true,
        });
        MessageCenterService.GetAllContacts(
            this.state.contact_filter + '',
        ).subscribe((response: any) => {
            this.setState({
                loading: false,
            });
            if (response.success)
                this.setState({
                    messages: response.data,
                });
        });
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
                this.onTab(this.state.contact_filter);
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
                    let data = response.data;
                    this.props.navigation.push('FilteredContactsScreen', {
                        contacts: data,
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
                if (response.success) {
                    this.onTab(this.state.contact_filter);
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
                    this.onTab(this.state.contact_filter);
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
                        {this.state.showOnboarding && (
                            <View
                                style={{
                                    padding: 8,
                                }}>
                                <CmlText
                                    style={{
                                        fontSize: 20,
                                        textAlign: 'center',
                                        marginVertical: 20,
                                    }}>
                                    Let's Add Your Phone Number
                                </CmlText>
                                <CmlText>
                                    It won’t be a bigger problem to find one
                                    video game lover in your neighbor. Since the
                                    introduction of Virtual Game, it has been
                                    achieving great heights so far as its
                                    popularity and technological advancement are
                                    concerned. The history of video game is as
                                    interesting as a fairy tale.
                                </CmlText>
                                <CmlTextInput
                                    style={styles.input}
                                    placeholder="Phone no"
                                    keyboardType="phone-pad"
                                    onChangeText={(value: string) =>
                                        this.setState({areaCodeTemp: value})
                                    }
                                />
                                {this.state.gettingNumber &&
                                    this.state.areaCode.length <= 0 && (
                                        <CmlText>
                                            Callmylist is securing your phone
                                            number. it can take several minutes.
                                        </CmlText>
                                    )}
                                {this.state.areaCode.length > 0 && (
                                    <CmlText
                                        style={{
                                            alignSelf: 'center',
                                            marginTop: 16,
                                        }}>
                                        Your Phone Number: {this.state.areaCode}
                                    </CmlText>
                                )}
                                {this.state.areaCode.length == 0 && (
                                    <CmlButton
                                        title="GET PHONE NUMBER"
                                        backgroundColor="#02b9db"
                                        style={{
                                            width: 200,
                                            marginTop: 16,
                                            marginRight: 16,
                                            alignSelf: 'center',
                                        }}
                                        onPress={() => this.onGetPhoneNumber()}
                                    />
                                )}
                                {this.state.areaCode.length > 0 && (
                                    <CmlButton
                                        title="GET STARTED"
                                        backgroundColor="#02b9db"
                                        style={{
                                            width: 200,
                                            marginTop: 16,
                                            marginRight: 16,
                                            alignSelf: 'center',
                                        }}
                                        onPress={() => this.onGetStartedPhone()}
                                    />
                                )}
                            </View>
                        )}
                        {!this.state.showOnboarding && (
                            <View
                                style={{
                                    flex: 1,
                                    padding: 8,
                                }}>
                                <View
                                    style={{
                                        height: 60,
                                        alignItems: 'flex-end',
                                    }}>
                                    <CmlButton
                                        title="New Message"
                                        backgroundColor="#ffa67a"
                                        style={{marginTop: 16}}
                                        onPress={() =>
                                            this.setState({newMessage: true})
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
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-end',
                                    }}>
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 16,
                                            flex: 1,
                                        }}
                                        onPress={() => this.onTab(1)}>
                                        <View
                                            style={[
                                                styles.tabButton,
                                                {
                                                    backgroundColor:
                                                        this.state
                                                            .contact_filter == 1
                                                            ? 'white'
                                                            : '#00b7d9',
                                                    borderColor:
                                                        this.state
                                                            .contact_filter == 1
                                                            ? '#9e9e9e'
                                                            : '#00b7d9',
                                                },
                                            ]}>
                                            <CmlText
                                                style={{
                                                    color:
                                                        this.state
                                                            .contact_filter == 1
                                                            ? 'black'
                                                            : 'white',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                }}>
                                                Recent
                                            </CmlText>
                                        </View>
                                    </TouchableOpacity>
                                    <View
                                        style={{
                                            width: 8,
                                            borderBottomWidth: 1,
                                            borderColor: '#9e9e9e',
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 16,
                                            flex: 1,
                                        }}
                                        onPress={() => this.onTab(2)}>
                                        <View
                                            style={[
                                                styles.tabButton,
                                                {
                                                    backgroundColor:
                                                        this.state
                                                            .contact_filter == 2
                                                            ? 'white'
                                                            : '#2c2d2d',
                                                    borderColor:
                                                        this.state
                                                            .contact_filter == 2
                                                            ? '#9e9e9e'
                                                            : '#2c2d2d',
                                                },
                                            ]}>
                                            <CmlText
                                                style={{
                                                    color:
                                                        this.state
                                                            .contact_filter == 2
                                                            ? 'black'
                                                            : 'white',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                }}>
                                                Favourite
                                            </CmlText>
                                        </View>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 8,
                                            borderBottomWidth: 1,
                                            borderColor: '#9e9e9e',
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            marginTop: 16,
                                            flex: 1,
                                        }}
                                        onPress={() => this.onTab(3)}>
                                        <View
                                            style={[
                                                styles.tabButton,
                                                {
                                                    backgroundColor:
                                                        this.state
                                                            .contact_filter == 3
                                                            ? 'white'
                                                            : '#fa8c56',
                                                    borderColor:
                                                        this.state
                                                            .contact_filter == 3
                                                            ? '#9e9e9e'
                                                            : '#fa8c56',
                                                },
                                            ]}>
                                            <CmlText
                                                style={{
                                                    color:
                                                        this.state
                                                            .contact_filter == 3
                                                            ? 'black'
                                                            : 'white',
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                }}>
                                                Follow up
                                            </CmlText>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.messageList}>
                                    <FlatList
                                        data={this.state.messages}
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
                                                                color={
                                                                    '#fa8c56'
                                                                }
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
                                                                        (item
                                                                            .item
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
                                                                        item
                                                                            .item
                                                                            .phone
                                                                    }
                                                                </CmlText>
                                                                <CmlText
                                                                    style={
                                                                        styles.messageTime
                                                                    }>
                                                                    {moment(
                                                                        item
                                                                            .item
                                                                            .createDate,
                                                                    ).format(
                                                                        'MMM dd, YYYY',
                                                                    )}
                                                                </CmlText>
                                                            </View>
                                                            <View
                                                                style={{
                                                                    flex: 1,
                                                                }}>
                                                                {item.item
                                                                    .recentMessage && (
                                                                    <CmlText
                                                                        style={
                                                                            styles.message
                                                                        }>
                                                                        {
                                                                            item
                                                                                .item
                                                                                .recentMessage
                                                                                .body
                                                                        }
                                                                    </CmlText>
                                                                )}
                                                            </View>
                                                            <Menu>
                                                                <MenuTrigger>
                                                                    <Entypo
                                                                        name="dots-three-vertical"
                                                                        size={
                                                                            20
                                                                        }
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
                                                                    {/* <MenuOption text="View Contact" /> */}
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
                        )}
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

export default MessageCenter;
