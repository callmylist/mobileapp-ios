import React, {Component} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'
import { ScrollView } from 'react-native-gesture-handler';
import { CmlButton } from '../components/button'

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

class Account extends Component {

    state = {
        children: [
            {
                name: 'Wang Dan',
                email: 'apaladin1993@outlook.com',
                funds: 256
            },
            {
                name: 'Wang Dan',
                email: 'apaladin1993@outlook.com',
                funds: 256
            },
            {
                name: 'Wang Dan',
                email: 'apaladin1993@outlook.com',
                funds: 256
            },
            {
                name: 'Wang Dan',
                email: 'apaladin1993@outlook.com',
                funds: 256
            },
            {
                name: 'Wang Dan',
                email: 'apaladin1993@outlook.com',
                funds: 256
            },
            {
                name: 'Wang Dan',
                email: 'apaladin1993@outlook.com',
                funds: 256
            },
        ]
    }

    componentDidMount() {
    }
    
    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={styles.container}>
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
                            <View style={{flex: 1}} />
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
                            <View style={{flex: 1}} />
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

                        <View style={{
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
                                    <CmlTextInput style={styles.editInput}>
                                        Dan
                                    </CmlTextInput>
                                </View>
                                <View style={{flex: 1}} />
                                <View style={[styles.editContainer, {
                                    width: '48%'
                                }]}>
                                    <CmlText style={styles.marginBottom}>
                                        Last Name
                                    </CmlText>
                                    <CmlTextInput style={styles.editInput}>
                                        Wang
                                    </CmlTextInput>
                                </View>
                            </View>
                            <View style={[styles.editContainer]}>
                                <CmlText style={styles.marginBottom}>
                                    Email
                                </CmlText>
                                <CmlTextInput style={styles.editInput}>
                                    apaladin1993@outlook.com
                                </CmlTextInput>
                            </View>
                            <View style={[styles.editContainer]}>
                                <CmlText style={styles.marginBottom}>
                                    Company
                                </CmlText>
                                <CmlTextInput style={styles.editInput}>
                                    Blast My Call
                                </CmlTextInput>
                            </View>
                            <View style={[styles.editContainer]}>
                                <CmlText style={styles.marginBottom}>
                                    Phone Number
                                </CmlText>
                                <CmlTextInput style={styles.editInput}>
                                    3135082344
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
                                    <CmlText style={styles.editInput}>
                                        09:00PM
                                    </CmlText>
                                </View>
                                <View style={{flex: 1}} />
                                <View style={[styles.editContainer, {
                                    width: '48%'
                                }]}>
                                    <CmlText style={styles.marginBottom}>
                                        End Time
                                    </CmlText>
                                    <CmlText style={styles.editInput}>
                                        09:00PM
                                    </CmlText>
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
                                    <CmlText style={styles.editInput}>
                                        US/Eastern Time (EST)
                                    </CmlText>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 16
                            }}>
                                <Image source={require("../assets/images/avatar.png")} style={{
                                    width: '25%',
                                    aspectRatio: 1
                                }} />
                                <View style={{
                                    justifyContent: 'center',
                                    padding: 16
                                }}>
                                    <CmlText style={{
                                        color: '#484848'
                                    }}>Change Profile Image</CmlText>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <CmlButton title="Text To Speech" backgroundColor="#ffa67a" style={{marginTop: 16}}/>
                                <CmlButton title="Upload Audio" backgroundColor="#02b9db" style={{marginTop: 16, marginLeft: 16}}/>
                            </View>
                        </View>

                        <CmlText style={{
                            fontSize: 18,
                            marginTop: 16,
                            textAlign: 'center'
                        }}>
                            Child Accounts
                        </CmlText>

                        <View style={{
                            borderWidth: 1,
                            borderColor: '#fa9a68',
                            borderRadius: 8,
                            marginTop: 8
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
                                        backgroundColor: item.index % 2 == 1? 'white': '#e4f9fd'
                                    }]}>
                                        <View style={styles.iconContainer}>
                                            {item.item.status == 0 && <FontAwesome name="circle" size={20} color={'#ff3d00'}/>}
                                            {item.item.status == 1 && <Feather name="check-circle" size={20} color={'#0dac01'} />}
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            padding: 4
                                        }}>
                                            <CmlText style={styles.itemName}>{item.item.name}</CmlText>
                                            <CmlText style={{
                                                color: '#7f8788',
                                                fontSize: 8
                                            }}>{'PM 5:25, 1/2/20'}</CmlText>

                                        </View>
                                        
                                        <CmlText style={styles.itemContact}>{item.item.email}</CmlText>
                                        
                                        <CmlText style={styles.itemDial}>${item.item.funds}</CmlText>
                                    </View>
                                </TouchableOpacity>;
                                }}
                            >

                            </FlatList>

                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
}
  
export default Account;