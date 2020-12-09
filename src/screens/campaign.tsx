import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/header';
import SemiCircleProgress from '../components/progress';
import {CmlText} from '../components/text';
import {ScrollView} from 'react-native-gesture-handler';
import {CampaignService} from '../service/campaign.service';
import {StatusIcon} from '../components/campaign_status';

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
    tableHeader: {
        backgroundColor: '#fff4ed',
        height: 40,
        flexDirection: 'row',
        paddingTop: 8,
        marginTop: 24,
    },
    tableLabel: {
        fontSize: 12,
        color: '#4b4b4b',
        padding: 8,
        textAlign: 'center',
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
        fontWeight: 'bold',
    },
    itemContact: {
        color: '#3db005',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    itemName: {
        color: '#8c95aa',
        flex: 1,
    },
    iconContainer: {
        flex: 0.5,
        paddingLeft: 24,
    },
});

class Campaign extends Component<
    {
        navigation: any;
    },
    {
        campaigns: [];
    }
> {
    constructor(props: any) {
        super(props);

        this.state = {
            campaigns: [],
        };
    }

    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    componentDidMount() {
        this.loadCampaignList();

        this.props.navigation.addListener('willFocus', (payload: any) => {
            this.loadCampaignList();
        });
    }

    loadCampaignList = () => {
        CampaignService.getCampaignList(1, 500).subscribe((response: any) => {
            this.setState({
                campaigns: response.data,
            });
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true} />
                <View style={styles.container}>
                    <CmlText style={styles.campaignLabel}>
                        My Call Campaigns
                    </CmlText>

                    <View
                        style={{
                            flex: 1,
                        }}>
                        <View style={styles.tableHeader}>
                            <CmlText
                                style={[
                                    styles.tableLabel,
                                    {
                                        flex: 0.5,
                                    },
                                ]}>
                                Status
                            </CmlText>
                            <CmlText
                                style={[
                                    styles.tableLabel,
                                    {
                                        flex: 1,
                                        textAlign: 'left',
                                    },
                                ]}>
                                Name
                            </CmlText>
                            <CmlText
                                style={[
                                    styles.tableLabel,
                                    {
                                        flex: 1,
                                    },
                                ]}>
                                Total Contacts
                            </CmlText>
                            <CmlText
                                style={[
                                    styles.tableLabel,
                                    {
                                        flex: 1,
                                    },
                                ]}>
                                Total Dialed
                            </CmlText>
                        </View>
                        <FlatList
                            data={this.state.campaigns}
                            renderItem={(item: any) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.push(
                                                'CampaignDetailScreen',
                                                {
                                                    campaign: {...item.item, call: item.item.call? item.item.call: {stats: {}, settings: {}, voicemail: {}}},
                                                },
                                            )
                                        }
                                        }>
                                        <View
                                            style={[
                                                styles.item,
                                                {
                                                    backgroundColor:
                                                        item.index % 2 == 1
                                                            ? 'white'
                                                            : '#e4f9fd',
                                                },
                                            ]}>
                                            <View style={styles.iconContainer}>
                                                <StatusIcon
                                                    campaign={item.item}
                                                />
                                            </View>

                                            <CmlText style={styles.itemName}>
                                                {item.item.name}
                                            </CmlText>
                                            <CmlText style={styles.itemContact}>
                                                {item.item.call ? item.item.call.stats.total: 0}
                                            </CmlText>

                                            <CmlText style={styles.itemDial}>
                                                {item.item.call ? item.item.call.stats.dialed: 0}
                                            </CmlText>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}></FlatList>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default Campaign;
