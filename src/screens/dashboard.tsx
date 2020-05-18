import React, {Component} from 'react';
import {StyleSheet, FlatList, View, SafeAreaView} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
    graphContainer: {
        borderRadius: 10,
        borderColor: '#fdd2bd',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    percentLabel: { 
        fontSize: 32, 
        color: "#5a6378" 
    }
});

class Dashboard extends Component {
    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    state = {
        campaigns: [
            {
                name: 'Rudi Doe',
                status: 0
            },
            {
                name: 'Rian Massive',
                status: 1
            },
            {
                name: 'Anjas Tora',
                status: 0
            },
            {
                name: 'Lauren Kiev',
                status: 1
            },
            {
                name: 'Coco Yarn',
                status: 0
            },
        ]
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={styles.container}>
                    <CmlText style={styles.campaignLabel}>
                        Recent campaigns
                    </CmlText>
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


                    <CmlText style={styles.campaignLabel}>
                        My Call Campaigns
                    </CmlText>

                    <View style={[styles.graphContainer, {flex: 1}]}>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#fdd2bd',
                            height: 40,
                            flexDirection: 'row'
                        }}>
                            <CmlText style={{
                                flex: 1,
                                fontSize: 16,
                                color: '#ff9f6f',
                                padding: 8,
                                paddingLeft: 16
                            }}>Status</CmlText>
                            <CmlText style={{
                                flex: 1,
                                fontSize: 16,
                                color: '#ff9f6f',
                                padding: 8
                            }}>Name</CmlText>
                        </View>
                        <FlatList 
                            data={this.state.campaigns}
                            renderItem={(item: any) => {
                            return <TouchableOpacity onPress={() => this.props.navigation.push('CampaignDetailScreen')}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 8
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            paddingLeft: 24
                                        }}>
                                            {item.item.status == 0 && <Fontisto name="curve" size={20} color={'#ff3d00'}/>}
                                            {item.item.status == 1 && <FontAwesome5 name="recycle" size={20} color={'#0dac01'} />}
                                        </View>
                                        
                                        <CmlText style={{
                                            color: '#8c95aa',
                                            flex: 1
                                        }}>{item.item.name}</CmlText>
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
  
  export default Dashboard;