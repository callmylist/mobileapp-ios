import React, { Component } from 'react';
import {
    StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView, Image,
    KeyboardAvoidingView,
    Platform, Keyboard
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'
import { ScrollView } from 'react-native-gesture-handler';
import { CmlButton } from '../components/button'
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { UserService } from '../service/user.service'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select';
import AppConstants from '../utils/app_constants'
import Utils from '../utils';
import { UPDATE_PROFILE } from '../redux/actionTypes/auth'
import { store } from '../redux/store';
import { CmlSpinner } from '../components/loading';
import DocumentPicker from 'react-native-document-picker';

import Modal from 'react-native-modal';
import AppStyle from '../shared/styles'
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs'
import { CommonService } from '../service/common.service';

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
    campaignDesc: {
        fontSize: 16,
        textAlign: 'center',
        color: '#7c7c7c',
    },
    buttonContainer: {
        backgroundColor: '#0cbcdc',
        width: 180,
        height: 32,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 16
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginLeft: 4
    },
    itemContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 16
    },
    itemIcon: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#f57536',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeContainer: {
        width: "32%",
        aspectRatio: 1,
        borderRadius: 1000,
        borderWidth: 2,
        borderColor: '#ffa67e',
        alignItems: 'center',
        padding: 12
    },
    badgeLabel: {
        fontWeight: 'bold',
        fontSize: 10,
        color: '#ffa67e'
    },
    badgeDesc: {
        fontSize: 7,
        color: '#7b7b7b'
    },
    editContainer: {
        borderBottomColor: '#5f5f5f',
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingBottom: 4,
        marginVertical: 6
    },
    marginBottom: {
        marginBottom: 2
    },
    editInput: {
        color: '#767676'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
    },
    itemDial: {
        color: '#4b4b4b',
        flex: 1,
        textAlign: 'center',
    },
    itemContact: {
        color: '#4b4b4b',
        flex: 2,
    },
    itemName: {
        color: '#4b4b4b'
    },
    tableHeader: {
        backgroundColor: '#fff4ed',
        height: 40,
        flexDirection: 'row',
        paddingTop: 8,
    },
    tableLabel: {
        fontSize: 12,
        color: '#4b4b4b',
        padding: 8,
        textAlign: 'center'
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        color: '#767676',
        width: 1000,
        marginTop: 2
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#767676',
        width: '100%'
    },
});


