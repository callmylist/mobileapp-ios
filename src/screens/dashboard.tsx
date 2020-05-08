import React, {Component} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Header from '../components/header';
import SemiCircleProgress from '../components/progress';
import { CmlText } from '../components/text'

const styles = StyleSheet.create({
    container: {
        padding: 8
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
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row'
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
    render() {
        return (
            <>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={styles.container}>
                    <CmlText style={styles.campaignLabel}>
                        Recent campaigns
                    </CmlText>
                    <View style={styles.graphContainer}>
                        <View style={{
                            width: 170
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
                </View>
            </>
        );
    }
  }
  
  export default Dashboard;