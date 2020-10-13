import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import {ScrollView} from 'react-native-gesture-handler';
import {StackActions} from '@react-navigation/native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {CmlButton} from '../components/button';
import Modal from 'react-native-modal';
import AppStyle from '../shared/styles';
import {store} from '../redux/store';
import {UserService} from '../service/user.service';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {SCREEN_INDEX_SET} from '../redux/actionTypes/dashboard';
import {CLEAR_PROFILE, SAVE_CREDENTIAL} from '../redux/actionTypes/auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderRightWidth: 1,
        // borderRightColor: '#e6e6e6',
        borderTopColor: 'red',
        height: 300,
        marginTop: 56,
        backgroundColor: '#313131',
    },
    avatarContainer: {
        flexDirection: 'row',
        padding: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: 8,
    },
    nameContainer: {
        justifyContent: 'center',
        marginLeft: 16,
        alignItems: 'center',
    },
    welcome: {
        color: 'white',
        fontSize: 20,
    },
    name: {
        color: 'white',
        fontSize: 20,
    },
    menuContainer: {
        paddingLeft: 16,
        flexDirection: 'column',
        flex: 1,
        paddingBottom: 40,
        marginTop: 0,
        paddingTop: 16,
        borderTopColor: '#e3e5e6',
        borderTopWidth: 1,
        marginRight: 12,
        marginLeft: 12,
        marginBottom: 32,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    menuLabel: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 16,
        letterSpacing: 1.5,
        fontWeight: '500',
    },
    selectedMenu: {
        backgroundColor: '#777',
        borderRadius: 6,
    },
    selectedMenuText: {
        color: 'white',
    },
    fundButtonContainer: {
        backgroundColor: '#2c2d2d',
        borderRadius: 100,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        width: 160,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

class Menu extends Component<
    {navigation: any; screenIndex: number},
    {
        currentMenu: number;
        addFunds: boolean;
        billingInfo: any;
        expanded: boolean;
        funds: string;
    }
> {
    routes = [
        'Dashboard',
        'MessageCenter',
        'Campaign',
        'Sound',
        'ContactList',
        'Account',
        'Support',
        'Settings',
        'Contacts',
    ];
    constructor(props: any) {
        super(props);
        this.state = {
            currentMenu: 0,
            addFunds: false,
            billingInfo: null,
            expanded: false,
            funds: '',
        };
    }

    componentDidMount() {
        UserService.getParentBillingInfoByUserId().subscribe(
            (response: any) => {
                this.setState({billingInfo: response.data});
            },
        );
    }

    onMenuItem = (index: number) => {
        store.dispatch({
            type: SCREEN_INDEX_SET,
            payload: {
                screenIndex: index,
            },
        });
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate(this.routes[index]);
    };

    onCreateCampaign = () => {
        this.props.navigation.closeDrawer();
        this.props.navigation.push('CreatCampaignNavigator');
    };

    logout = () => {
        store.dispatch({
            type: CLEAR_PROFILE,
            payload: {},
        });
        store.dispatch({
            type: SAVE_CREDENTIAL,
            payload: {
                username: null,
                password: null,
            },
        });
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('AuthNavigator');
    };

    addFund = async () => {
        UserService.chargeCardByStripe({
            amount: +this.state.funds,
        }).subscribe((response: any) => {
            this.props.navigation.push('StripeScreen', {
                stripeKey: this.state.billingInfo.payments.StripePublishableKey,
                sessionId: response.data.checkoutSessionId,
            });
        });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView style={styles.container}>
                    <View style={styles.avatarContainer}>
                        {/* <FeatherIcon name="menu" color='#535353' size={28} style={{
                            alignSelf: 'center'
                        }}/> */}
                        <Image
                            source={{
                                uri:
                                    'https://media-exp1.licdn.com/dms/image/C5603AQEfagEkOfFzjw/profile-displayphoto-shrink_200_200/0?e=1594252800&v=beta&t=9R6aFkkkU0AOFbOf8AXDMG7YDTxxd_9OZy_AjgMS9Jo',
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.nameContainer}>
                            <CmlText style={styles.welcome}>Welcome,</CmlText>
                            <CmlText style={styles.name}>
                                Mr.
                                {
                                    store.getState().authReducer.loggedInContact?
                                    store.getState().authReducer.loggedInContact.firstName:''
                                }
                            </CmlText>
                            <TouchableOpacity
                                style={{
                                    marginTop: 16,
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 100,
                                }}
                                onPress={() =>
                                    this.setState({
                                        addFunds: true,
                                    })
                                }>
                                <View style={styles.fundButtonContainer}>
                                    <CmlText style={styles.buttonTitle}>
                                        Add Funds
                                    </CmlText>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginTop: 8,
                                }}
                                onPress={() => this.onCreateCampaign()}>
                                <View
                                    style={[
                                        styles.fundButtonContainer,
                                        {
                                            backgroundColor: '#fda478',
                                        },
                                    ]}>
                                    <CmlText style={styles.buttonTitle}>
                                        Create Campaign
                                    </CmlText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={() => this.onMenuItem(0)}>
                            <View
                                style={[
                                    styles.menuItem,
                                    this.props.screenIndex === 0 &&
                                        styles.selectedMenu,
                                ]}>
                                <Feather
                                    name="grid"
                                    size={24}
                                    color={
                                        this.props.screenIndex == 0
                                            ? 'white'
                                            : '#a9afbb'
                                    }
                                />
                                <CmlText
                                    style={[
                                        styles.menuLabel,
                                        this.props.screenIndex === 0 &&
                                            styles.selectedMenuText,
                                    ]}>
                                    Galaxy
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(1)}>
                            <View
                                style={[
                                    styles.menuItem,
                                    this.props.screenIndex === 1 &&
                                        styles.selectedMenu,
                                ]}>
                                <Feather
                                    name="mail"
                                    size={24}
                                    color={
                                        this.props.screenIndex == 1
                                            ? 'white'
                                            : '#a9afbb'
                                    }
                                />
                                <CmlText
                                    style={[
                                        styles.menuLabel,
                                        this.props.screenIndex === 1 &&
                                            styles.selectedMenuText,
                                    ]}>
                                    Titan
                                </CmlText>
                                <View style={{flex: 1}} />
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            expanded: !this.state.expanded,
                                        });
                                    }}>
                                    <Feather
                                        name={
                                            this.state.expanded
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        {this.state.expanded && (
                            <>
                                <TouchableOpacity
                                    onPress={() => this.onMenuItem(7)}>
                                    <View
                                        style={[
                                            styles.menuItem,
                                            this.props.screenIndex === 7 &&
                                                styles.selectedMenu,
                                            {
                                                marginLeft: 24,
                                            },
                                        ]}>
                                        <Feather
                                            name="settings"
                                            size={24}
                                            color={
                                                this.props.screenIndex == 7
                                                    ? 'white'
                                                    : '#a9afbb'
                                            }
                                        />
                                        <CmlText
                                            style={[
                                                styles.menuLabel,
                                                this.props.screenIndex === 7 &&
                                                    styles.selectedMenuText,
                                            ]}>
                                            Settings
                                        </CmlText>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.onMenuItem(8)}>
                                    <View
                                        style={[
                                            styles.menuItem,
                                            this.props.screenIndex === 8 &&
                                                styles.selectedMenu,
                                            {
                                                marginLeft: 24,
                                            },
                                        ]}>
                                        <FontAwesome
                                            name="list-alt"
                                            size={24}
                                            color={
                                                this.props.screenIndex == 8
                                                    ? 'white'
                                                    : '#a9afbb'
                                            }
                                        />
                                        <CmlText
                                            style={[
                                                styles.menuLabel,
                                                this.props.screenIndex === 8 &&
                                                    styles.selectedMenuText,
                                            ]}>
                                            Contacts
                                        </CmlText>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}

                        <TouchableOpacity onPress={() => this.onMenuItem(2)}>
                            <View
                                style={[
                                    styles.menuItem,
                                    this.props.screenIndex === 2 &&
                                        styles.selectedMenu,
                                ]}>
                                <Feather
                                    name="server"
                                    size={24}
                                    color={
                                        this.props.screenIndex == 2
                                            ? 'white'
                                            : '#a9afbb'
                                    }
                                />
                                <CmlText
                                    style={[
                                        styles.menuLabel,
                                        this.props.screenIndex === 2 &&
                                            styles.selectedMenuText,
                                    ]}>
                                    My Campaigns
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(3)}>
                            <View
                                style={[
                                    styles.menuItem,
                                    this.props.screenIndex === 3 &&
                                        styles.selectedMenu,
                                ]}>
                                <AntDesign
                                    name="sound"
                                    size={24}
                                    color={
                                        this.props.screenIndex == 3
                                            ? 'white'
                                            : '#a9afbb'
                                    }
                                />
                                <CmlText
                                    style={[
                                        styles.menuLabel,
                                        this.props.screenIndex === 3 &&
                                            styles.selectedMenuText,
                                    ]}>
                                    Sound
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(4)}>
                            <View
                                style={[
                                    styles.menuItem,
                                    this.props.screenIndex === 4 &&
                                        styles.selectedMenu,
                                ]}>
                                <AntDesign
                                    name="contacts"
                                    size={24}
                                    color={
                                        this.props.screenIndex == 4
                                            ? 'white'
                                            : '#a9afbb'
                                    }
                                />
                                <CmlText
                                    style={[
                                        styles.menuLabel,
                                        this.props.screenIndex === 4 &&
                                            styles.selectedMenuText,
                                    ]}>
                                    Contact List
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(5)}>
                            <View
                                style={[
                                    styles.menuItem,
                                    this.props.screenIndex === 5 &&
                                        styles.selectedMenu,
                                ]}>
                                <MaterialCommunityIcons
                                    name="account-circle-outline"
                                    size={24}
                                    color={
                                        this.props.screenIndex == 5
                                            ? 'white'
                                            : '#a9afbb'
                                    }
                                />
                                <CmlText
                                    style={[
                                        styles.menuLabel,
                                        this.props.screenIndex === 5 &&
                                            styles.selectedMenuText,
                                    ]}>
                                    Account
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onMenuItem(6)}>
                            <View
                                style={[
                                    styles.menuItem,
                                    this.props.screenIndex === 6 &&
                                        styles.selectedMenu,
                                ]}>
                                <Feather
                                    name="help-circle"
                                    size={24}
                                    color={
                                        this.props.screenIndex == 6
                                            ? 'white'
                                            : '#a9afbb'
                                    }
                                />
                                <CmlText
                                    style={[
                                        styles.menuLabel,
                                        this.props.screenIndex === 6 &&
                                            styles.selectedMenuText,
                                    ]}>
                                    Support
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                        <View style={{height: 50}}></View>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <View style={styles.menuItem}>
                                <AntDesign
                                    name="logout"
                                    size={24}
                                    color="#a9afbb"
                                />
                                <CmlText style={styles.menuLabel}>
                                    Logout
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal
                    isVisible={this.state.addFunds}
                    backdropOpacity={0}
                    onBackdropPress={() => this.setState({addFunds: false})}>
                    <View style={AppStyle.dialogContainer}>
                        <View>
                            <CmlText style={AppStyle.dialogTitle}>
                                Add Funds
                            </CmlText>
                            <CmlText style={AppStyle.dialogDescription}>
                                Enter a value for the amount of credits you
                                would like to add to the account.
                            </CmlText>

                            <View style={AppStyle.dialogTimeContainer}>
                                <FontAwesome
                                    name="dollar"
                                    size={20}
                                    color={'#ffa67a'}
                                    style={{
                                        marginTop: 20,
                                    }}
                                />
                                <CmlTextInput
                                    style={[
                                        AppStyle.dialogTimePlaceholder,
                                        {
                                            flex: 1,
                                            fontSize: 24,
                                            color: 'white',
                                            marginLeft: 8,
                                        },
                                    ]}
                                    keyboardType="numeric"
                                    value={this.state.funds}
                                    onChangeText={(value: any) => {
                                        this.setState({
                                            funds: value,
                                        });
                                    }}></CmlTextInput>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: 32,
                                    justifyContent: 'flex-end',
                                }}>
                                <CmlButton
                                    title="Add Funds"
                                    backgroundColor="#ffa67a"
                                    style={{marginTop: 16}}
                                    onPress={() => {
                                        this.addFund();
                                        this.setState({addFunds: false});
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        screenIndex: state.dashboardReducer.screenIndex,
    };
};

export default compose(connect(mapStateToProps))(Menu);
