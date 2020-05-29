import React, { Component } from 'react';
import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/header';
import SemiCircleProgress from '../components/progress';
import { CmlText } from '../components/text'
import { ScrollView } from 'react-native-gesture-handler';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import Entypo from 'react-native-vector-icons/Entypo';
import { ContactService } from '../service/contact.service'
import Utils from '../utils'
import { StatusIcon } from "../components/campaign_status";
import moment from 'moment'
import { CampaignService } from '../service/campaign.service';
import { CmlSpinner } from '../components/loading';

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
        fontWeight: '600',
        fontSize: 10
    },
    listValue: {
        color: '#4b4b4b',
        flex: 2,
        textAlign: 'center',
        fontWeight: '600'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32
    }
});

class CampaignDetail extends Component<{
    navigation: any
}, {
    campaign: any,
    campaignDetail: any[],
    callDetail: any[],
    contactListName: string,
    loading: boolean
}> {
    constructor(props: any) {
        super(props)

        this.state = {
            campaign: null,
            campaignDetail: [],
            callDetail: [],
            contactListName: "",
            loading: false
        }
    }
    componentDidMount() {
        ContactService.getContactInfo(this.props.navigation.state.params.campaign.contactlistId).subscribe((response: any) => {
            this.setState({
                contactListName: response.data.name
            })
        })
        this.setState({
            campaign: this.props.navigation.state.params.campaign,
            campaignDetail: [
                ["Campaign ID", this.props.navigation.state.params.campaign.id],
                ["Date Sent", moment(this.props.navigation.state.params.campaign.updateDate).format('MM/DD/yyyy ') + moment(this.props.navigation.state.params.campaign.updateDate).format('hh:mm:ss A')],
                ["Caller ID", this.props.navigation.state.params.campaign.call.callerId],
                ["Transfer", this.props.navigation.state.params.campaign.call.transfer ? 'Yes' : 'No'],
                ["DNC", this.props.navigation.state.params.campaign.call.dnc ? 'Y' : 'N'],
                ["DNC Digit", this.props.navigation.state.params.campaign.call.dnc ? this.props.navigation.state.params.campaign.call.dnc.digit : 'N'],
                ["Live Listening Duration", this.props.navigation.state.params.campaign.call.stats.liveDuration],
                ["Contact List", ""],
                ["Campaign Cost", '$' + this.props.navigation.state.params.campaign.cost.campaignCost.toFixed(2)]
            ],
            callDetail: [
                ["Date Sent", moment(this.props.navigation.state.params.campaign.updateDate).format('MM/DD/yyyy ')],
                ["CPM", this.props.navigation.state.params.campaign.call.settings.cpm],
                ["Total Contacts", this.props.navigation.state.params.campaign.call.stats.total],
                ["Total Dialed", this.props.navigation.state.params.campaign.call.stats.dialed],
                ["Live", this.props.navigation.state.params.campaign.call.stats.live],
                ["Voicemail", this.props.navigation.state.params.campaign.call.stats.voiceMail],
                ["Transfer", this.props.navigation.state.params.campaign.call.stats.transfer],
                ["DNC", this.props.navigation.state.params.campaign.call.stats.dnc],
                ["Avg. Listening Duration", this.getAvgListeningDuration(this.props.navigation.state.params.campaign.call.stats)]
            ]
        })
    }

    onBack = () => {
        this.props.navigation.pop()
    }

    getAvgListeningDuration(stats: any) {
        if (stats.live != 0 && stats.liveFileDuration != 0) {
            let averageDurationTime = stats.liveDuration / stats.live;
            return `${parseFloat(
                ((100 * averageDurationTime) / stats.liveFileDuration).toFixed(0)
            )}%`;
        }
        return "";
    }

    startCampaign = () => {
        this.setState({
            loading: true
        })
        CampaignService.performCampaignAction(this.state.campaign.id, 'start').subscribe((response: any) => {
            this.setState({
                loading: false
            })
            Utils.presentToast(response.message + ". " + response.submessage)
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header back={true} onBack={this.onBack} menu={false} />

                <CmlSpinner
                    visible={this.state.loading}
                />
                {
                    this.state.campaign && <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 16
                        }}>
                            <View style={{ flex: 1 }} />

                            <StatusIcon campaign={this.state.campaign} />
                            <CmlText style={styles.campaignLabel}>
                                {this.state.campaign.name}
                            </CmlText>
                            <View style={{ flex: 1 }} />
                            <View style={{
                                width: 20
                            }}>
                                <Menu>
                                    <MenuTrigger>
                                        <Entypo name="dots-three-vertical" size={20} color={'#7b7b7b'} style={{ marginTop: 8 }} />
                                    </MenuTrigger>
                                    <MenuOptions customStyles={{
                                        optionText: {
                                            padding: 4
                                        }
                                    }}>
                                        <MenuOption text='Start Campaign' onSelect={() => this.startCampaign()} />
                                        <MenuOption text='Rerun Campaign' />
                                        <MenuOption text='Send Test Call' />
                                        <MenuOption text='View Campaign' />
                                        <MenuOption text='Delete' />
                                    </MenuOptions>
                                </Menu>
                            </View>
                        </View>



                        <ScrollView>
                            {/* <View style={[styles.graphContainer, {
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

                            </View> */}

                            <View style={[styles.graphContainer]}>
                                {
                                    this.state.campaignDetail.map((item: string[], index: number) => {
                                        return <View style={[styles.itemContainer, {
                                            backgroundColor: index % 2 == 0 ? 'white' : '#e4f9fd'
                                        }]}>
                                            <CmlText style={[styles.listLabel, {
                                                textAlign: 'left',
                                                paddingLeft: 24
                                            }]}>{item[0]}</CmlText>

                                            <CmlText style={[styles.listValue, {
                                                color: '#3db005'
                                            }]}>{index == 7 ? this.state.contactListName : item[1]}</CmlText>
                                        </View>
                                    })
                                }
                            </View>

                            <View style={[styles.graphContainer]}>
                                {
                                    this.state.callDetail.map((item: string[], index: number) => {
                                        return <View style={[styles.itemContainer, {
                                            backgroundColor: index % 2 == 0 ? 'white' : '#e4f9fd'
                                        }]}>
                                            <CmlText style={[styles.listLabel, {
                                                textAlign: 'left',
                                                paddingLeft: 24
                                            }]}>{item[0]}</CmlText>

                                            <CmlText style={[styles.listValue, {
                                                color: '#3db005'
                                            }]}>{item[1]}</CmlText>
                                        </View>
                                    })
                                }
                            </View>

                        </ScrollView>

                    </View>
                }

            </SafeAreaView>
        );
    }
}

export default CampaignDetail;