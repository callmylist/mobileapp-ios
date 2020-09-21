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
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

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
    messageList: {
        // marginTop: 20,
        flex: 1,
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
});

class FilteredContactsScreen extends Component<
    {
        navigation: any;
    },
    {
        messages: any[];
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {messages: []};
    }

    onBack = () => {
        this.props.navigation.pop();
    };

    componentDidMount() {
        this.setState({messages: this.props.navigation.state.params.contacts});
    }

    viewContact = (contact: any) => {
        this.props.navigation.push('ViewContactScreen', {contact: contact});
    };

    editContact = (contact: any) => {
        this.props.navigation.push('ViewContactScreen', {
            contact: contact,
            create: true,
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onBack} menu={false} />

                <View style={styles.container}>
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
                                                        contact: item.item,
                                                    },
                                                )
                                            }>
                                            <View
                                                style={[
                                                    styles.messageContainer,
                                                    {
                                                        backgroundColor:
                                                            item.index % 2 == 1
                                                                ? '#f7f7f7'
                                                                : 'white',
                                                    },
                                                ]}>
                                                <View
                                                    style={
                                                        styles.messageInfoContainer
                                                    }>
                                                    <CmlText
                                                        style={
                                                            styles.messageName
                                                        }>
                                                        {item.item.firstName +
                                                            ' ' +
                                                            (item.item.lastName
                                                                ? item.item
                                                                      .lastName
                                                                : '')}
                                                    </CmlText>
                                                    <CmlText
                                                        style={
                                                            styles.messagePhone
                                                        }>
                                                        {item.item.phone}
                                                    </CmlText>
                                                    <CmlText
                                                        style={
                                                            styles.messageTime
                                                        }>
                                                        {moment(
                                                            item.item
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
                                                                item.item
                                                                    .recentMessage
                                                                    .body
                                                            }
                                                        </CmlText>
                                                    )}
                                                </View>
                                                {/* <Menu>
                                                    <MenuTrigger>
                                                        <Entypo
                                                            name="dots-three-vertical"
                                                            size={20}
                                                            color={'#7b7b7b'}
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
                                                                item.item
                                                                    .status ===
                                                                1
                                                                    ? 'Create New Contact'
                                                                    : 'View Contact'
                                                            }
                                                            onSelect={() => {
                                                                if (
                                                                    item.item
                                                                        .status ===
                                                                    1
                                                                ) {
                                                                    this.editContact(
                                                                        item.item,
                                                                    );
                                                                } else {
                                                                    this.viewContact(
                                                                        item.item,
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                        <MenuOption
                                                            text={
                                                                item.item
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
                                                            text={
                                                                item.item
                                                                    .sendFollowUp
                                                                    ? 'Cancel Follow Up Task'
                                                                    : 'Create Follow Up Task'
                                                            }
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
                                                </Menu> */}
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                );
                            }}></FlatList>
                    </View>
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

export default compose(connect(mapStateToProps, {}))(FilteredContactsScreen);
