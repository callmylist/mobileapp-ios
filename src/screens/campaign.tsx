import React, {Component} from 'react';
import {StyleSheet, FlatList, View, SafeAreaView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/header';
import SemiCircleProgress from '../components/progress';
import { CmlText } from '../components/text'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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
    tableHeader: {
        backgroundColor: '#fff4ed',
        height: 40,
        flexDirection: 'row',
        paddingTop: 8,
        marginTop: 24
    },
    tableLabel: {
        fontSize: 12,
        color: '#4b4b4b',
        padding: 8,
        textAlign: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
    },
    itemDial: {
        color: '#38393b',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    itemContact: {
        color: '#3db005',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    itemName: {
        color: '#8c95aa',
        flex: 1
    },
    iconContainer: {
        flex: 0.5,
        paddingLeft: 24
    }
});

class Campaign extends Component {
    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    state = {
        campaigns: [
            {
                name: 'Rudi Doe',
                status: 1,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 0,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 1,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 0,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 0,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 1,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 0,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 0,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 0,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 0,
                contacts: 10,
                dials: 12
            },
            {
                name: 'Rudi Doe',
                status: 1,
                contacts: 10,
                dials: 12
            },
        ]
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={styles.container}>

                    <CmlText style={styles.campaignLabel}>
                        My Call Campaigns
                    </CmlText>

                    <View style={{
                        flex: 1
                    }}>
                        <View style={styles.tableHeader}>
                            <CmlText style={[styles.tableLabel, {
                                flex: 0.5
                            }]}>Status</CmlText>
                            <CmlText style={[styles.tableLabel, {
                                flex: 1,
                                textAlign: 'left'
                            }]}>Name</CmlText>
                            <CmlText style={[styles.tableLabel, {
                                flex: 1
                            }]}>Total Contacts</CmlText>
                            <CmlText style={[styles.tableLabel, {
                                flex: 1
                            }]}>Total Dialed</CmlText>
                        </View>
                        <FlatList
                            data={this.state.campaigns}
                            renderItem={(item: any) => {
                            return <TouchableOpacity onPress={() => this.props.navigation.push('CampaignDetailScreen')}>
                                <View style={[styles.item, {
                                    backgroundColor: item.index % 2 == 1? 'white': '#e4f9fd'
                                }]}>
                                    <View style={styles.iconContainer}>
                                        {item.item.status == 0 && <FontAwesome name="circle" size={20} color={'#ff3d00'}/>}
                                        {item.item.status == 1 && <Feather name="check-circle" size={20} color={'#0dac01'} />}
                                    </View>
                                    
                                    <CmlText style={styles.itemName}>{item.item.name}</CmlText>
                                    
                                    <CmlText style={styles.itemContact}>{item.item.contacts}</CmlText>
                                    
                                    <CmlText style={styles.itemDial}>{item.item.dials}</CmlText>
                                </View>
                            </TouchableOpacity>;
                            }}
                        >

                        </FlatList>

                    </View>
                </View>
            </SafeAreaView>
        );
    }
  }
  
  export default Campaign;