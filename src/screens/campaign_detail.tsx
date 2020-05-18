import React, {Component} from 'react';
import {StyleSheet, FlatList, View, SafeAreaView} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header';
import SemiCircleProgress from '../components/progress';
import { CmlText } from '../components/text'
import { ScrollView } from 'react-native-gesture-handler';
import { Menu, MenuTrigger, MenuOptions, MenuOption} from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1
    }, 
    campaignLabel: {
        fontSize: 20,
        textAlign: 'center',
        color: '#515252',
        marginLeft: 8
    },
    graphContainer: {
        borderRadius: 10,
        borderColor: '#fdd2bd',
        borderWidth: 1,
        marginTop: 8,
        marginBottom: 8,
    },
    percentLabel: { 
        fontSize: 32, 
        color: "#5a6378" 
    },
    listLabel: {
        color: '#4b4b4b',
        flex: 1,
        textAlign: 'center',
        fontWeight: '600'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32
    }
});

class CampaignDetail extends Component {

    state = {
        campaignDetail: [
            ["Campaign ID", "5e9d0 5e9d0 5e9d0"],
            ["Date Sent", "05:10:54 4/20/2020"],
            ["Caller ID", "10"],
            ["Transfer", "10"],
            ["DNC", "10"],
            ["DNC Digit", "10"],
            ["Live Listening Duration", "10"],
            ["Contact List", "10"],
            ["Campaign Cost", "10"]
        ],
        campaignDetail1: [
            ["Date Sent", "05:10:54 4/20/2020"],
            ["CPM", "10"],
            ["Total Contacts", "10"],
            ["Total Dialed", "10"],
            ["Live", "10"],
            ["Voicemail", "10"],
            ["Transfer", "10"],
            ["DNC", "10"],
            ["Avg. Listening Duration", "10"]
        ],
        history: [
            ["Date Sent", "05:10:54 4/20/2020"],
            ["Campaign Status", "NEW"]
        ]
    }

    onBack = () => {
        this.props.navigation.pop()
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onBack} menu={false}/>
                <View style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16
                    }}>
                        <View  style={{flex: 1}} />
                        <AntDesign name="checkcircle" size={20} color={'#0dac01'} />
                        <CmlText style={styles.campaignLabel}>
                            Campaign 1
                        </CmlText>
                        <View  style={{flex: 1}} />
                        <View style={{
                            width: 20
                        }}>
                            <Menu>
                                <MenuTrigger>
                                    <Entypo name="dots-three-vertical" size={20} color={'#7b7b7b'} style={{marginTop: 8}}/>
                                </MenuTrigger>
                                <MenuOptions customStyles={{
                                    optionText: {
                                        padding: 4
                                    }
                                }}>
                                    <MenuOption text='Start Campaign' />
                                    <MenuOption text='Rerun Campaign' />
                                    <MenuOption text='Send Test Call' />
                                    <MenuOption text='View Campaign' />
                                    <MenuOption text='Delete' />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>



                    <ScrollView>
                        <View style={[styles.graphContainer, {
                            padding: 16,
                            flexDirection: 'row'
                        }]}>
                            <View style={{
                                width: 170,
                                paddingTop: 12
                            }}>
                                <SemiCircleProgress
                                    percentage={35}
                                    progressColor={"#cd5917"}
                                    progressWidth={20}
                                    progressShadowColor={'#f0f0f0'}
                                    circleRadius={80}
                                >
                                    <CmlText style={styles.percentLabel}>35%</CmlText>
                                </SemiCircleProgress>
                            </View>

                            <View style={{
                                flex: 1
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'baseline'
                                }}>
                                    <CmlText style={{
                                        fontSize: 40,
                                        color: '#5a6378'
                                    }}>44%</CmlText>
                                    <CmlText style={{
                                        fontSize: 12,
                                        color: '#5a6378'
                                    }}> OF TOTAL CALL</CmlText>
                                </View>
                                <CmlText style={{
                                    color: '#a3aec8'
                                }}>
                                    0m 0s Average Live Answer Listen Duration
                                </CmlText>
                            </View>

                        </View>
                        
                        <View style={[styles.graphContainer]}>
                            {
                                this.state.campaignDetail.map((item: string[], index: number) => {
                                    return <View style={[styles.itemContainer, {
                                        backgroundColor: index % 2 == 0?'white':'#e4f9fd'
                                    }]}>
                                        <CmlText style={[styles.listLabel, {
                                            textAlign: 'left',
                                            paddingLeft: 24
                                        }]}>{item[0]}</CmlText>
                                        
                                        <CmlText style={[styles.listLabel, {
                                            color: '#3db005'
                                        }]}>{item[1]}</CmlText>
                                    </View>
                                })
                            }
                        </View>
                        
                        <View style={[styles.graphContainer]}>
                            {
                                this.state.campaignDetail1.map((item: string[], index: number) => {
                                    return <View style={[styles.itemContainer, {
                                        backgroundColor: index % 2 == 0?'white':'#e4f9fd'
                                    }]}>
                                        <CmlText style={[styles.listLabel, {
                                            textAlign: 'left',
                                            paddingLeft: 24
                                        }]}>{item[0]}</CmlText>
                                        
                                        <CmlText style={[styles.listLabel, {
                                            color: '#3db005'
                                        }]}>{item[1]}</CmlText>
                                    </View>
                                })
                            }
                        </View>
                        
                        <View style={[styles.graphContainer]}>
                            {
                                this.state.history.map((item: string[], index: number) => {
                                    return <View style={[styles.itemContainer, {
                                        backgroundColor: index % 2 == 0?'white':'#e4f9fd'
                                    }]}>
                                        <CmlText style={[styles.listLabel, {
                                            textAlign: 'left',
                                            paddingLeft: 24
                                        }]}>{item[0]}</CmlText>
                                        
                                        <CmlText style={[styles.listLabel, {
                                            color: '#3db005'
                                        }]}>{item[1]}</CmlText>
                                    </View>
                                })
                            }
                        </View>
                    </ScrollView>

                </View>
            </SafeAreaView>
        );
    }
  }
  
  export default CampaignDetail;