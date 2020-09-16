import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
    Linking,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/header';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {CmlButton} from '../components/button';
import {SoundService} from '../service/sound.service';
import AppConstants from '../utils/app_constants';

import Modal from 'react-native-modal';
import AppStyle from '../shared/styles';
import Player from '../components/player';
import DocumentPicker from 'react-native-document-picker';

import {CmlSpinner} from '../components/loading';
import Utils from '../utils';
import {store} from '../redux/store';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import RNPickerSelect from 'react-native-picker-select';
import {MessageCenterService} from '../service/message-center.service';
import {queueScheduler} from 'rxjs';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
    },
    campaignLabel: {
        fontSize: 20,
        textAlign: 'center',
        color: '#515252',
        marginTop: 4,
    },
    bigLabel: {
        fontSize: 16,
        color: '#515252',
        marginTop: 12,
        fontWeight: 'bold',
    },
    smallLabel: {
        fontSize: 13,
        color: '#515252',
        marginTop: 12,
    },
    label: {
        fontSize: 13,
        color: '#515252',
    },
    borderBottom: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    buttonContainer: {
        backgroundColor: '#0cbcdc',
        width: 180,
        height: 32,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 16,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginLeft: 4,
    },
    itemContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    itemIcon: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#f57536',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContainer: {
        backgroundColor: '#000000bb',
        width: '80%',
    },
    dialogTitle: {
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 20,
    },
    dialogSwitchContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    border: {
        borderBottomColor: 'black',
        borderBottomWidth: 0.7,
        // backgroundColor: 'red',
    },
    dialogTimeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingVertical: 8,
    },
    dialogTimePlaceholder: {
        color: 'white',
        fontSize: 10,
        marginTop: 12,
        width: '100%',
    },
    dialogDescription: {
        color: 'white',
        fontWeight: '500',
        fontSize: 10,
        marginTop: 8,
    },
    dialogSmallTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
    },
});

const bigPickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 14,
        color: 'white',
        width: 1000,
    },
    inputAndroid: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'white',
        width: '100%',
    },
});

class SettingsScreen extends Component<
    {
        navigation: any;
    },
    {
        settingsInfo: any;
        loading: boolean;
        scheduleList: any[];
        addResponder: boolean;
        startTimepicker: boolean;
        startTime: string;
        endTimepicker: boolean;
        endTime: string;
        weekDay: number;
        responderName: string;
        responderMessage: string;
        editIndex: number;
    }
