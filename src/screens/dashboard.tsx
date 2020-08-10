import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/header';
import SemiCircleProgress from '../components/progress';
import {CmlText} from '../components/text';
import {CmlButton} from '../components/button';

import {ScrollView} from 'react-native-gesture-handler';
import Utils from '../utils';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {CmlSpinner} from '../components/loading';
import {
    loadUserInfo,
    loadCampaignList,
} from '../redux/actions/dashboardActions';
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
    graphContainer: {
        borderRadius: 10,
        borderColor: '#fdd2bd',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    percentLabel: {
        fontSize: 32,
        color: '#5a6378',
    },
});

class Dashboard extends Component<
    {
        navigation: any;
        loadUserInfo: any;
        loadCampaignList: any;
        account: any;
        campaignList: any;
    },
    {
        averageDurationTime: number;
        averageDurationPercent: number;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            averageDurationPercent: 0,
            averageDurationTime: 0,
        };
    }

    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    componentDidMount() {
        this.props.loadUserInfo();
        this.props.loadCampaignList();

        this.props.navigation.addListener('willFocus', (payload: any) => {
            this.props.loadUserInfo();
            this.props.loadCampaignList();
        });
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (prevProps.account !== this.props.account) {
            if (
                this.props.account &&
                this.props.account.userStats &&
                this.props.account.userStats.live &&
                this.props.account.userStats.live != 0
            ) {
                if (
                    this.props.account.userStats.liveDuration &&
                    this.props.account.userStats.liveDuration != 0
                )
                    this.setState({
                        averageDurationTime:
                            this.props.account.userStats.liveDuration /
                            this.props.account.userStats.live,
                    });
                if (
                    this.props.account.userStats.avgld &&
                    this.props.account.userStats.avgld != 0
                ) {
                    this.setState({
                        averageDurationPercent: parseFloat(
                            (
                                (100 * this.props.account.userStats.avgld) /
                                this.props.account.userStats.live
                            ).toFixed(0),
                        ),
                    });
                }
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true} />
                <View style={styles.container}>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <CmlText
                            style={[
                                styles.campaignLabel,
                                {flex: 1, marginTop: 18},
                            ]}>
                            Recent campaigns
                        </CmlText>
                        <CmlButton
                            title="Create Campaign"
                            backgroundColor="#ffa67a"
                            style={{marginTop: 16, alignSelf: 'flex-end'}}
                            onPress={() => {
                                this.props.navigation.push(
                                    'CreatCampaignNavigator',
                                );
                            }}
                        />
                    </View>
                    {this.props.account && (
                        <View
                            style={[
                                styles.graphContainer,
                                {
                                    padding: 16,
                                    flexDirection: 'row',
                                },
                            ]}>
                            <View
                                style={{
                                    width: 170,
                                    paddingTop: 12,
                                }}>
                                <SemiCircleProgress
                                    percentage={
                                        this.state.averageDurationPercent
                                    }
                                    progressColor={'#cd5917'}
                                    progressWidth={20}
                                    progressShadowColor={'#f0f0f0'}
                                    circleRadius={80}></SemiCircleProgress>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'baseline',
                                    }}>
                                    <CmlText
                                        style={{
                                            fontSize: 32,
                                            color: '#5a6378',
                                        }}>
                                        {this.state.averageDurationPercent}%
                                    </CmlText>
                                    <CmlText
                                        style={{
                                            fontSize: 12,
                                            color: '#5a6378',
                                        }}>
                                        {' '}
                                        OF TOTAL CALL
                                    </CmlText>
                                </View>
                                <CmlText
                                    style={{
                                        color: '#a3aec8',
                                    }}>
                                    {parseInt(
                                        Math.floor(
                                            this.state.averageDurationTime / 60,
                                        ) + '',
                                    )}
                                    m{' '}
                                    {parseFloat(
                                        (
                                            this.state.averageDurationTime % 60
                                        ).toFixed(0),
                                    )}
                                    s Average Live Answer Listen Duration
                                </CmlText>
                            </View>
                        </View>
                    )}

                    <CmlText style={styles.campaignLabel}>
                        My Call Campaigns
                    </CmlText>

                    <View style={[styles.graphContainer, {flex: 1}]}>
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#fdd2bd',
                                height: 40,
                                flexDirection: 'row',
                            }}>
                            <CmlText
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    color: '#ff9f6f',
                                    padding: 8,
                                    paddingLeft: 16,
                                }}>
                                Status
                            </CmlText>
                            <CmlText
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    color: '#ff9f6f',
                                    padding: 8,
                                }}>
                                Name
                            </CmlText>
                        </View>
                        <FlatList
                            data={this.props.campaignList}
                            renderItem={(item: any) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            this.props.navigation.push(
                                                'CampaignDetailScreen',
                                                {
                                                    campaign: item.item,
                                                },
                                            )
                                        }>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 8,
                                            }}>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    paddingLeft: 24,
                                                }}>
                                                <StatusIcon
                                                    campaign={item.item}
                                                />
                                            </View>

                                            <CmlText
                                                style={{
                                                    color: '#8c95aa',
                                                    flex: 1,
                                                    fontSize: 16,
                                                }}>
                                                {item.item.name}
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

const mapStateToProps = (state: any) => {
    return {
        account: state.dashboardReducer.account,
        campaignList: state.dashboardReducer.campaignList,
    };
};

export default compose(
    connect(mapStateToProps, {loadUserInfo, loadCampaignList}),
)(Dashboard);