class AccountScreen extends Component<{
    navigation: any,
    loggedInContact: any,
    assetsPath: string
}, {
    user: any,
    children: any[],
    startTimepicker: boolean,
    endTimepicker: boolean,
    restrictions: any,
    logoUrl: string,
    loading: boolean,
    updatePassword: boolean,
    existingPassword: string,
    newPassword: string,
    confirmPassword: string,
    deleteConfirm: boolean,
    lockAccount: boolean,
    currentAccount: any,
    deleteAccount: boolean
}> {
    timezones: any[] = []

    constructor(props: any) {
        super(props)

        let startDate = new Date();
        startDate.setHours(9)
        startDate.setMinutes(0);

        console.log(startDate.toISOString())

        let endDate = new Date();
        endDate.setHours(16)
        endDate.setMinutes(0);

        this.state = {
            user: null,
            children: [
            ],
            startTimepicker: false,
            endTimepicker: false,
            restrictions: {
                startTime: startDate,
                endTime: endDate,
                timeZone: "US/Eastern"
            },
            logoUrl: "",
            loading: false,
            updatePassword: false,
            deleteConfirm: false,
            existingPassword: "",
            newPassword: "",
            confirmPassword: "",
            lockAccount: false,
            currentAccount: null,
            deleteAccount: false
        }
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (prevProps.loggedInContact !== this.props.loggedInContact) {
            this.setState({
                user: this.props.loggedInContact,
                logoUrl: this.props.assetsPath + this.props.loggedInContact.customize.logoPath
            })
        }
    }

    componentDidMount() {

        this.setState({
            user: this.props.loggedInContact,
            logoUrl: this.props.assetsPath + this.props.loggedInContact.customize.logoPath
        })

        UserService.loadUserInfo().subscribe((response: any) => {
            var loggedInContact = this.props.loggedInContact

            loggedInContact.phone = response.data.phone
            loggedInContact.firstName = response.data.firstName
            loggedInContact.lastName = response.data.lastName
            loggedInContact.companyName = response.data.companyName
            loggedInContact.customize = response.data.customize

            store.dispatch({
                type: UPDATE_PROFILE,
                payload: {
                    loggedInContact: loggedInContact
                }
            })
            this.setState({
                user: loggedInContact
            })

            if (response.data.restrictions) {
                let startTime = new Date();
                startTime.setHours(response.data.restrictions.startTime[0])
                startTime.setMinutes(response.data.restrictions.startTime[1])

                let endTime = new Date();
                endTime.setHours(response.data.restrictions.endTime[0])
                endTime.setMinutes(response.data.restrictions.endTime[1])

                this.setState({
                    restrictions: {
                        startTime: startTime,
                        endTime: endTime,
                        timeZone: response.data.restrictions.timeZone
                    }
                })
            }
        })

        this.loadChildAccounts()
    }

    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    updateProfile = () => {
        if (this.state.user.firstName.length == 0) {
            Utils.presentToast("Please enter valid first name")
            return
        }
        if (this.state.user.lastName.length == 0) {
            Utils.presentToast("Please enter valid last name")
            return
        }
        if (this.state.user.companyName.length == 0) {
            Utils.presentToast("Please enter valid company name")
            return
        }
        if (this.state.user.email.length == 0) {
            Utils.presentToast("Please enter valid email")
            return
        }
        if (this.state.user.phone.length == 0 || !Utils.validatePhoneNumber(this.state.user.phone)) {
            Utils.presentToast("Please enter valid email")
            return
        }
        if (!this.state.restrictions.timeZone) {
            Utils.presentToast("Please select time zone")
            return
        }

        const user: any = {
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            companyName: this.state.user.companyName,
            email: this.state.user.email,
            phone: this.state.user.phone,
            password: "dummydummy",
            parentId: this.props.loggedInContact.parentId,
            restrictions: {
                startTime: [
                    this.state.restrictions.startTime.getHours(),
                    this.state.restrictions.startTime.getMinutes(),
                ],
                endTime: [
                    this.state.restrictions.endTime.getHours(),
                    this.state.restrictions.endTime.getMinutes(),
                ],
                timeZone: this.state.restrictions.timeZone
            }
        }

        this.setState({
            loading: true
        })

        UserService.saveAccountUpdate(user).subscribe((response: any) => {

            this.setState({
                loading: false
            })

            if (response.success) {
                Utils.presentToast("Successfully updated profile.")

                var loggedInContact = this.props.loggedInContact

                loggedInContact.phone = response.data.phone
                loggedInContact.firstName = response.data.firstName
                loggedInContact.lastName = response.data.lastName
                loggedInContact.companyName = response.data.companyName
                loggedInContact.customize = response.data.customize

                store.dispatch({
                    type: UPDATE_PROFILE,
                    payload: {
                        loggedInContact: loggedInContact
                    }
                })

                this.setState({
                    user: loggedInContact
                })
            }
            else {
                Utils.presentToast("Error occured. Please try again.")
            }
        })
    }

    updatePassword = () => {
        if (this.state.existingPassword.length == 0) {
            Utils.presentToast("Error occured. Please try again.")
            return;
        }
        if (this.state.newPassword.length < 8) {
            Utils.presentToast("Password length should be at least 8")
            return
        }
        if (this.state.confirmPassword.length < 8) {
            Utils.presentToast("Password length should be at least 8")
            return
        }

        if (this.state.newPassword != this.state.confirmPassword) {
            Utils.presentToast("Passwords does not match")
            return
        }

        let data = {
            oldPassword: this.state.existingPassword,
            newPassword: this.state.newPassword,
        }
        Keyboard.dismiss()
        UserService.updatePassword(data).subscribe((response: any) => {
            if (response.success) {
                Utils.presentToast("Updated password successfully.")
                this.setState({
                    updatePassword: false,
                    newPassword: "",
                    existingPassword: "",
                    confirmPassword: ""
                })
            }
            else {
                Utils.presentToast(response.message + ". " + response.submessage)
            }
        })
    }

    editLogo = async () => {

        ImagePicker.showImagePicker({}, (fileInfo: any) => {
            this.setState({
                loading: true
            })
            UserService.updateLogo(fileInfo, (response: any) => {
                console.log(response)
                this.setState({
                    loading: false
                })
                if (response.success) {
                    Utils.presentToast("Successfully updated logo.")
                    var loggedInContact = this.props.loggedInContact

                    loggedInContact.phone = response.data.phone
                    loggedInContact.firstName = response.data.firstName
                    loggedInContact.lastName = response.data.lastName
                    loggedInContact.companyName = response.data.companyName
                    loggedInContact.customize = response.data.customize
                    store.dispatch({
                        type: UPDATE_PROFILE,
                        payload: {
                            loggedInContact: loggedInContact
                        }
                    })
                    this.setState({
                        user: loggedInContact
                    })
                }
                else {
                    Utils.presentToast(response.message + ". " + response.submessage)
                }
            });
        })
    }

    deleteLogo = () => {
        this.setState({
            loading: true,
            deleteConfirm: false
        })
        UserService.deleteAccountLogo().subscribe((response: any) => {
            this.setState({
                loading: false,
            })
            if (response.success) {
                Utils.presentToast("Account logo deleted successfully")

                var loggedInContact = this.props.loggedInContact

                loggedInContact.phone = response.data.phone
                loggedInContact.firstName = response.data.firstName
                loggedInContact.lastName = response.data.lastName
                loggedInContact.companyName = response.data.companyName
                loggedInContact.customize = response.data.customize
                store.dispatch({
                    type: UPDATE_PROFILE,
                    payload: {
                        loggedInContact: loggedInContact
                    }
                })
                this.setState({
                    user: loggedInContact
                })
            }
            else {
                Utils.presentToast("Error occured. Please try again.")
            }
        });
    }

    loadChildAccounts = () => {
        CommonService.getChildAccount().subscribe((response: any) => {
            if (response.success) {
                this.setState({
                    children: response.data
                })
            }
        })
    }

    lockAccount = () => {
        this.setState({
            lockAccount: false,
            loading: true
        })

        CommonService.lockChildAccount(this.state.currentAccount.id).subscribe((response: any) => {
            this.setState({
                currentAccount: null,
                loading: false
            })
            if (response.success) {
                Utils.presentToast("Child account locked successfully.")
                this.loadChildAccounts()
            }
            else {
                Utils.presentToast(response.message + ". " + response.submessage)
            }
        })
    }

    deleteAccount = () => {
        this.setState({
            deleteAccount: false,
            loading: true
        })

        CommonService.deleteChildAccount(this.state.currentAccount.id).subscribe((response: any) => {
            this.setState({
                currentAccount: null,
                loading: false
            })
            if (response.success) {
                Utils.presentToast("Child account deleted successfully.")
                this.loadChildAccounts()
            }
            else {
                Utils.presentToast("Error occured. Please try again later.")
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header onMenu={this.onMenu} menu={true} />
                <CmlSpinner
                    visible={this.state.loading}
                />
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
                    <ScrollView>
                        <CmlText style={styles.campaignLabel}>
                            Account
                        </CmlText>

                        <CmlText style={styles.campaignDesc}>
                            Billing Details
                        </CmlText>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 16,
                            paddingHorizontal: 16
                        }}>
                            <View style={styles.badgeContainer}>
                                <CmlText style={styles.badgeLabel}>
                                    Plan
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    Pay As You Go
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    Plan Renewal
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    1/1/2020
                                </CmlText>
                            </View>
                            <View style={{ flex: 1 }} />
                            <View style={[styles.badgeContainer, {
                                borderColor: '#21bedf'
                            }]}>
                                <CmlText style={[styles.badgeLabel, {
                                    color: '#21bedf'
                                }]}>
                                    Calls
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    Price / Call
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    $0.08
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    Billing Increment:
                                </CmlText>
                            </View>
                            <View style={{ flex: 1 }} />
                            <View style={[styles.badgeContainer, {
                                borderColor: '#474747'
                            }]}>
                                <CmlText style={[styles.badgeLabel, {
                                    color: '#474747'
                                }]}>
                                    Current Funds
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    Funds Available:
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    $-397.60
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    Estimated Calls Left:
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    -4,970
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    Estimated Texts Left:
                                </CmlText>
                                <CmlText style={styles.badgeDesc}>
                                    90,093
                                </CmlText>
                            </View>
                        </View>
                        <CmlText style={styles.campaignLabel}>
                            Edit Contact
                        </CmlText>
                        {
                            this.state.user && <View style={{
                                padding: 16,
                                borderWidth: 1,
                                borderColor: '#fa9a68',
                                borderRadius: 8,
                                marginTop: 8
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={[styles.editContainer, {
                                        width: '48%'
                                    }]}>
                                        <CmlText style={styles.marginBottom}>
                                            First Name
                                            </CmlText>
                                        <CmlTextInput
                                            style={styles.editInput}
                                            value={this.state.user.firstName}
                                            onChangeText={(value: any) => {
                                                this.setState({
                                                    user: {
                                                        ...this.state.user,
                                                        firstName: value
                                                    }
                                                })
                                            }}>
                                        </CmlTextInput>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <View style={[styles.editContainer, {
                                        width: '48%'
                                    }]}>
                                        <CmlText style={styles.marginBottom}>
                                            Last Name
                                            </CmlText>
                                        <CmlTextInput style={styles.editInput}
                                            value={this.state.user.lastName}
                                            onChangeText={(value: any) => {
                                                this.setState({
                                                    user: {
                                                        ...this.state.user,
                                                        lastName: value
                                                    }
                                                })
                                            }}>

                                        </CmlTextInput>
                                    </View>
                                </View>
                                <View style={[styles.editContainer]}>
                                    <CmlText style={styles.marginBottom}>
                                        Email
                                        </CmlText>
                                    <CmlTextInput style={styles.editInput}
                                        value={this.state.user.email}
                                        onChangeText={(value: any) => {
                                            this.setState({
                                                user: {
                                                    ...this.state.user,
                                                    email: value
                                                }
                                            })
                                        }}>
                                    </CmlTextInput>
                                </View>
                                <View style={[styles.editContainer]}>
                                    <CmlText style={styles.marginBottom}>
                                        Company
                                        </CmlText>
                                    <CmlTextInput style={styles.editInput}
                                        value={this.state.user.companyName}
                                        onChangeText={(value: any) => {
                                            this.setState({
                                                user: {
                                                    ...this.state.user,
                                                    companyName: value
                                                }
                                            })
                                        }}>
                                    </CmlTextInput>
                                </View>
                                <View style={[styles.editContainer]}>
                                    <CmlText style={styles.marginBottom}>
                                        Phone Number
                                        </CmlText>
                                    <CmlTextInput style={styles.editInput}
                                        value={this.state.user.phone}
                                        onChangeText={(value: any) => {
                                            this.setState({
                                                user: {
                                                    ...this.state.user,
                                                    phone: value
                                                }
                                            })
                                        }}>
                                    </CmlTextInput>
                                </View>

                                <CmlText style={{
                                    fontSize: 18,
                                    marginTop: 16
                                }}>
                                    Time Restrictions
                                    </CmlText>
                                <CmlText style={{
                                    fontSize: 10,
                                    color: '#404040'
                                }}>
                                    Contacts will not be dialed outside these hours
                                    </CmlText>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={[styles.editContainer, {
                                        width: '48%'
                                    }]}>
                                        <CmlText style={styles.marginBottom}>
                                            Start Time
                                            </CmlText>
                                        <TouchableOpacity onPress={() => {

                                            this.setState({
                                                startTimepicker: true,
                                            })
                                        }
                                        }>

                                            <CmlText style={styles.editInput}>
                                                {moment(this.state.restrictions.startTime).format('h:mm a')}
                                            </CmlText>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={this.state.startTimepicker}
                                            mode="time"
                                            date={this.state.restrictions.startTime}
                                            onConfirm={(value: any) => this.setState({
                                                restrictions: {
                                                    ...this.state.restrictions,
                                                    startTime: value
                                                },
                                                startTimepicker: false
                                            })}
                                            onCancel={() => this.setState({
                                                startTimepicker: false
                                            })}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }} />
                                    <View style={[styles.editContainer, {
                                        width: '48%'
                                    }]}>
                                        <CmlText style={styles.marginBottom}>
                                            End Time
                                        </CmlText>
                                        <TouchableOpacity onPress={() => {

                                            this.setState({
                                                endTimepicker: true,
                                            })
                                        }
                                        }>

                                            <CmlText style={styles.editInput}>
                                                {moment(this.state.restrictions.endTime).format('h:mm a')}
                                            </CmlText>
                                        </TouchableOpacity>
                                        <DateTimePickerModal
                                            isVisible={this.state.endTimepicker}
                                            mode="time"
                                            date={this.state.restrictions.endTime}
                                            onConfirm={(value: any) => this.setState({
                                                restrictions: {
                                                    ...this.state.restrictions,
                                                    endTime: value
                                                },
                                                endTimepicker: false
                                            })}
                                            onCancel={() => this.setState({
                                                endTimepicker: false
                                            })}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={[styles.editContainer, {
                                        width: '48%'
                                    }]}>
                                        <CmlText style={styles.marginBottom}>
                                            Time Zone
                                        </CmlText>
                                        <RNPickerSelect
                                            style={pickerSelectStyles}
                                            value={this.state.restrictions.timeZone}
                                            onValueChange={(value) => {
                                                this.setState({
                                                    restrictions: {
                                                        ...this.state.restrictions,
                                                        timeZone: value
                                                    }
                                                })
                                            }}
                                            items={AppConstants.timeZones}
                                        />
                                    </View>
                                </View>


                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <CmlButton title="RESET PASSWORD" backgroundColor="#ffa67a" style={{ marginTop: 16 }} onPress={() => {
                                        this.setState({
                                            updatePassword: true
                                        })
                                    }} />
                                    <CmlButton title="UPDATE" backgroundColor="#02b9db" style={{ marginTop: 16, marginLeft: 16 }} onPress={() => this.updateProfile()} />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 16
                                }}>
                                    <Image source={{
                                        uri: this.props.assetsPath + this.state.user.customize.logoPath
                                    }} style={{
                                        width: '25%',
                                        aspectRatio: 1,
                                        borderWidth: 1,
                                        borderColor: '#767676',
                                    }} />
                                    <View style={{
                                        justifyContent: 'center',
                                        padding: 16
                                    }}>
                                        <TouchableOpacity onPress={() => this.editLogo()}>
                                            <MaterialCommunityIcons name="square-edit-outline" size={32} color='#767676' />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({
                                            deleteConfirm: true
                                        })}>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }

                        <View>
                            <CmlText style={{
                                fontSize: 18,
                                marginTop: 16,
                                textAlign: 'center'
                            }}>
                                Child Accounts
                            </CmlText>

                            <TouchableOpacity style={{
                                position: 'absolute',
                                top: 8,
                                right: 16
                            }} onPress={() => this.props.navigation.push('AddAccountScreen')}>
                                <AntDesign name="adduser" size={32} color='#767676' />

                            </TouchableOpacity>
                        </View>

                        <View style={{
                            borderWidth: 1,
                            borderColor: '#fa9a68',
                            borderRadius: 8,
                            marginTop: 8,
                            overflow: 'hidden'
                        }}>
                            <View style={styles.tableHeader}>
                                <CmlText style={[styles.tableLabel, {
                                    flex: 1,
                                    textAlign: 'left'
                                }]}>Name</CmlText>
                                <CmlText style={[styles.tableLabel, {
                                    flex: 1
                                }]}>User Email</CmlText>
                                <CmlText style={[styles.tableLabel, {
                                    flex: 1
                                }]}>Funds Available</CmlText>
                            </View>
                            <FlatList
                                data={this.state.children}
                                renderItem={(item: any) => {
                                    return <TouchableOpacity>
                                        <View style={[styles.item, {
                                            backgroundColor: item.index % 2 == 1 ? 'white' : '#e4f9fd'
                                        }]}>
                                            <View style={{
                                                flex: 1,
                                                padding: 4
                                            }}>
                                                <CmlText style={styles.itemName}>{item.item.name}</CmlText>
                                                <CmlText style={{
                                                    color: '#7f8788',
                                                    fontSize: 8
                                                }}>{moment(item.item.createDate).format('MM/DD/YY, h:mm A')}</CmlText>

                                            </View>

                                            <CmlText style={styles.itemContact}>{item.item.email}</CmlText>

                                            <CmlText style={styles.itemDial}>${item.item.fundsavailable}</CmlText>

                                            <View style={{
                                                width: 40
                                            }}>
                                                <Menu>
                                                    <MenuTrigger customStyles={
                                                        {
                                                            triggerTouchable: {
                                                                underlayColor: '#00000000',
                                                                activeOpacity: 70,
                                                            }
                                                        }
                                                    }>
                                                        <Entypo name="dots-three-vertical" size={20} color={'#7b7b7b'} style={{ marginTop: 8 }} />
                                                    </MenuTrigger>
                                                    <MenuOptions customStyles={{
                                                        optionText: {
                                                            padding: 4
                                                        }
                                                    }}>
                                                        <MenuOption text='Edit Account' />
                                                        <MenuOption text='Lock' onSelect={() => {
                                                            this.setState({
                                                                currentAccount: item.item,
                                                                lockAccount: true
                                                            })
                                                        }} />
                                                        <MenuOption text='Add Funds' />
                                                        <MenuOption text='Delete' onSelect={() => {
                                                            this.setState({
                                                                currentAccount: item.item,
                                                                deleteAccount: true
                                                            })
                                                        }} />
                                                    </MenuOptions>
                                                </Menu>
                                            </View>
                                        </View>
                                    </TouchableOpacity>;
                                }}
                            />
                        </View>
                    </ScrollView>
                    <Modal
                        isVisible={this.state.updatePassword}
                        backdropOpacity={0}
                        onBackdropPress={() =>
                            this.setState({
                                updatePassword: false,
                                existingPassword: "",
                                newPassword: "",
                                confirmPassword: ""
                            })
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
                                    Update Password
                                </CmlText>
                                <View>

                                    <View style={AppStyle.dialogTimeContainer}>
                                        <CmlTextInput style={[AppStyle.dialogTimePlaceholder, {
                                            width: '100%',
                                            fontSize: 14
                                        }]}
                                            secureTextEntry={true}
                                            placeholder="Existing Password"
                                            placeholderTextColor="#bbbbbb"
                                            value={this.state.existingPassword}
                                            onChangeText={(value: string) =>
                                                this.setState({ existingPassword: value })
                                            }></CmlTextInput>
                                    </View>

                                    <View style={AppStyle.dialogTimeContainer}>
                                        <CmlTextInput style={[AppStyle.dialogTimePlaceholder, {
                                            width: '100%',
                                            fontSize: 14
                                        }]}
                                            secureTextEntry={true}
                                            placeholder="New Password"
                                            placeholderTextColor="#bbbbbb"
                                            value={this.state.newPassword}
                                            onChangeText={(value: string) =>
                                                this.setState({ newPassword: value })
                                            }></CmlTextInput>
                                    </View>

                                    <View style={AppStyle.dialogTimeContainer}>
                                        <CmlTextInput style={[AppStyle.dialogTimePlaceholder, {
                                            width: '100%',
                                            fontSize: 14
                                        }]}
                                            secureTextEntry={true}
                                            placeholder="Confirm Password"
                                            placeholderTextColor="#bbbbbb"
                                            value={this.state.confirmPassword}
                                            onChangeText={(value: string) =>
                                                this.setState({ confirmPassword: value })
                                            }></CmlTextInput>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        width: '100%',
                                        height: 32,
                                        justifyContent: 'flex-end',
                                    }}>
                                    <CmlButton
                                        title="Cancel"
                                        backgroundColor="#ffa67a"
                                        style={{ marginTop: 16, marginRight: 16 }}
                                        onPress={() => this.setState({
                                            updatePassword: false,
                                            existingPassword: "",
                                            newPassword: "",
                                            confirmPassword: ""
                                        })}
                                    />
                                    <CmlButton
                                        title="Save"
                                        backgroundColor="#02b9db"
                                        style={{ marginTop: 16 }}
                                        onPress={() => this.updatePassword()}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>


                    <Modal
                        isVisible={this.state.deleteConfirm}
                        backdropOpacity={0}
                        onBackdropPress={() =>
                            this.setState({ deleteConfirm: false })
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
                                    Are you sure you want delete?
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
                                        style={{ marginTop: 16, marginRight: 16 }}
                                        onPress={() => this.deleteLogo()}
                                    />
                                    <CmlButton
                                        title="No"
                                        backgroundColor="#02b9db"
                                        style={{ marginTop: 16 }}
                                        onPress={() => this.setState({ deleteConfirm: false })}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        isVisible={this.state.lockAccount}
                        backdropOpacity={0}
                        onBackdropPress={() =>
                            this.setState({ lockAccount: false })
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
                                    Are you sure you want lock this child account?
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
                                        style={{ marginTop: 16, marginRight: 16 }}
                                        onPress={() => this.lockAccount()}
                                    />
                                    <CmlButton
                                        title="No"
                                        backgroundColor="#02b9db"
                                        style={{ marginTop: 16 }}
                                        onPress={() => this.setState({ lockAccount: false, currentAccount: null })}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        isVisible={this.state.deleteAccount}
                        backdropOpacity={0}
                        onBackdropPress={() =>
                            this.setState({ deleteAccount: false })
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
                                    Are you sure you want delete this child account?
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
                                        style={{ marginTop: 16, marginRight: 16 }}
                                        onPress={() => this.deleteAccount()}
                                    />
                                    <CmlButton
                                        title="No"
                                        backgroundColor="#02b9db"
                                        style={{ marginTop: 16 }}
                                        onPress={() => this.setState({ deleteAccount: false, currentAccount: null })}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loggedInContact: state.authReducer.loggedInContact,
        assetsPath: state.authReducer.assets.assetsPath
    };
};

export default compose(connect(mapStateToProps, {}))(AccountScreen);