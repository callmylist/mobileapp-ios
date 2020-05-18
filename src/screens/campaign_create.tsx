import React, {Component, memo} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView, Image, Switch} from 'react-native';
import {NavigationActions} from 'react-navigation'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlButton } from '../components/button'
import { CmlTextInput } from '../components/textinput';
import { ScrollView } from 'react-native-gesture-handler';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        flexDirection:'row'
    }, 
    campaignLabel: {
        fontSize: 20,
        textAlign: 'center',
        color: '#515252',
        marginTop: 12
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 20
    },
    selectedStepContainer: {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 3, 
        borderColor: '#ffa67a'
    },
    stepContainer: {
        backgroundColor: '#02b9db', 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        borderWidth: 3, 
        borderColor: '#02b9db',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    stepLabel: {
        fontSize: 20, 
        fontWeight: 'bold',
        transform: [{rotate: "90deg"}]
    },
    campaignTypeLogo: {
        width: 80,
        height: 80
    },
    stepViewContainer: {
        flexDirection: 'column', 
        alignItems: 'center',
        flex: 1
    },
    stepDescription: {
        color: '#02b9db', 
        marginTop: 24,
        textAlign: 'center'
    },
    inputContainer: {
        flexDirection: 'row', 
        marginTop: 24, 
        borderBottomWidth: 1, 
        borderBottomColor: 'black', 
        padding: 8,
    },
    input: {
        flex: 1,
        textAlign: 'center'
    },
    panelContainer: {
        width: '100%',
        marginTop: 16
    },
    panel: {
        borderWidth: 1,
        borderColor: '#b8b8b8',
        paddingVertical: 12,
        flexDirection: 'row',
        borderRadius: 8
    },
    leftContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8
    },
    leftLogo: {
        width: 24,
        height: 200
    },
    panelOptionText: {
        color: '#6a6a6a',
        fontSize: 12,
        marginLeft: 8
    },
    panelUploadContainer: {
        borderBottomColor: '#949494',
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        marginTop: 24
    },
    panelUploadLabel: {
        flex: 1,
        color: '#515151'
    },
    panelBody: {
        flex: 1, 
        padding: 24, 
        alignItems: 'center'
    },
    panelSwitchContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%'
    },
    dialogContainer: {
        backgroundColor: '#000000bb',
        width: '80%'
    },
    dialogTitle: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 20
    },
    dialogSwitchContainer: {
        marginTop: 8,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    borderBottom: {
        borderBottomColor: 'white', 
        borderBottomWidth: 1
    },
    dialogTimeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingVertical: 8
    },
    dialogTimePlaceholder: {
        color: 'white',
        fontSize: 10,
        marginTop: 12
    },
    dialogDescription: {
        color: 'white',
        fontWeight: '500',
        fontSize: 10,
        marginTop: 8
    },
    dialogSmallTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24
    },
    continueButton: {
        alignSelf: 'center',
        marginTop: 24
    },
    continueButtonContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        borderColor: '#555757', 
        borderWidth: 1, 
        borderRadius: 4, 
        width: 160,
        justifyContent: 'center',
        height: 42
    },
    continueButtonText: {
        color: '#555757', 
        fontSize: 18, 
        marginTop: 2, 
        marginLeft: 8
    }
});

class CampaignCreate extends Component {

    constructor(props: any) {
        super(props)

        this.state = {
            step: 0,
            startNow: false
        }
    }

    componentDidMount() {
    }
    
    onBack = () => {
        this.props.navigation.pop()
    }

    onStart = () => {
        this.setState({
            startNow: true
        })
    }