> {
    WEEKDAYS = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    WEEKDAY_SELECTS = [
        {
            value: 1,
            label: 'Monday',
        },
        {
            value: 2,
            label: 'Tuesday',
        },
        {
            value: 3,
            label: 'Wednesday',
        },
        {
            value: 4,
            label: 'Thursday',
        },
        {
            value: 5,
            label: 'Friday',
        },
        {
            value: 6,
            label: 'Saturday',
        },
        {
            value: 7,
            label: 'Sunday',
        },
    ];
    constructor(props: any) {
        super(props);
        this.state = {
            settingsInfo: null,
            loading: false,
            scheduleList: [],
            addResponder: false,
            startTimepicker: false,
            startTime: '09:00',
            endTimepicker: false,
            endTime: '18:00',
            weekDay: 0,
            responderMessage: '',
            responderName: '',
            editIndex: -1,
        };
    }

    componentDidMount() {
        MessageCenterService.getMessageInfo().subscribe((response: any) => {
            let data = response.data;

            let scheduleList = data.schedule;
            scheduleList.forEach((element: any) => {
                element.startTime = Utils.SetTime(
                    element.startTime[0],
                    element.startTime[1],
                );
                element.endTime = Utils.SetTime(
                    element.endTime[0],
                    element.endTime[1],
                );
            });

            this.setState({
                settingsInfo: data,
                scheduleList: scheduleList,
            });
        });
    }

    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    addResponder = () => {
        if (this.state.responderName.length == 0) {
            Utils.presentToast('Please enter Responder Name.');
            return;
        }
        if (this.state.responderMessage.length == 0) {
            Utils.presentToast('Please enter Responder Message.');
            return;
        }
        if (this.state.weekDay == 0) {
            Utils.presentToast('Please select weekday.');
            return;
        }

        let schedule = {
            day: this.state.weekDay,
            endTime: this.state.endTime,
            message: this.state.responderMessage,
            name: this.state.responderName,
            startTime: this.state.startTime,
        };

        let scheduleList = this.state.scheduleList;
        scheduleList.push(schedule);

        this.setState({
            scheduleList: scheduleList,
            addResponder: false,
            weekDay: 0,
            responderMessage: '',
            responderName: '',
            startTime: '09:00',
            endTime: '18:00',
        });
    };

    updateResponder = () => {
        if (this.state.responderName.length == 0) {
            Utils.presentToast('Please enter Responder Name.');
            return;
        }
        if (this.state.responderMessage.length == 0) {
            Utils.presentToast('Please enter Responder Message.');
            return;
        }
        if (this.state.weekDay == 0) {
            Utils.presentToast('Please select weekday.');
            return;
        }

        let schedule = {
            day: this.state.weekDay,
            endTime: this.state.endTime,
            message: this.state.responderMessage,
            name: this.state.responderName,
            startTime: this.state.startTime,
        };

        let scheduleList = this.state.scheduleList;
        scheduleList[this.state.editIndex] = schedule;

        this.setState({
            scheduleList: scheduleList,
            addResponder: false,
            weekDay: 0,
            responderMessage: '',
            responderName: '',
            startTime: '09:00',
            endTime: '18:00',
            editIndex: -1,
        });
    };

    update = () => {
        MessageCenterService.saveMessageSettings(
            this.state.scheduleList.map((schedule: any) => {
                return {
                    ...schedule,
                    startTime: Utils.convertTime12toString(schedule.startTime),
                    endTime: Utils.convertTime12toString(schedule.endTime),
                };
            }),
        ).subscribe((response: any) => {
            if (response.success) {
                Utils.presentToast('Schedule Update Succesful');
            } else {
                Utils.presentToast('Schedule Update Unsuccesful');
            }
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true} />
                <CmlSpinner visible={this.state.loading} />
                <View style={styles.container}>
                    {this.state.settingsInfo && (
                        <View
                            style={{
                                flexDirection: 'column',
                                flex: 1,
                            }}>
                            <View
                                style={{
                                    position: 'relative',
                                    // backgroundColor: 'red',
                                }}>
                                <CmlText style={styles.campaignLabel}>
                                    Settings
                                </CmlText>
                                <CmlButton
                                    title="Update"
                                    backgroundColor="#02b9db"
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        bottom: -8,
                                        width: 80,
                                    }}
                                    onPress={this.update}
                                />
                            </View>
                            <View style={{flex: 1}}>
                                <CmlText style={styles.bigLabel}>
                                    General
                                </CmlText>
                                <CmlText style={styles.smallLabel}>
                                    Phone #
                                </CmlText>
                                <View>
                                    <CmlTextInput
                                        style={{
                                            marginTop: 8,
                                            marginLeft: 8,
                                        }}
                                        keyboardType="phone-pad"
                                        maxLength={11}
                                        value={
                                            this.state.settingsInfo.phoneNumber
                                        }
                                    />
                                </View>
                                <View>
                                    <CmlText style={styles.bigLabel}>
                                        Auto Responders
                                    </CmlText>
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 10,
                                        }}
                                        onPress={() => {
                                            this.setState({
                                                addResponder: true,
                                                weekDay: 0,
                                                responderMessage: '',
                                                responderName: '',
                                                startTime: '09:00',
                                                endTime: '18:00',
                                                editIndex: -1,
                                            });
                                        }}>
                                        <AntDesign
                                            name="pluscircleo"
                                            size={24}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={this.state.scheduleList}
                                    renderItem={(item: any) => {
                                        let schedule = item.item;
                                        return (
                                            <View
                                                style={{
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                    borderStyle: 'dashed',
                                                    padding: 8,
                                                    marginTop: 12,
                                                }}>
                                                <TouchableOpacity
                                                    style={{
                                                        position: 'absolute',
                                                        right: 10,
                                                        top: 10,
                                                    }}
                                                    onPress={() => {
                                                        this.setState({
                                                            addResponder: true,
                                                            editIndex:
                                                                item.index,
                                                            weekDay:
                                                                schedule.day,
                                                            responderMessage:
                                                                schedule.message,
                                                            responderName:
                                                                schedule.name,
                                                            startTime:
                                                                schedule.startTime,
                                                            endTime:
                                                                schedule.endTime,
                                                        });
                                                    }}>
                                                    <Entypo
                                                        name="edit"
                                                        size={24}
                                                    />
                                                </TouchableOpacity>
                                                <CmlText style={styles.label}>
                                                    Auto Responder Name
                                                </CmlText>
                                                <View
                                                    style={[
                                                        styles.border,
                                                        {
                                                            marginTop: 6,
                                                        },
                                                    ]}>
                                                    <CmlText>
                                                        {schedule.name}
                                                    </CmlText>
                                                </View>
                                                <CmlText
                                                    style={[
                                                        styles.label,
                                                        {
                                                            marginTop: 16,
                                                        },
                                                    ]}>
                                                    Auto Responder Message
                                                </CmlText>
                                                <View
                                                    style={[
                                                        styles.border,
                                                        {
                                                            marginTop: 6,
                                                        },
                                                    ]}>
                                                    <CmlText>
                                                        {schedule.message}
                                                    </CmlText>
                                                </View>
                                                <CmlText
                                                    style={styles.bigLabel}>
                                                    Schedule
                                                </CmlText>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                    }}>
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            padding: 8,
                                                            alignItems:
                                                                'center',
                                                        }}>
                                                        <CmlText
                                                            style={[
                                                                styles.label,
                                                                {
                                                                    marginTop: 12,
                                                                },
                                                            ]}>
                                                            Day of Week
                                                        </CmlText>
                                                        <View
                                                            style={[
                                                                styles.border,
                                                                {
                                                                    width:
                                                                        '80%',
                                                                },
                                                            ]}>
                                                            <CmlText
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                    marginTop: 4,
                                                                }}>
                                                                {
                                                                    this
                                                                        .WEEKDAYS[
                                                                        schedule.day -
                                                                            1
                                                                    ]
                                                                }
                                                            </CmlText>
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            padding: 8,
                                                            alignItems:
                                                                'center',
                                                        }}>
                                                        <CmlText
                                                            style={[
                                                                styles.label,
                                                                {
                                                                    marginTop: 12,
                                                                },
                                                            ]}>
                                                            Start Time
                                                        </CmlText>
                                                        <View
                                                            style={[
                                                                styles.border,
                                                                {
                                                                    width:
                                                                        '80%',
                                                                },
                                                            ]}>
                                                            <CmlText
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                    marginTop: 4,
                                                                }}>
                                                                {Utils.convertTo12(
                                                                    schedule.startTime,
                                                                )}
                                                            </CmlText>
                                                        </View>
                                                    </View>

                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            padding: 8,
                                                            alignItems:
                                                                'center',
                                                        }}>
                                                        <CmlText
                                                            style={[
                                                                styles.label,
                                                                {
                                                                    marginTop: 12,
                                                                },
                                                            ]}>
                                                            End Time
                                                        </CmlText>
                                                        <View
                                                            style={[
                                                                styles.border,
                                                                {
                                                                    width:
                                                                        '80%',
                                                                },
                                                            ]}>
                                                            <CmlText
                                                                style={{
                                                                    textAlign:
                                                                        'center',
                                                                    marginTop: 4,
                                                                }}>
                                                                {Utils.convertTo12(
                                                                    schedule.endTime,
                                                                )}
                                                            </CmlText>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}></FlatList>
                            </View>
                        </View>
                    )}
                </View>

                <Modal
                    isVisible={this.state.addResponder}
                    backdropOpacity={0}
                    onBackdropPress={() =>
                        this.setState({addResponder: false})
                    }>
                    <View style={AppStyle.dialogContainer}>
                        <CmlText style={AppStyle.dialogSmallTitle}>
                            Upload New List
                        </CmlText>

                        <View
                            style={{
                                borderWidth: 1,
                                borderRadius: 8,
                                borderStyle: 'dashed',
                                padding: 8,
                                marginTop: 12,
                            }}>
                            <CmlText
                                style={[
                                    styles.label,
                                    {
                                        color: 'white',
                                    },
                                ]}>
                                Auto Responder Name
                            </CmlText>
                            <View
                                style={[
                                    styles.border,
                                    {
                                        marginTop: 6,
                                        borderBottomColor: 'white',
                                    },
                                ]}>
                                <CmlTextInput
                                    style={{
                                        color: 'white',
                                    }}
                                    value={this.state.responderName}
                                    onChangeText={(value: string) => {
                                        this.setState({
                                            responderName: value,
                                        });
                                    }}
                                />
                            </View>
                            <CmlText
                                style={[
                                    styles.label,
                                    {
                                        color: 'white',
                                        marginTop: 16,
                                    },
                                ]}>
                                Auto Responder Message
                            </CmlText>
                            <View
                                style={[
                                    styles.border,
                                    {
                                        marginTop: 6,
                                        borderBottomColor: 'white',
                                    },
                                ]}>
                                <CmlTextInput
                                    style={{
                                        color: 'white',
                                        height: 100,
                                        textAlignVertical: 'top',
                                    }}
                                    multiline={true}
                                    blurOnSubmit={true}
                                    value={this.state.responderMessage}
                                    onChangeText={(value: string) => {
                                        this.setState({
                                            responderMessage: value,
                                        });
                                    }}
                                />
                            </View>
                            <CmlText
                                style={[styles.bigLabel, {color: 'white'}]}>
                                Schedule
                            </CmlText>

                            <View style={styles.dialogTimeContainer}>
                                <CmlText style={styles.dialogTimePlaceholder}>
                                    Start Time
                                </CmlText>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            startTimepicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            {fontSize: 14},
                                        ]}>
                                        {Utils.convertTo12(
                                            this.state.startTime,
                                        )}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={this.state.startTimepicker}
                                    mode="time"
                                    date={
                                        new Date(
                                            '2019-01-01T' +
                                                this.state.startTime,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            startTime:
                                                (value.getHours() < 10
                                                    ? '0'
                                                    : '') +
                                                value.getHours() +
                                                ':' +
                                                ((value.getMinutes() < 10
                                                    ? '0'
                                                    : '') +
                                                    value.getMinutes()),
                                            startTimepicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            startTimepicker: false,
                                        })
                                    }
                                />
                            </View>

                            <View style={styles.dialogTimeContainer}>
                                <CmlText style={styles.dialogTimePlaceholder}>
                                    End Time
                                </CmlText>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            endTimepicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            {fontSize: 14},
                                        ]}>
                                        {Utils.convertTo12(this.state.endTime)}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={this.state.endTimepicker}
                                    mode="time"
                                    date={
                                        new Date(
                                            '2019-01-01T' + this.state.endTime,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            endTime:
                                                (value.getHours() < 10
                                                    ? '0'
                                                    : '') +
                                                value.getHours() +
                                                ':' +
                                                ((value.getMinutes() < 10
                                                    ? '0'
                                                    : '') +
                                                    value.getMinutes()),
                                            endTimepicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            endTimepicker: false,
                                        })
                                    }
                                />
                            </View>

                            <View style={styles.dialogTimeContainer}>
                                <CmlText
                                    style={[
                                        styles.dialogTimePlaceholder,
                                        {
                                            marginBottom: 16,
                                        },
                                    ]}>
                                    Time Zone
                                </CmlText>

                                <RNPickerSelect
                                    style={bigPickerSelectStyles}
                                    value={this.state.weekDay}
                                    onValueChange={(value) =>
                                        this.setState({
                                            weekDay: value,
                                        })
                                    }
                                    items={this.WEEKDAY_SELECTS}
                                />
                            </View>
                        </View>
                        {this.state.editIndex == -1 && (
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                }}>
                                <CmlButton
                                    title="Add"
                                    backgroundColor="#02b9db"
                                    style={{
                                        width: 80,
                                        marginTop: 12,
                                    }}
                                    onPress={() => {
                                        this.addResponder();
                                    }}
                                />
                            </View>
                        )}
                        {this.state.editIndex != -1 && (
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                }}>
                                <CmlButton
                                    title="Update"
                                    backgroundColor="#02b9db"
                                    style={{
                                        width: 80,
                                        marginTop: 12,
                                    }}
                                    onPress={() => {
                                        this.updateResponder();
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

export default SettingsScreen;