    continue = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    start = () => {
        this.setState({
            startNow: false
        })
        this.props.navigation.pop()
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onBack} menu={false}/>
                <View style={styles.container}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <CmlText style={styles.campaignLabel}>
                            New Campaign
                        </CmlText>
                        <View style={{
                            width: '80%',
                            flex: 1
                        }}>
                            {
                                this.state.step == 0 && 
                                <View style={styles.stepViewContainer}>
                                    <Image 
                                        source={require("../assets/images/create_logo.png")}
                                        style={styles.logo}
                                    />

                                    <CmlText style={styles.stepDescriptoin}>
                                        What type of campaign would you like to send?
                                    </CmlText>
                                    <View style={{flexDirection: 'row', marginTop: 24}}>
                                        <View style={{alignItems: 'center', padding: 16}}>
                                            <Image 
                                                source={require("../assets/images/campaign_call.png")}
                                                style={styles.campaignTypeLogo}
                                            />
                                            <CmlButton title="CALL" backgroundColor="#02b9db" style={{marginTop: 16}}/>
                                        </View>
                                        <View style={{alignItems: 'center', padding: 16}}>
                                            <Image 
                                                source={require("../assets/images/campaign_text.png")}
                                                style={styles.campaignTypeLogo}
                                            />
                                            <CmlButton title="TEXT" backgroundColor="#ffa67a" style={{marginTop: 16}}/>
                                        </View>
                                    </View>


                                    <TouchableOpacity style={styles.continueButton} onPress={() => this.continue()}>
                                        <View style={styles.continueButtonContainer}>
                                            <CmlText style={styles.continueButtonText}>CONTINUE</CmlText>
                                            <MaterialIcons name="navigate-next" size={30}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                this.state.step == 1 && 
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        Enter your campaign name below
                                    </CmlText>
                                    <View style={styles.inputContainer}>
                                        <CmlTextInput placeholder="Please add campaign name here"  style={styles.input}/>
                                    </View>

                                    <TouchableOpacity style={styles.continueButton} onPress={() => this.continue()}>
                                        <View style={styles.continueButtonContainer}>
                                            <CmlText style={styles.continueButtonText}>CONTINUE</CmlText>
                                            <MaterialIcons name="navigate-next" size={30}/>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            }
                            {
                                this.state.step == 2 && 
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        What number would you like displayed on the Caller ID
                                    </CmlText>
                                    <View style={styles.inputContainer}>
                                        <CmlTextInput placeholder="Please add caller id" style={styles.input}/>
                                    </View>

                                    <TouchableOpacity style={styles.continueButton} onPress={() => this.continue()}>
                                        <View style={styles.continueButtonContainer}>
                                            <CmlText style={styles.continueButtonText}>CONTINUE</CmlText>
                                            <MaterialIcons name="navigate-next" size={30}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            }
                            {
                                this.state.step == 3 && 
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        Select all options you would like for your campaign
                                    </CmlText>
                                    <ScrollView style={styles.panelContainer}>
                                        <View style={styles.panel}>
                                            <View style={styles.leftContainer}>
                                                <AntDesign 
                                                    name="infocirlce"
                                                    size={20}
                                                    color="#7b7b7b"
                                                    style={{
                                                        marginLeft: 8
                                                    }}
                                                />
                                                <Image 
                                                    source={require("../assets/images/live_answer.png")}
                                                    style={styles.leftLogo}
                                                    resizeMode="contain"
                                                />
                                            </View>

                                            <View style={styles.panelBody}>
                                                <View style={styles.panelSwitchContainer}>
                                                    <Switch
                                                    />
                                                    <CmlText style={styles.panelOptionText}>Transfer</CmlText>
                                                </View>
                                                <View style={[styles.panelSwitchContainer, {marginTop: 8}]}>
                                                    <Switch
                                                    />
                                                    <CmlText style={styles.panelOptionText}>Do Not Call</CmlText>
                                                </View>
                                                <View style={styles.panelUploadContainer}>
                                                    <CmlText style={styles.panelUploadLabel}>Select Audio File</CmlText>
                                                    <Ionicons 
                                                        name="md-arrow-dropdown"
                                                        size={18}
                                                        color="#7b7b7b"
                                                        style={{
                                                            marginLeft: 8
                                                        }}
                                                    />
                                                </View>
                                                <CmlButton title="Text To Speech" backgroundColor="#ffa67a" style={{marginTop: 20}}/>
                                                <CmlButton title="Upload Audio" backgroundColor="#02b9db" style={{marginTop: 8}}/>
                                            </View>
                                        </View>
                                        <View style={[styles.panel, {
                                            marginTop: 16
                                        }]}>
                                            <View style={styles.leftContainer}>
                                                <Image 
                                                    source={require("../assets/images/voice_mail.png")}
                                                    style={styles.leftLogo}
                                                    resizeMode="contain"
                                                />
                                                <AntDesign 
                                                    name="infocirlce"
                                                    size={20}
                                                    color="#7b7b7b"
                                                    style={{
                                                        marginLeft: 8
                                                    }}
                                                />
                                            </View>

                                            <View style={styles.panelBody}>
                                                <View style={{width: '100%'}}>
                                                    <CmlText>For best results:</CmlText>
                                                    <CmlText style={{fontSize: 12, color: '#6a6a6a'}}>23-37 seconds recommended</CmlText>
                                                </View>
                                                <View style={[styles.panelSwitchContainer, {marginTop: 16}]}>
                                                    <Switch
                                                    />
                                                    <CmlText style={styles.panelOptionText}>Use Ringless Voicemail</CmlText>
                                                </View>
                                                <View style={styles.panelUploadContainer}>
                                                    <CmlText style={styles.panelUploadLabel}>Select Audio File</CmlText>
                                                    <Ionicons 
                                                        name="md-arrow-dropdown"
                                                        size={18}
                                                        color="#7b7b7b"
                                                        style={{
                                                            marginLeft: 8
                                                        }}
                                                    />
                                                </View>
                                                <CmlButton title="Text To Speech" backgroundColor="#ffa67a" style={{marginTop: 20}}/>
                                                <CmlButton title="Upload Audio" backgroundColor="#02b9db" style={{marginTop: 8}}/>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.continueButton} onPress={() => this.continue()}>
                                            <View style={styles.continueButtonContainer}>
                                                <CmlText style={styles.continueButtonText}>CONTINUE</CmlText>
                                                <MaterialIcons name="navigate-next" size={30}/>
                                            </View>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            }
                            {
                                this.state.step == 4 && 
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        Select Contact List
                                    </CmlText>
                                    <ScrollView style={styles.panelContainer}>
                                        <View style={styles.panel}>
                                            <View style={styles.panelBody}>
                                                <CmlText style={{
                                                    width: '100%'
                                                }}>Select Contact List</CmlText>
                                                <View style={[styles.panelUploadContainer, {marginTop: 8}]}>
                                                    <CmlText style={styles.panelUploadLabel}>Select Contact List</CmlText>
                                                    <Ionicons 
                                                        name="md-arrow-dropdown"
                                                        size={18}
                                                        color="#c1c1c1"
                                                        style={{
                                                            marginLeft: 8
                                                        }}
                                                    />
                                                </View>
                                                <CmlText style={{
                                                    width: '100%',
                                                    marginTop: 24
                                                }}>Upload New Contact List</CmlText>
                                                <View style={[styles.panelUploadContainer, {marginTop: 8}]}>
                                                    <CmlText style={styles.panelUploadLabel}>Select Phone Number Column</CmlText>
                                                    <Ionicons 
                                                        name="md-arrow-dropdown"
                                                        size={18}
                                                        color="#c1c1c1"
                                                        style={{
                                                            marginLeft: 8
                                                        }}
                                                    />
                                                </View>
                                                <View style={[styles.panelSwitchContainer, {marginTop: 24}]}>
                                                    <Switch
                                                    />
                                                    <CmlText style={styles.panelOptionText}>Does your file contain headers?</CmlText>
                                                </View>

                                                <CmlButton title="Upload Contact List" backgroundColor="#02b9db" style={{marginTop: 16, width: 180}}/>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.continueButton} onPress={() => this.continue()}>
                                            <View style={styles.continueButtonContainer}>
                                                <CmlText style={styles.continueButtonText}>CONTINUE</CmlText>
                                                <MaterialIcons name="navigate-next" size={30}/>
                                            </View>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            }
                            {
                                this.state.step == 5 && 
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        Campaign Settings
                                    </CmlText>
                                    <ScrollView style={styles.panelContainer}>
                                        <View style={styles.panel}>
                                            <View style={styles.panelBody}>
                                                <CmlText style={{
                                                    width: '100%'
                                                }}>Maximum Calls Per Minute</CmlText>
                                                <View style={[styles.panelUploadContainer, {marginTop: 8}]}>
                                                    <CmlTextInput style={styles.panelUploadLabel} placeholder="Calls Per Minute"></CmlTextInput>
                                                </View>
                                                <CmlText style={{
                                                    width: '100%',
                                                    marginTop: 24
                                                }}>Callback Options</CmlText>
                                                <CmlText style={{
                                                    width: '100%',
                                                    fontSize: 12,
                                                    color: '#6a6a6a'
                                                }}>Which Contacts would you like to retry?</CmlText>
                                                <View style={[styles.panelSwitchContainer, {marginTop: 16}]}>
                                                    <Switch
                                                    />
                                                    <CmlText style={styles.panelOptionText}>Voicemail</CmlText>
                                                </View>
                                                <View style={[styles.panelSwitchContainer, {marginTop: 8}]}>
                                                    <Switch
                                                    />
                                                    <CmlText style={styles.panelOptionText}>Busy</CmlText>
                                                </View>
                                                <View style={[styles.panelSwitchContainer, {marginTop: 8}]}>
                                                    <Switch
                                                    />
                                                    <CmlText style={styles.panelOptionText}>No answer</CmlText>
                                                </View>

                                                <CmlButton title="Upload Contact List" backgroundColor="#02b9db" style={{marginTop: 16, width: 180}}/>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.continueButton} onPress={() => this.continue()}>
                                            <View style={styles.continueButtonContainer}>
                                                <CmlText style={styles.continueButtonText}>CONTINUE</CmlText>
                                                <MaterialIcons name="navigate-next" size={30}/>
                                            </View>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            }
                            {
                                this.state.step == 6 && 
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        When would you like to schedule your campaign to start?
                                    </CmlText>
                                    <ScrollView style={styles.panelContainer}>
                                        <View style={[styles.panel, {width: '70%', alignSelf: 'center'}]}>
                                            <View style={[styles.panelBody, {padding: 8}]}>
                                                <Feather 
                                                    name="play-circle"
                                                    size={70}
                                                    color="#7b7b7b"
                                                    style={{
                                                        marginLeft: 8
                                                    }}
                                                />
                                                <CmlButton title="Start Now" backgroundColor="#02b9db" style={{marginTop: 8}} onPress={this.onStart}/>
                                            </View>
                                        </View>
                                        <View style={[styles.panel, {width: '70%', alignSelf: 'center', marginTop: 16}]}>
                                            <View style={[styles.panelBody, {padding: 8}]}>
                                                <MaterialIcons 
                                                    name="access-time"
                                                    size={70}
                                                    color="#7b7b7b"
                                                    style={{
                                                        marginLeft: 8
                                                    }}
                                                />
                                                <CmlButton title="In The Future" backgroundColor="#ffa67a" style={{marginTop: 8}}/>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            }


                        </View>
                                               
                    </View>
                    <View style={{width: 30}}>
                        <View style={{
                            alignItems: 'center',
                            paddingTop: 100
                        }}>
                            <TouchableOpacity onPress={() => this.setState({step: 0})}>
                                <View style={this.state.step == 0?styles.selectedStepContainer:styles.stepContainer}>
                                    <CmlText style={[styles.stepLabel, {color: this.state.step==0?'black':'white'}]}>1</CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image 
                                source={require("../assets/images/create_campaign_seperator.png")}
                                style={{
                                    height: 30
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity onPress={() => this.setState({step: 1})}>
                                <View style={this.state.step == 1?styles.selectedStepContainer:styles.stepContainer}>
                                    <CmlText style={[styles.stepLabel, {color: this.state.step==1?'black':'white'}]}>2</CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image 
                                source={require("../assets/images/create_campaign_seperator.png")}
                                style={{
                                    height: 30
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity onPress={() => this.setState({step: 2})}>
                                <View style={this.state.step == 2?styles.selectedStepContainer:styles.stepContainer}>
                                    <CmlText style={[styles.stepLabel, {color: this.state.step==2?'black':'white'}]}>3</CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image 
                                source={require("../assets/images/create_campaign_seperator.png")}
                                style={{
                                    height: 30
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity onPress={() => this.setState({step: 3})}>
                                <View style={this.state.step == 3?styles.selectedStepContainer:styles.stepContainer}>
                                    <CmlText style={[styles.stepLabel, {color: this.state.step==3?'black':'white'}]}>4</CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image 
                                source={require("../assets/images/create_campaign_seperator.png")}
                                style={{
                                    height: 30
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity onPress={() => this.setState({step: 4})}>
                                <View style={this.state.step == 4?styles.selectedStepContainer:styles.stepContainer}>
                                    <CmlText style={[styles.stepLabel, {color: this.state.step==4?'black':'white'}]}>5</CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image 
                                source={require("../assets/images/create_campaign_seperator.png")}
                                style={{
                                    height: 30
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity onPress={() => this.setState({step: 5})}>
                                <View style={this.state.step == 5?styles.selectedStepContainer:styles.stepContainer}>
                                    <CmlText style={[styles.stepLabel, {color: this.state.step==5?'black':'white'}]}>6</CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image 
                                source={require("../assets/images/create_campaign_seperator.png")}
                                style={{
                                    height: 30
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity onPress={() => this.setState({step: 6})}>
                                <View style={this.state.step == 6?styles.selectedStepContainer:styles.stepContainer}>
                                    <CmlText style={[styles.stepLabel, {color: this.state.step==6?'black':'white'}]}>7</CmlText>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>

                <Dialog
                    visible={this.state.startNow}
                    onTouchOutside={() => {
                    this.setState({ startNow: false });
                    }}
                    dialogStyle={styles.dialogContainer}
                    overlayOpacity={0}
                >
                    <DialogContent>
                        <View style={{paddingVertical: 16}}>
                            <View>
                                <CmlText style={styles.dialogTitle}>Start Now</CmlText>
                                <View style={styles.dialogSwitchContainer}>
                                    <Switch
                                        ios_backgroundColor='#9e9e9e'
                                    />
                                    <View style={{
                                        flex: 1
                                    }}>
                                        <CmlText style={[styles.panelOptionText, {color: 'white'}]}>Resume campaign the following day if campaign isn't completed by 10 pm</CmlText>
                                        <View style={styles.borderBottom}>
                                            <CmlText style={[styles.panelOptionText, {color: 'white', fontSize: 10, marginTop: 8}]}>(Call My List will stop all campaigns if not complete)</CmlText>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.panelSwitchContainer, {marginTop: 16}]}>
                                    <Switch
                                        ios_backgroundColor='#9e9e9e'
                                    />
                                    <CmlText style={[styles.panelOptionText, {color: 'white'}]}>Resume campaign the following day if campaign isn't completed by 10 pm</CmlText>
                                </View>

                                <CmlText style={styles.dialogSmallTitle}>Campaign Time Restrictions</CmlText>
                                <CmlText style={styles.dialogDescription}>Contacts will not be dialed outside these hours</CmlText>

                                <View style={styles.dialogTimeContainer}>
                                    <CmlText style={styles.dialogTimePlaceholder}>Start Time</CmlText>
                                </View>

                                <View style={styles.dialogTimeContainer}>
                                    <CmlText style={styles.dialogTimePlaceholder}>End Time</CmlText>
                                </View>

                                <View style={styles.dialogTimeContainer}>
                                    <CmlText style={styles.dialogTimePlaceholder}>Time Zone</CmlText>
                                </View>


                                <TouchableOpacity style={[styles.continueButton]} onPress={() => this.start()}>
                                    <View style={[styles.continueButtonContainer, {borderColor: 'white', width: 140}]}>
                                        <CmlText style={[styles.continueButtonText, {
                                            color: 'white',
                                            marginLeft: 8
                                        }]}>START</CmlText>
                                        <MaterialIcons name="navigate-next" size={30} color="#ffa67a"/>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </SafeAreaView>
        );
    }
}
  
export default CampaignCreate;