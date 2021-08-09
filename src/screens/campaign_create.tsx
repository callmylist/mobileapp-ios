import React, { Component, memo } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Switch,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Text,
    ScrollView,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/header';
import { CmlText } from '../components/text';
import { CmlButton } from '../components/button';
import { CmlTextInput } from '../components/textinput';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import moment from 'moment';
import * as momenttz from 'moment-timezone';
import { SoundService } from '../service/sound.service';
import RNPickerSelect from 'react-native-picker-select';
import DocumentPicker from 'react-native-document-picker';
import Utils from '../utils';
import { CmlSpinner } from '../components/loading';
import { ContactService } from '../service/contact.service';

import Modal from 'react-native-modal';
import AppStyle from '../shared/styles';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PickerCheckBox from '../components/check-select/PickerCheckbox';
import { UserService } from '../service/user.service';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { CampaignService } from '../service/campaign.service';
import { store } from '../redux/store';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

const items = [
    {
        itemKey: 0,
        itemDescription: 'Sunday',
    },
    {
        itemKey: 1,
        itemDescription: 'Monday',
    },
    {
        itemKey: 2,
        itemDescription: 'Tuesday',
    },
    {
        itemKey: 3,
        itemDescription: 'Wednesday',
    },
    {
        itemKey: 4,
        itemDescription: 'Thursday',
    },
    {
        itemKey: 5,
        itemDescription: 'Friday',
    },
    {
        itemKey: 6,
        itemDescription: 'Saturday',
    },
];

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        flexDirection: 'row',
    },
    campaignLabel: {
        fontSize: 20,
        textAlign: 'center',
        color: '#515252',
        marginTop: 12,
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
    selectedStepContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#ffa67a',
    },
    stepContainer: {
        backgroundColor: '#02b9db',
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#02b9db',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
    },
    campaignTypeLogo: {
        width: 80,
        height: 80,
    },
    stepViewContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    stepDescription: {
        color: '#02b9db',
        marginTop: 24,
        textAlign: 'center',
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
        textAlign: 'center',
    },
    panelContainer: {
        width: '100%',
        marginTop: 16,
    },
    panel: {
        borderWidth: 1,
        borderColor: '#b8b8b8',
        paddingVertical: 12,
        flexDirection: 'row',
        borderRadius: 8,
    },
    leftContainer: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    leftLogo: {
        width: 24,
        height: 200,
    },
    panelOptionText: {
        color: '#6a6a6a',
        fontSize: 12,
        marginLeft: 8,
    },
    panelUploadContainer: {
        borderBottomColor: '#949494',
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        marginTop: 24,
    },
    panelUploadLabel: {
        flex: 1,
        color: '#515151',
    },
    panelBody: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    panelSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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
    borderBottom: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
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
    continueButton: {
        alignSelf: 'center',
        marginTop: 24,
    },
    continueButtonContainer: {
        flexDirection: 'row',

        alignItems: 'center',
        borderColor: '#555757',
        borderWidth: 1,
        borderRadius: 4,
        width: 160,
        justifyContent: 'center',
        height: 42,
    },
    continueButtonText: {
        color: '#555757',
        fontSize: 18,
        marginTop: 2,
        marginLeft: 8,
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
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        color: 'white',
        width: 1000,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: 'white',
        width: '100%',
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

class CampaignCreate extends Component<
    {
        navigation: any;
    },
    {
        step: number;
        startNow: boolean;
        campaign: any;
        isLiveAnswer: boolean;
        isTransfer: boolean;
        isDNC: boolean;
        soundFiles: any[];
        contactList: any[];
        loading: boolean;
        liveAnswerSelected: boolean;
        voiceMailSelected: boolean;
        transferSelected: boolean;
        doNotCallSelected: boolean;
        transferFileSelected: boolean;
        defaultDNCSound: any;
        defaultTransferSound: any;
        defaultDNCLiveSound: any;
        SoundPathUrlLiveanswer: any;
        SoundPathUrlVoicemail: any;
        SoundPathUrlTransfer: any;
        SoundPathUrlDnc: any;
        uploadList: boolean;
        containHeader: boolean;
        headerColumn: any;
        currentItem: any;
        startFuture: boolean;

        startDatePicker: boolean;
        startTimepicker: boolean;

        startRestrictionTimepicker: boolean;
        endRestrictionTimepicker: boolean;

        WEEKDAYS: any;
        isScheduleForMultipleDays: boolean;

        scheduleStartTimePicker: boolean;
        scheduleStartDatePicker: boolean;

        scheduleType: number;
        maxCPM: number;
        finishStep: number;
        sendTestCall: boolean;
        testCallNumber: string;
    }
    > {
    ALPHABETS: Array<string> = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];
    NUMBEROFATTEMPTS: Array<number> = [1, 2, 3, 4, 5];
    DIGITS: Array<string> = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '*',
        '#',
    ];
    TIMEINBETWEENATTEMPTS: Array<number> = [15, 30, 45, 60, 75, 90, 105, 120];
    pickerSelectStyles = StyleSheet.create({
        inputIOS: {
            width: '100%',
            color: 'black',
            height: 40,
        },
        placeholder: {
            color: '#515151',
        },
        viewContainer: {
            flex: 1,
        },
    });

    timezones = [
        { label: 'US/Pacific Time (PST)', value: 'US/Pacific' },
        { label: 'US/Mountain Time (MST)', value: 'US/Mountain' },
        { label: 'US/Central Time (CST)', value: 'US/Central' },
        { label: 'US/Eastern Time (EST)', value: 'US/Eastern' },
        { label: 'US/Hawaii Time (HST)', value: 'US/Hawaii' },
        { label: 'Europe/London (GMT)', value: 'Europe/London' },
        { label: 'Europe/Paris (CET)', value: 'Europe/Paris' },
        { label: 'Europe/Istanbul (TRT)', value: 'Europe/Istanbul' },
        { label: 'Asia/Shanghai (CST)', value: 'Asia/Shanghai' },
        { label: 'Asia/Tokyo (JST)', value: 'Asia/Tokyo' },
    ];
    constructor(props: any) {
        super(props);

        this.state = {
            step: 0,
            finishStep: 0,
            startNow: false,
            campaign: {
                type: 1,
                name: '',
                contactlistId: '',
                call: {
                    callerId: '',
                    resumeNextDay: false,
                    liveanswer: {
                        soundFileId: '',
                        name: '',
                        optOutIncluded: true,
                        includeOptOut: false,
                    },
                    voicemail: {
                        soundFileId: '',
                        name: '',
                        isRingless: false,
                    },
                    transfer: {
                        soundFileId: '',
                        name: '',
                        defaultAudio: false,
                        number: '',
                        digit: '1',
                        ctlimit: 2,
                    },
                    dnc: {
                        soundFileId: '',
                        name: '',
                        defaultAudio: false,
                        digit: '8',
                    },
                    settings: {
                        cpm: 30,
                        callbackOptions: {
                            vm: false,
                            busy: false,
                            na: false,
                            attempts: 1,
                            attemptTime: 15,
                        },
                        restrictions: {
                            startTime: '09:00',
                            EndTime: '18:00',
                            timeZone: 'US/Eastern',
                        },
                    },
                    schedule: {
                        resumeNextDay: false,
                        includeDays: [1, 2, 3, 4, 5],
                        startDateUI: moment(new Date()).format('YYYY-MM-DD'),
                        startTime: '09:00',
                        untilComplete: false,
                        endDateUI: '',
                        endTime: '18:00',
                        rangeStartTime: '09:00',
                        rangeEndTime: '18:00',
                    },
                },
            },
            soundFiles: [],
            contactList: [],
            isLiveAnswer: true,
            isTransfer: false,
            isDNC: false,
            loading: false,
            liveAnswerSelected: false,
            voiceMailSelected: false,
            transferSelected: false,
            doNotCallSelected: false,
            transferFileSelected: false,
            defaultDNCSound: null,
            defaultTransferSound: null,
            defaultDNCLiveSound: null,

            SoundPathUrlLiveanswer: null,
            SoundPathUrlVoicemail: null,
            SoundPathUrlTransfer: null,
            SoundPathUrlDnc: null,

            uploadList: false,
            currentItem: null,
            containHeader: false,
            headerColumn: 'A',
            startFuture: false,

            startDatePicker: false,
            startTimepicker: false,

            startRestrictionTimepicker: false,
            endRestrictionTimepicker: false,

            WEEKDAYS: {
                Sunday: false,
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false,
            },
            isScheduleForMultipleDays: false,

            scheduleStartTimePicker: false,
            scheduleStartDatePicker: false,
            scheduleType: 0,
            maxCPM: 50,
            sendTestCall: false,
            testCallNumber: '',
        };
    }

    componentDidMount() {
        this.loadSoundFiles();
        this.loadContactLists();
        UserService.getUserById().subscribe((data: any) => {
            let user = data.data;
            this.setState({
                maxCPM:
                    user.limits.callLimit !== 0 ? user.limits.callLimit : 50,
                campaign: {
                    ...this.state.campaign,
                    call: {
                        ...this.state.campaign.call,
                        settings: {
                            ...this.state.campaign.call.settings,
                            restrictions: {
                                ...this.state.campaign.call.settings
                                    .restrictions,
                                startTime: this.convertTime12to24(
                                    user.restrictions.startTime,
                                ),
                                EndTime: this.convertTime12to24(
                                    user.restrictions.endTime,
                                ),
                                timeZone: user.restrictions.timeZone,
                            },
                        },
                    },
                },
            });
        });
    }

    convertTime12to24(time12h: any) {
        let [hours, minutes] = time12h;

        if (hours === 12) {
            hours = '00';
        }

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return `${hours}:${minutes}`;
    }

    loadContactLists = (loading = false) => {
        if (loading) {
            this.setState({
                loading: true,
            });
        }
        ContactService.getContactList({
            currentPage: 0,
            pageSize: 0,
        }).subscribe((response: any) => {
            this.setState({
                loading: false,
                contactList: response.data,
            });
        });
    };

    loadSoundFiles = () => {
        this.setState({ loading: true });
        SoundService.getSoundList({
            pageSize: 9999,
            currentPage: 0,
        }).subscribe((response: any) => {
            this.setState({ soundFiles: response.data });
            SoundService.getDefaultSound().subscribe((response: any) => {
                this.setState({ loading: false });
                this.setState({
                    defaultDNCSound: response.data[0],
                    defaultTransferSound: response.data[1],
                    defaultDNCLiveSound: response.data[2],
                });
            });
        });
    };

    onBack = () => {
        this.props.navigation.pop();
    };

    onStart = () => {
        this.setState({
            startNow: true,
            scheduleType: 1,
        });
    };

    validatePhoneNumber(value: any) {
        const usaNumRegexp = new RegExp(
            '^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?$',
        );
        return usaNumRegexp.test(value);
    }

    continue = () => {
        Keyboard.dismiss();
        if (this.state.step >= 1) {
            if (this.state.campaign.name.trim() == '') {
                Utils.presentToast('Please enter a valid campaign name above.');

                return;
            }
        }
        if (this.state.step >= 2) {
            if (
                !this.state.campaign.call.callerId ||
                !this.validatePhoneNumber(this.state.campaign.call.callerId)
            ) {
                Utils.presentToast('Please enter a valid number.');
                return;
            }
        }
        if (this.state.step == 3) {
            if (
                this.state.isLiveAnswer &&
                this.state.campaign.call.liveanswer.soundFileId == ''
            ) {
                Utils.presentToast('Please Select an audio for liveanswer.');
                return;
            }
            if (this.state.campaign.call.voicemail.soundFileId == '') {
                Utils.presentToast('Please Select an audio for voicemail.');
                return;
            }

            if (
                this.state.isTransfer &&
                !this.state.campaign.call.transfer.defaultAudio
            ) {
                if (this.state.campaign.call.transfer.soundFileId == '') {
                    Utils.presentToast(
                        'Please Select an audio for call transfer.',
                    );
                    return;
                }
            }
            if (
                this.state.isDNC &&
                !this.state.campaign.call.dnc.defaultAudio
            ) {
                if (this.state.campaign.call.dnc.soundFileId === '') {
                    Utils.presentToast(
                        'Please Select an audio for Do Not Call.',
                    );
                    return;
                }
            }

            if (this.state.isTransfer) {
                if (
                    this.state.campaign.call.transfer.ctlimit < 1 ||
                    this.state.campaign.call.transfer.ctlimit > 99
                ) {
                    Utils.presentToast(
                        'Please Enter correct Concurrent Transfers.',
                    );
                    return;
                } else if (
                    !this.state.campaign.call.transfer.number ||
                    !this.validatePhoneNumber(
                        this.state.campaign.call.transfer.number,
                    )
                ) {
                    Utils.presentToast(
                        'Please Enter correct phone number to transfer call.',
                    );
                    return;
                }
            }

            this.setState({
                step: this.state.step + 1,
                finishStep: Math.max(
                    this.state.finishStep,
                    this.state.step + 1,
                ),
            });
        } else if (this.state.step === 4) {
            if (this.state.campaign.contactlistId == '') {
                Utils.presentToast('Please Select or upload contact list.');
                return;
            }
            this.setState({
                step: this.state.step + 1,
                finishStep: Math.max(
                    this.state.finishStep,
                    this.state.step + 1,
                ),
            });
        } else if (this.state.step === 5) {
            if (
                isNaN(this.state.campaign.call.settings.cpm) ||
                this.state.campaign.call.settings.cpm < 1 ||
                this.state.campaign.call.settings.cpm > this.state.maxCPM
            ) {
                Utils.presentToast('Please enter a valid cpm value.');
                return;
            }
            this.setState({
                step: this.state.step + 1,
                finishStep: Math.max(
                    this.state.finishStep,
                    this.state.step + 1,
                ),
            });
        } else {
            this.setState({
                step: this.state.step + 1,
                finishStep: Math.max(
                    this.state.finishStep,
                    this.state.step + 1,
                ),
            });
        }
    };

    start = () => {
        this.setState({
            startNow: false,
            startFuture: false,
        });

        if (this.state.scheduleType === 0) {
            Utils.presentToast('Please provide schedule details.');

            return;
        }

        if (this.state.campaign.name.length == 0) {
            Utils.presentToast('Please enter campaign name.');

            return;
        }

        if (this.state.campaign.call.callerId.length == 0) {
            Utils.presentToast('Please enter Caller ID.');

            return;
        }

        if (this.state.campaign.name.length == 0) {
            Utils.presentToast('Please enter campaign name');

            return;
        }

        if (this.state.campaign.name.length == 0) {
            Utils.presentToast('Please enter campaign name');

            return;
        }

        if (this.state.campaign.name.length == 0) {
            Utils.presentToast('Please enter campaign name');

            return;
        }

        if (
            this.state.scheduleType === 1 &&
            !this.state.isScheduleForMultipleDays &&
            !this.state.campaign.call.schedule.resumeNextDay
        ) {
            const nowDateInSelectedTimeZone = momenttz.tz(
                moment(),
                this.state.campaign.call.settings.restrictions.timeZone,
            );

            const date =
                nowDateInSelectedTimeZone._d.getFullYear() +
                '-' +
                (nowDateInSelectedTimeZone._d.getMonth() + 1) +
                '-' +
                nowDateInSelectedTimeZone._d.getDate();

            const selectedStartTimeAndDate =
                date +
                ' ' +
                this.state.campaign.call.settings.restrictions.startTime;

            const currentTimeInSelectedTimeZone = moment
                .tz(
                    moment(),
                    this.state.campaign.call.settings.restrictions.timeZone,
                )
                .format('YYYY-MM-DD HH:mm');

            const isAfter = moment(selectedStartTimeAndDate).isAfter(
                currentTimeInSelectedTimeZone,
            );

            if (isAfter) {
                Utils.presentToast(
                    'Entered Start Time could not be after current time in the selected time zone.',
                );

                return;
            }
        }

        if (this.state.scheduleType === 2) {
            if (this.state.campaign.call.schedule.startDateUI === '') {
                Utils.presentToast('Please select start date for schedule.');

                return;
            } else if (this.state.campaign.call.schedule.startTime === '') {
                Utils.presentToast('Please enter start date.');

                return;
            }
        }

        if (
            this.state.campaign.call.settings.restrictions.startTime.length == 0
        ) {
            Utils.presentToast('Please enter start time for restrictions.');
            return;
        }

        if (
            this.state.campaign.call.settings.restrictions.EndTime.length == 0
        ) {
            Utils.presentToast('Please enter start time for restrictions.');
            return;
        }

        const payload: any = {
            type: this.state.campaign.type,

            name: this.state.campaign.name,

            contactlistId: this.state.campaign.contactlistId,

            call: {
                callerId: this.state.campaign.call.callerId,

                resumeNextDay: this.state.campaign.call.schedule.resumeNextDay,

                voicemail: {
                    soundFileId: this.state.campaign.call.voicemail.soundFileId,

                    isRingless: this.state.campaign.call.voicemail.isRingless,
                },

                settings: {
                    cpm: Number(this.state.campaign.call.settings.cpm),

                    callbackOptions: {
                        vm: this.state.campaign.call.settings.callbackOptions
                            .vm,

                        busy: this.state.campaign.call.settings.callbackOptions
                            .busy,

                        na: this.state.campaign.call.settings.callbackOptions
                            .na,

                        attempts: this.state.campaign.call.settings
                            .callbackOptions.attempts,

                        attemptTime: this.state.campaign.call.settings
                            .callbackOptions.attemptTime,
                    },

                    restrictions: {
                        startTime: Utils.convertTime12toString(
                            this.state.campaign.call.settings.restrictions
                                .startTime,
                        ),

                        EndTime: Utils.convertTime12toString(
                            this.state.campaign.call.settings.restrictions
                                .EndTime,
                        ),

                        timeZone: this.state.campaign.call.settings.restrictions
                            .timeZone,
                    },
                },
            },
        };

        if (this.state.isLiveAnswer) {
            payload.call['liveanswer'] = {
                soundFileId: this.state.campaign.call.liveanswer.soundFileId,

                optOutIncluded: this.state.campaign.call.liveanswer
                    .optOutIncluded,

                includeOptOut: this.state.campaign.call.liveanswer
                    .includeOptOut,
            };
        }

        if (this.state.isTransfer) {
            payload.call['transfer'] = {
                soundFileId: this.state.campaign.call.transfer.soundFileId,

                defaultAudio: this.state.campaign.call.transfer.defaultAudio,

                number: this.state.campaign.call.transfer.number,

                digit: this.state.campaign.call.transfer.digit,

                ctlimit: this.state.campaign.call.transfer.ctlimit,
            };
        }

        if (this.state.isDNC) {
            payload.call['dnc'] = {
                soundFileId: this.state.campaign.call.dnc.soundFileId,

                defaultAudio: this.state.campaign.call.dnc.defaultAudio,

                digit: this.state.campaign.call.dnc.digit,
            };
        }

        payload.call['schedule'] = {
            startDateUI: '',

            startTime: [],

            includeDays: [],

            resumeNextDay: this.state.campaign.call.schedule.resumeNextDay,
        };

        if (this.state.scheduleType === 2) {
            payload.call.schedule.startDateUI = moment(
                this.state.campaign.call.schedule.startDateUI,
            ).format('YYYY-MM-DD');

            payload.call.schedule.startTime = Utils.convertTime12toString(
                this.state.campaign.call.schedule.startTime,
            );

            payload.call.schedule.untilComplete = this.state.campaign.call.schedule.untilComplete;

            payload.call.schedule.endDateUI = moment(
                this.state.campaign.call.schedule.endDateUI,
            ).format('YYYY-MM-DD');

            payload.call.schedule.endTime = Utils.convertTime12toString(
                this.state.campaign.call.schedule.endTime,
            );

            payload.call.schedule.includeDays = [];

            payload.call.schedule.rangeStartTime = Utils.convertTime12toString(
                this.state.campaign.call.schedule.rangeStartTime,
            );

            payload.call.schedule.rangeEndTime = Utils.convertTime12toString(
                this.state.campaign.call.schedule.rangeEndTime,
            );
        }

        if (this.state.isScheduleForMultipleDays) {
            if (this.state.WEEKDAYS.Sunday) {
                payload.call['schedule'].includeDays.push(1);
            }

            if (this.state.WEEKDAYS.Monday) {
                payload.call['schedule'].includeDays.push(2);
            }

            if (this.state.WEEKDAYS.Tuesday) {
                payload.call['schedule'].includeDays.push(3);
            }

            if (this.state.WEEKDAYS.Wednesday) {
                payload.call['schedule'].includeDays.push(4);
            }

            if (this.state.WEEKDAYS.Thursday) {
                payload.call['schedule'].includeDays.push(5);
            }

            if (this.state.WEEKDAYS.Friday) {
                payload.call['schedule'].includeDays.push(6);
            }

            if (this.state.WEEKDAYS.Saturday) {
                payload.call['schedule'].includeDays.push(7);
            }
        }

        CampaignService.createCampaign(payload).subscribe((response: any) => {
            if (response.success) this.props.navigation.pop();
            else {
                Utils.presentToast(
                    response.message + '. ' + response.submessage,
                );
            }
        });
    };

    upload = async () => {
        if (this.state.headerColumn == null) {
            Utils.presentToast('Please select valid column header');
            return;
        }

        this.setState(
            {
                uploadList: false,
            },
            () => {
                setTimeout(() => {
                    this.setState({
                        loading: true,
                    });
                    ContactService.uploadContactList(
                        this.state.currentItem,
                        this.state.containHeader,
                        this.state.headerColumn,
                        (response: any) => {
                            this.setState({
                                loading: false,
                            });
                            if (response.success == true) {
                                this.loadContactLists(true);
                            } else {
                                Utils.presentToast(response.message);
                            }
                        },
                    );
                }, 1000);
            },
        );
    };

    uploadList = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.csv],
        });

        this.setState({
            uploadList: true,
            currentItem: res,
        });
    };

    uploadAudio = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.audio],
        });

        this.setState({ loading: true });
        SoundService.uploadSound(res, (response: any) => {
            this.setState({ loading: false });
            if (response.success == true) {
                this.loadSoundFiles();
            } else {
                Utils.presentToast(response.message);
            }
        });
    };

    download = (item: any) => {
        let dirs = RNFetchBlob.fs.dirs;
        this.setState({ loading: true });
        RNFetchBlob.config({
            // response data will be saved to this path if it has access right.
            path: dirs.DocumentDir + '/' + item.fileName,
        })
            .fetch(
                'GET',
                store.getState().authReducer.assets.assetsPath +
                item.wavFilePath,
                {
                    //some headers ..
                },
            )
            .then((res: any) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                Utils.presentToast('File downloaded to application folder.');
                this.setState({ loading: false });
                RNFetchBlob.ios.previewDocument(res.data);
            });
    };

    playSound = async (item: any) => {
        const url =
            store.getState().authReducer.assets.assetsPath + item.wavFilePath;

        const localFile = `${RNFS.CachesDirectoryPath}/` + item.fileName;

        this.setState({ loading: true });
        const options = {
            fromUrl: url,
            toFile: localFile,
        };
        RNFS.downloadFile(options).promise.then(() => {
            this.setState({ loading: false }, () => {
                setTimeout(() => {
                    FileViewer.open(localFile);
                }, 500);
            });
        });
    };

    sendTestCall = () => {
        Keyboard.dismiss();

        if (!Utils.validatePhoneNumber(this.state.testCallNumber)) {
            Utils.presentToast('Please enter valid phone number.');
            return;
        }

        this.setState({
            sendTestCall: false,
        });

        const payload: any = {
            number: this.state.testCallNumber,
            callerId: this.state.campaign.call.callerId,
        };

        if (this.state.campaign.call.voicemail.isRingless) {
            payload['voicemail'] = this.state.campaign.call.voicemail;
        } else if (
            !this.state.campaign.call.voicemail.isRingless &&
            this.state.campaign.call.transfer.soundFileId === '' &&
            this.state.campaign.call.dnc.soundFileId === ''
        ) {
            payload['voicemail'] = this.state.campaign.call.voicemail;
            payload['liveanswer'] = this.state.campaign.call.liveanswer;
        } else if (
            this.state.campaign.call.transfer.soundFileId !== '' &&
            this.state.campaign.call.dnc !== ''
        ) {
            payload['voicemail'] = this.state.campaign.call.voicemail;
            payload['liveanswer'] = this.state.campaign.call.liveanswer;
            payload['transfer'] = this.state.campaign.call.transfer;
            payload['dnc'] = this.state.campaign.call.dnc;
        } else if (
            this.state.campaign.call.transfer.soundFileId !== '' &&
            this.state.campaign.call.dnc.soundFileId === ''
        ) {
            payload['voicemail'] = this.state.campaign.call.voicemail;
            payload['liveanswer'] = this.state.campaign.call.liveanswer;
            payload['transfer'] = this.state.campaign.call.transfer;
        } else if (
            this.state.campaign.call.transfer === '' &&
            this.state.campaign.call.dnc !== ''
        ) {
            payload['voicemail'] = this.state.campaign.call.voicemail;
            payload['liveanswer'] = this.state.campaign.call.liveanswer;
            payload['dnc'] = this.state.campaign.call.dnc;
        }
        this.setState({
            loading: true,
        });

        CampaignService.sendTestCall(payload).subscribe((response: any) => {
            this.setState({
                loading: false,
            });
            if (response.success) {
                Utils.presentToast('Call sent successfully.');
            } else {
                Utils.presentToast('Error :' + response.message);
            }
        });
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header back={true} onBack={this.onBack} menu={false} />
                <CmlSpinner visible={this.state.loading} />

                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View
                            style={{
                                width: '100%',
                            }}>
                            <CmlText style={styles.campaignLabel}>
                                New Campaign
                            </CmlText>
                        </View>
                        <View
                            style={{
                                width: '80%',
                                flex: 1,
                            }}>
                            {this.state.step == 0 && (
                                <View style={styles.stepViewContainer}>
                                    <Image
                                        source={require('../assets/images/create_logo.png')}
                                        style={styles.logo}
                                    />

                                    <CmlText style={styles.stepDescription}>
                                        What type of campaign would you like to
                                        send?
                                    </CmlText>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 24,
                                        }}>
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                padding: 16,
                                            }}>
                                            <Image
                                                source={require('../assets/images/campaign_call.png')}
                                                style={styles.campaignTypeLogo}
                                            />
                                            <CmlButton
                                                title="CALL"
                                                backgroundColor="#02b9db"
                                                style={{ marginTop: 16 }}
                                                onPress={() => this.continue()}
                                            />
                                        </View>
                                        {/* <View
                                                style={{
                                                    alignItems: 'center',
                                                    padding: 16,
                                                }}>
                                                <Image
                                                    source={require('../assets/images/campaign_text.png')}
                                                    style={
                                                        styles.campaignTypeLogo
                                                    }
                                                />
                                                <CmlButton
                                                    title="TEXT"
                                                    backgroundColor="#ffa67a"
                                                    style={{marginTop: 16}}
                                                />
                                            </View> */}
                                    </View>

                                    <TouchableOpacity
                                        style={styles.continueButton}
                                        onPress={() => this.continue()}>
                                        <View
                                            style={
                                                styles.continueButtonContainer
                                            }>
                                            <CmlText
                                                style={
                                                    styles.continueButtonText
                                                }>
                                                CONTINUE
                                            </CmlText>
                                            <MaterialIcons
                                                name="navigate-next"
                                                size={30}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {this.state.step == 1 && (
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        Enter your campaign name below
                                    </CmlText>
                                    <View style={styles.inputContainer}>
                                        <CmlTextInput
                                            placeholder="Please add campaign name here"
                                            style={styles.input}
                                            value={this.state.campaign.name}
                                            onChangeText={(val: string) => {
                                                this.setState({
                                                    campaign: {
                                                        ...this.state.campaign,
                                                        name: val,
                                                    },
                                                });
                                            }}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={styles.continueButton}
                                        onPress={() => this.continue()}>
                                        <View
                                            style={
                                                styles.continueButtonContainer
                                            }>
                                            <CmlText
                                                style={
                                                    styles.continueButtonText
                                                }>
                                                CONTINUE
                                            </CmlText>
                                            <MaterialIcons
                                                name="navigate-next"
                                                size={30}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {this.state.step == 2 && (
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        What number would you like displayed on
                                        the Caller ID
                                    </CmlText>
                                    <View style={styles.inputContainer}>
                                        <CmlTextInput
                                            placeholder="Please add caller id"
                                            style={styles.input}
                                            keyboardType="phone-pad"
                                            maxLength={11}
                                            value={
                                                this.state.campaign.call
                                                    .callerId
                                            }
                                            onChangeText={(val: string) => {
                                                this.setState({
                                                    campaign: {
                                                        ...this.state.campaign,
                                                        call: {
                                                            ...this.state
                                                                .campaign.call,
                                                            callerId: Utils.correctPhoneNumber(
                                                                val,
                                                            ),
                                                        },
                                                    },
                                                });
                                            }}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={styles.continueButton}
                                        onPress={() => this.continue()}>
                                        <View
                                            style={
                                                styles.continueButtonContainer
                                            }>
                                            <CmlText
                                                style={
                                                    styles.continueButtonText
                                                }>
                                                CONTINUE
                                            </CmlText>
                                            <MaterialIcons
                                                name="navigate-next"
                                                size={30}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {this.state.step == 3 && (
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        Select all options you would like for
                                        your campaign
                                    </CmlText>
                                    {((this.state.step == 3 &&
                                        !this.state.isDNC &&
                                        !this.state.isTransfer) ||
                                        this.state.step > 3) &&
                                        Utils.validatePhoneNumber(
                                            this.state.campaign.call.callerId,
                                        ) &&
                                        ((this.state.campaign.call.voicemail
                                            .isRingless &&
                                            this.state.campaign.call.voicemail
                                                .soundFileId) ||
                                            (!this.state.isDNC &&
                                                !this.state.isTransfer &&
                                                !this.state.campaign.call
                                                    .voicemail.isRingless &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId) ||
                                            (this.state.isTransfer &&
                                                Utils.validatePhoneNumber(
                                                    this.state.campaign.call
                                                        .transfer.number,
                                                ) &&
                                                !this.state.isDNC &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call
                                                    .transfer.defaultAudio ||
                                                    this.state.campaign.call
                                                        .transfer
                                                        .soundFileId)) ||
                                            (this.state.isDNC &&
                                                !this.state.isTransfer &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call.dnc
                                                    .defaultAudio ||
                                                    this.state.campaign.call.dnc
                                                        .soundFileId)) ||
                                            (Utils.validatePhoneNumber(
                                                this.state.campaign.call
                                                    .transfer.number,
                                            ) &&
                                                this.state.isDNC &&
                                                this.state.isTransfer &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call
                                                    .transfer.defaultAudio ||
                                                    this.state.campaign.call
                                                        .transfer
                                                        .soundFileId) &&
                                                (this.state.campaign.call.dnc
                                                    .defaultAudio ||
                                                    this.state.campaign.call.dnc
                                                        .soundFileId))) && (
                                            <View
                                                style={{
                                                    height: 32,
                                                    alignItems: 'flex-end',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                    width: '100%',
                                                    marginTop: 8,
                                                }}>
                                                <CmlButton
                                                    title="Send A Test Call"
                                                    backgroundColor="#ffa67a"
                                                    style={{ marginTop: 16 }}
                                                    onPress={() => {
                                                        this.setState({
                                                            sendTestCall: true,
                                                            testCallNumber: '',
                                                        });
                                                    }}
                                                />
                                            </View>
                                        )}

                                    <KeyboardAvoidingScrollView
                                        containerStyle={styles.panelContainer}>
                                        {this.state.isLiveAnswer && (
                                            <View style={styles.panel}>
                                                <View
                                                    style={
                                                        styles.leftContainer
                                                    }>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            Utils.presentToast(
                                                                'This audio file will be played when the recipient answers the phone live.',
                                                            );
                                                        }}>
                                                        <AntDesign
                                                            name="infocirlce"
                                                            size={20}
                                                            color="#7b7b7b"
                                                            style={{
                                                                marginLeft: 8,
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                    <Image
                                                        source={require('../assets/images/live_answer.png')}
                                                        style={styles.leftLogo}
                                                        resizeMode="contain"
                                                    />
                                                </View>

                                                <View style={styles.panelBody}>
                                                    {this.state
                                                        .liveAnswerSelected && (
                                                            <View
                                                                style={{
                                                                    width: '100%',
                                                                    flexDirection:
                                                                        'row',
                                                                    marginBottom: 24,
                                                                }}>
                                                                <CmlText
                                                                    style={{
                                                                        flex: 1,
                                                                        marginTop: 4,
                                                                    }}
                                                                    numberOfLines={
                                                                        1
                                                                    }>
                                                                    {
                                                                        this.state.soundFiles.filter(
                                                                            (
                                                                                file: any,
                                                                            ) => {
                                                                                return (
                                                                                    file.id ==
                                                                                    this
                                                                                        .state
                                                                                        .campaign
                                                                                        .call
                                                                                        .liveanswer
                                                                                        .soundFileId
                                                                                );
                                                                            },
                                                                        )[0]
                                                                            .fileName
                                                                    }
                                                                </CmlText>

                                                                <TouchableOpacity
                                                                    style={{
                                                                        marginRight: 8,
                                                                    }}
                                                                    onPress={() => {
                                                                        this.playSound(
                                                                            this.state.soundFiles.filter(
                                                                                (
                                                                                    file: any,
                                                                                ) => {
                                                                                    return (
                                                                                        file.id ==
                                                                                        this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call
                                                                                            .liveanswer
                                                                                            .soundFileId
                                                                                    );
                                                                                },
                                                                            )[0],
                                                                        );
                                                                    }}>
                                                                    <AntDesign
                                                                        name="playcircleo"
                                                                        size={24}
                                                                    />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    style={{
                                                                        marginRight: 8,
                                                                    }}
                                                                    onPress={() => {
                                                                        this.download(
                                                                            this.state.soundFiles.filter(
                                                                                (
                                                                                    file: any,
                                                                                ) => {
                                                                                    return (
                                                                                        file.id ==
                                                                                        this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call
                                                                                            .liveanswer
                                                                                            .soundFileId
                                                                                    );
                                                                                },
                                                                            )[0],
                                                                        );
                                                                    }}>
                                                                    <View
                                                                        style={
                                                                            styles.itemIcon
                                                                        }>
                                                                        <AntDesign
                                                                            name="download"
                                                                            size={
                                                                                14
                                                                            }
                                                                            color="#f57536"
                                                                        />
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )}
                                                    <View
                                                        style={
                                                            styles.panelSwitchContainer
                                                        }>
                                                        <Switch
                                                            value={
                                                                this.state
                                                                    .isTransfer
                                                            }
                                                            onValueChange={(
                                                                value: boolean,
                                                            ) => {
                                                                this.setState({
                                                                    isTransfer: value,
                                                                });
                                                            }}
                                                            trackColor={{
                                                                true: '#02b8da',
                                                                false: 'grey',
                                                            }}
                                                        />
                                                        <CmlText
                                                            style={
                                                                styles.panelOptionText
                                                            }>
                                                            Transfer
                                                        </CmlText>
                                                    </View>
                                                    <View
                                                        style={[
                                                            styles.panelSwitchContainer,
                                                            { marginTop: 8 },
                                                        ]}>
                                                        <Switch
                                                            value={
                                                                this.state.isDNC
                                                            }
                                                            onValueChange={(
                                                                value: boolean,
                                                            ) => {
                                                                this.setState({
                                                                    isDNC: value,
                                                                });
                                                            }}
                                                            trackColor={{
                                                                true: '#02b8da',
                                                                false: 'grey',
                                                            }}
                                                        />
                                                        <CmlText
                                                            style={
                                                                styles.panelOptionText
                                                            }>
                                                            Do Not Call
                                                        </CmlText>
                                                    </View>
                                                    {!this.state
                                                        .liveAnswerSelected && (
                                                            <>
                                                                <View
                                                                    style={
                                                                        styles.panelUploadContainer
                                                                    }>
                                                                    <RNPickerSelect
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .campaign
                                                                                .call
                                                                                .liveanswer
                                                                                .soundFileId
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) => {
                                                                            this.setState(
                                                                                {
                                                                                    campaign: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign,
                                                                                        call: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call,
                                                                                            liveanswer: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call
                                                                                                    .liveanswer,
                                                                                                soundFileId: value
                                                                                                    ? value
                                                                                                    : '',
                                                                                                name: value
                                                                                                    ? this.state.soundFiles.filter(
                                                                                                        (
                                                                                                            item: any,
                                                                                                        ) => {
                                                                                                            return (
                                                                                                                item.id ===
                                                                                                                value
                                                                                                            );
                                                                                                        },
                                                                                                    )[0]
                                                                                                        .fileName
                                                                                                    : '',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    SoundPathUrlLiveanswer: value
                                                                                        ? this.state.soundFiles.filter(
                                                                                            (
                                                                                                item: any,
                                                                                            ) => {
                                                                                                return (
                                                                                                    item.id ===
                                                                                                    value
                                                                                                );
                                                                                            },
                                                                                        )[0]
                                                                                            .wavFilePath
                                                                                        : '',
                                                                                },
                                                                            );

                                                                            if (
                                                                                Platform.OS ==
                                                                                'android'
                                                                            ) {
                                                                                this.setState(
                                                                                    {
                                                                                        liveAnswerSelected: true,
                                                                                    },
                                                                                );
                                                                            }
                                                                        }}
                                                                        items={this.state.soundFiles.map(
                                                                            (
                                                                                file: any,
                                                                            ) => {
                                                                                return {
                                                                                    label:
                                                                                        file.fileName,
                                                                                    value:
                                                                                        file.id,
                                                                                };
                                                                            },
                                                                        )}
                                                                        placeholder={{
                                                                            label:
                                                                                'Select Audio File',
                                                                        }}
                                                                        onDonePress={() => {
                                                                            if (
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .liveanswer
                                                                                    .soundFileId
                                                                                    .length >
                                                                                0
                                                                            ) {
                                                                                this.setState(
                                                                                    {
                                                                                        liveAnswerSelected: true,
                                                                                    },
                                                                                );
                                                                            }
                                                                        }}
                                                                        style={
                                                                            this
                                                                                .pickerSelectStyles
                                                                        }
                                                                    />
                                                                    {Platform.OS ==
                                                                        'ios' && (
                                                                            <Ionicons
                                                                                name="md-arrow-dropdown"
                                                                                size={
                                                                                    18
                                                                                }
                                                                                color="#7b7b7b"
                                                                                style={{
                                                                                    marginLeft: 8,
                                                                                    marginTop: 8,
                                                                                }}
                                                                            />
                                                                        )}
                                                                </View>
                                                                <CmlButton
                                                                    title="Upload Audio"
                                                                    backgroundColor="#02b9db"
                                                                    style={{
                                                                        marginTop: 24,
                                                                    }}
                                                                    onPress={() => {
                                                                        this.uploadAudio();
                                                                    }}
                                                                />
                                                            </>
                                                        )}

                                                    {this.state
                                                        .liveAnswerSelected && (
                                                            <CmlButton
                                                                title="Remove Audio"
                                                                backgroundColor="#ffa67a"
                                                                style={{
                                                                    marginTop: 20,
                                                                }}
                                                                onPress={() => {
                                                                    this.setState({
                                                                        liveAnswerSelected: false,
                                                                        campaign: {
                                                                            ...this
                                                                                .state
                                                                                .campaign,
                                                                            call: {
                                                                                ...this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call,
                                                                                liveanswer: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign
                                                                                        .call
                                                                                        .liveanswer,
                                                                                    soundFileId:
                                                                                        '',
                                                                                },
                                                                            },
                                                                        },
                                                                    });
                                                                }}
                                                            />
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        <View
                                            style={[
                                                styles.panel,
                                                {
                                                    marginTop: 16,
                                                },
                                            ]}>
                                            <View style={styles.leftContainer}>
                                                <Image
                                                    source={require('../assets/images/voice_mail.png')}
                                                    style={styles.leftLogo}
                                                    resizeMode="contain"
                                                />
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Utils.presentToast(
                                                            "This audio file will be played when the recipient doesn't answer live.",
                                                        );
                                                    }}>
                                                    <AntDesign
                                                        name="infocirlce"
                                                        size={20}
                                                        color="#7b7b7b"
                                                        style={{
                                                            marginLeft: 8,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.panelBody}>
                                                {this.state
                                                    .voiceMailSelected && (
                                                        <View
                                                            style={{
                                                                width: '100%',
                                                                flexDirection:
                                                                    'row',
                                                                marginBottom: 12,
                                                            }}>
                                                            <CmlText
                                                                style={{
                                                                    flex: 1,
                                                                    marginTop: 4,
                                                                }}
                                                                numberOfLines={1}>
                                                                {
                                                                    this.state.soundFiles.filter(
                                                                        (
                                                                            file: any,
                                                                        ) => {
                                                                            return (
                                                                                file.id ==
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .voicemail
                                                                                    .soundFileId
                                                                            );
                                                                        },
                                                                    )[0].fileName
                                                                }
                                                            </CmlText>

                                                            <TouchableOpacity
                                                                style={{
                                                                    marginRight: 8,
                                                                }}
                                                                onPress={
                                                                    () => { }
                                                                    // this.playSound(
                                                                    //     item.item,
                                                                    // )
                                                                }>
                                                                <AntDesign
                                                                    name="playcircleo"
                                                                    size={24}
                                                                />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={{
                                                                    marginRight: 8,
                                                                }}
                                                                onPress={
                                                                    () => { }
                                                                    // this.download(
                                                                    //     item.item,
                                                                    // )
                                                                }>
                                                                <View
                                                                    style={
                                                                        styles.itemIcon
                                                                    }>
                                                                    <AntDesign
                                                                        name="download"
                                                                        size={14}
                                                                        color="#f57536"
                                                                    />
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}

                                                {!this.state
                                                    .voiceMailSelected && (
                                                        <View
                                                            style={{
                                                                width: '100%',
                                                            }}>
                                                            <CmlText>
                                                                For best results:
                                                        </CmlText>
                                                            <CmlText
                                                                style={{
                                                                    fontSize: 12,
                                                                    color:
                                                                        '#6a6a6a',
                                                                }}>
                                                                23-37 seconds
                                                                recommended
                                                        </CmlText>
                                                        </View>
                                                    )}

                                                <View
                                                    style={[
                                                        styles.panelSwitchContainer,
                                                        { marginTop: 16 },
                                                    ]}>
                                                    <Switch
                                                        value={
                                                            this.state.campaign
                                                                .call.voicemail
                                                                .isRingless
                                                        }
                                                        onValueChange={(
                                                            value: boolean,
                                                        ) => {
                                                            this.setState({
                                                                campaign: {
                                                                    ...this
                                                                        .state
                                                                        .campaign,
                                                                    call: {
                                                                        ...this
                                                                            .state
                                                                            .campaign
                                                                            .call,
                                                                        voicemail: {
                                                                            ...this
                                                                                .state
                                                                                .campaign
                                                                                .call
                                                                                .voicemail,
                                                                            isRingless: value,
                                                                        },
                                                                    },
                                                                },
                                                            });
                                                            if (value) {
                                                                this.setState({
                                                                    isDNC: false,
                                                                    isTransfer: false,
                                                                    isLiveAnswer: false,
                                                                });
                                                            } else {
                                                                this.setState({
                                                                    isLiveAnswer: true,
                                                                });
                                                            }
                                                        }}
                                                        trackColor={{
                                                            true: '#02b8da',
                                                            false: 'grey',
                                                        }}
                                                    />
                                                    <CmlText
                                                        style={
                                                            styles.panelOptionText
                                                        }>
                                                        Use Ringless Voicemail
                                                    </CmlText>
                                                </View>

                                                {!this.state
                                                    .voiceMailSelected && (
                                                        <>
                                                            <View
                                                                style={
                                                                    styles.panelUploadContainer
                                                                }>
                                                                <RNPickerSelect
                                                                    value={
                                                                        this.state
                                                                            .campaign
                                                                            .call
                                                                            .voicemail
                                                                            .soundFileId
                                                                    }
                                                                    onValueChange={(
                                                                        value,
                                                                    ) => {
                                                                        this.setState(
                                                                            {
                                                                                campaign: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign,
                                                                                    call: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call,
                                                                                        voicemail: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .voicemail,
                                                                                            soundFileId: value
                                                                                                ? value
                                                                                                : '',
                                                                                            name: value
                                                                                                ? this.state.soundFiles.filter(
                                                                                                    (
                                                                                                        item: any,
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            item.id ===
                                                                                                            value
                                                                                                        );
                                                                                                    },
                                                                                                )[0]
                                                                                                    .fileName
                                                                                                : '',
                                                                                        },
                                                                                    },
                                                                                },
                                                                                SoundPathUrlVoicemail: value
                                                                                    ? this.state.soundFiles.filter(
                                                                                        (
                                                                                            item: any,
                                                                                        ) => {
                                                                                            return (
                                                                                                item.id ===
                                                                                                value
                                                                                            );
                                                                                        },
                                                                                    )[0]
                                                                                        .wavFilePath
                                                                                    : '',
                                                                            },
                                                                        );

                                                                        if (
                                                                            Platform.OS ==
                                                                            'android'
                                                                        ) {
                                                                            this.setState(
                                                                                {
                                                                                    voiceMailSelected: true,
                                                                                },
                                                                            );
                                                                        }
                                                                    }}
                                                                    onDonePress={() => {
                                                                        if (
                                                                            this
                                                                                .state
                                                                                .campaign
                                                                                .call
                                                                                .voicemail
                                                                                .soundFileId
                                                                                .length >
                                                                            0
                                                                        ) {
                                                                            this.setState(
                                                                                {
                                                                                    voiceMailSelected: true,
                                                                                },
                                                                            );
                                                                        }
                                                                    }}
                                                                    items={this.state.soundFiles.map(
                                                                        (
                                                                            file: any,
                                                                        ) => {
                                                                            return {
                                                                                label:
                                                                                    file.fileName,
                                                                                value:
                                                                                    file.id,
                                                                            };
                                                                        },
                                                                    )}
                                                                    placeholder={{
                                                                        label:
                                                                            'Select Audio File',
                                                                    }}
                                                                    style={
                                                                        this
                                                                            .pickerSelectStyles
                                                                    }
                                                                />
                                                                {Platform.OS ==
                                                                    'ios' && (
                                                                        <Ionicons
                                                                            name="md-arrow-dropdown"
                                                                            size={18}
                                                                            color="#7b7b7b"
                                                                            style={{
                                                                                marginLeft: 8,
                                                                                marginTop: 8,
                                                                            }}
                                                                        />
                                                                    )}
                                                            </View>
                                                            <CmlButton
                                                                title="Upload Audio"
                                                                backgroundColor="#02b9db"
                                                                style={{
                                                                    marginTop: 24,
                                                                }}
                                                                onPress={() => {
                                                                    this.uploadAudio();
                                                                }}
                                                            />
                                                        </>
                                                    )}

                                                {this.state
                                                    .voiceMailSelected && (
                                                        <CmlButton
                                                            title="Remove Audio"
                                                            backgroundColor="#ffa67a"
                                                            style={{
                                                                marginTop: 40,
                                                            }}
                                                            onPress={() => {
                                                                this.setState({
                                                                    voiceMailSelected: false,
                                                                    campaign: {
                                                                        ...this
                                                                            .state
                                                                            .campaign,
                                                                        call: {
                                                                            ...this
                                                                                .state
                                                                                .campaign
                                                                                .call,
                                                                            voicemail: {
                                                                                ...this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .voicemail,
                                                                                soundFileId:
                                                                                    '',
                                                                            },
                                                                        },
                                                                    },
                                                                });
                                                            }}
                                                        />
                                                    )}
                                            </View>
                                        </View>

                                        {this.state.isTransfer && (
                                            <View
                                                style={[
                                                    styles.panel,
                                                    {
                                                        marginTop: 16,
                                                    },
                                                ]}>
                                                <View
                                                    style={
                                                        styles.leftContainer
                                                    }>
                                                    <Image
                                                        source={require('../assets/images/transfer.png')}
                                                        style={styles.leftLogo}
                                                        resizeMode="contain"
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            Utils.presentToast(
                                                                'This audio will he played while the caller is being transferred.',
                                                            );
                                                        }}>
                                                        <AntDesign
                                                            name="infocirlce"
                                                            size={20}
                                                            color="#7b7b7b"
                                                            style={{
                                                                marginLeft: 8,
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={styles.panelBody}>
                                                    {this.state
                                                        .transferFileSelected && (
                                                            <>
                                                                {this.state.campaign
                                                                    .call.transfer
                                                                    .defaultAudio && (
                                                                        <View
                                                                            style={{
                                                                                width:
                                                                                    '100%',
                                                                                flexDirection:
                                                                                    'row',
                                                                                marginBottom: 12,
                                                                            }}>
                                                                            <CmlText
                                                                                style={{
                                                                                    flex: 1,
                                                                                    marginTop: 4,
                                                                                }}
                                                                                numberOfLines={
                                                                                    1
                                                                                }>
                                                                                Default
                                                                                Audio
                                                                    </CmlText>

                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.playSound(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <AntDesign
                                                                                    name="playcircleo"
                                                                                    size={
                                                                                        24
                                                                                    }
                                                                                />
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.download(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <View
                                                                                    style={
                                                                                        styles.itemIcon
                                                                                    }>
                                                                                    <AntDesign
                                                                                        name="download"
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                        color="#f57536"
                                                                                    />
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}
                                                                {!this.state
                                                                    .campaign.call
                                                                    .transfer
                                                                    .defaultAudio && (
                                                                        <View
                                                                            style={{
                                                                                width:
                                                                                    '100%',
                                                                                flexDirection:
                                                                                    'row',
                                                                                marginBottom: 12,
                                                                            }}>
                                                                            <CmlText
                                                                                style={{
                                                                                    flex: 1,
                                                                                    marginTop: 4,
                                                                                }}
                                                                                numberOfLines={
                                                                                    1
                                                                                }>
                                                                                {
                                                                                    this.state.soundFiles.filter(
                                                                                        (
                                                                                            file: any,
                                                                                        ) => {
                                                                                            return (
                                                                                                file.id ==
                                                                                                this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call
                                                                                                    .transfer
                                                                                                    .soundFileId
                                                                                            );
                                                                                        },
                                                                                    )[0]
                                                                                        .fileName
                                                                                }
                                                                            </CmlText>

                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.playSound(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <AntDesign
                                                                                    name="playcircleo"
                                                                                    size={
                                                                                        24
                                                                                    }
                                                                                />
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.download(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <View
                                                                                    style={
                                                                                        styles.itemIcon
                                                                                    }>
                                                                                    <AntDesign
                                                                                        name="download"
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                        color="#f57536"
                                                                                    />
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}
                                                            </>
                                                        )}

                                                    {!this.state
                                                        .transferFileSelected && (
                                                            <>
                                                                <View
                                                                    style={{
                                                                        width:
                                                                            '100%',
                                                                    }}>
                                                                    <CmlText>
                                                                        For best
                                                                        results:
                                                                </CmlText>
                                                                    <CmlText
                                                                        style={{
                                                                            fontSize: 12,
                                                                            color:
                                                                                '#6a6a6a',
                                                                        }}>
                                                                        23-37
                                                                        seconds
                                                                        recommended
                                                                </CmlText>
                                                                </View>
                                                                <View
                                                                    style={[
                                                                        styles.panelSwitchContainer,
                                                                        {
                                                                            marginTop: 16,
                                                                        },
                                                                    ]}>
                                                                    <Switch
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .campaign
                                                                                .call
                                                                                .transfer
                                                                                .defaultAudio
                                                                        }
                                                                        onValueChange={(
                                                                            value: boolean,
                                                                        ) => {
                                                                            this.setState(
                                                                                {
                                                                                    campaign: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign,
                                                                                        call: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call,
                                                                                            transfer: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call
                                                                                                    .transfer,
                                                                                                defaultAudio: value,
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    SoundPathUrlTransfer: this
                                                                                        .state
                                                                                        .defaultTransferSound
                                                                                        .wavFilePath,
                                                                                },
                                                                                () => {
                                                                                    if (
                                                                                        this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call
                                                                                            .transfer
                                                                                            .defaultAudio
                                                                                    ) {
                                                                                        this.setState(
                                                                                            {
                                                                                                campaign: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign,
                                                                                                    call: {
                                                                                                        ...this
                                                                                                            .state
                                                                                                            .campaign
                                                                                                            .call,
                                                                                                        transfer: {
                                                                                                            ...this
                                                                                                                .state
                                                                                                                .campaign
                                                                                                                .call
                                                                                                                .transfer,
                                                                                                            soundFileId: this
                                                                                                                .state
                                                                                                                .defaultTransferSound
                                                                                                                .id,

                                                                                                            name: this.state.soundFiles.filter(
                                                                                                                (
                                                                                                                    item: any,
                                                                                                                ) => {
                                                                                                                    return (
                                                                                                                        item.id ===
                                                                                                                        this
                                                                                                                            .state
                                                                                                                            .defaultTransferSound
                                                                                                                            .id
                                                                                                                    );
                                                                                                                },
                                                                                                            )[0]
                                                                                                                .fileName,
                                                                                                        },
                                                                                                    },
                                                                                                },
                                                                                                transferFileSelected: true,
                                                                                            },
                                                                                        );
                                                                                    } else {
                                                                                        this.setState(
                                                                                            {
                                                                                                campaign: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign,
                                                                                                    call: {
                                                                                                        ...this
                                                                                                            .state
                                                                                                            .campaign
                                                                                                            .call,
                                                                                                        transfer: {
                                                                                                            ...this
                                                                                                                .state
                                                                                                                .campaign
                                                                                                                .call
                                                                                                                .transfer,
                                                                                                            soundFileId:
                                                                                                                '',
                                                                                                            name:
                                                                                                                '',
                                                                                                        },
                                                                                                    },
                                                                                                },
                                                                                                transferFileSelected: true,
                                                                                            },
                                                                                        );
                                                                                    }
                                                                                },
                                                                            );
                                                                        }}
                                                                        trackColor={{
                                                                            true:
                                                                                '#02b8da',
                                                                            false:
                                                                                'grey',
                                                                        }}
                                                                    />
                                                                    <CmlText
                                                                        style={
                                                                            styles.panelOptionText
                                                                        }>
                                                                        Use default
                                                                        audio
                                                                </CmlText>
                                                                </View>
                                                                <View
                                                                    style={
                                                                        styles.panelUploadContainer
                                                                    }>
                                                                    <RNPickerSelect
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .campaign
                                                                                .call
                                                                                .transfer
                                                                                .soundFileId
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) => {
                                                                            this.setState(
                                                                                {
                                                                                    campaign: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign,
                                                                                        call: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call,
                                                                                            transfer: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call
                                                                                                    .transfer,
                                                                                                soundFileId: value
                                                                                                    ? value
                                                                                                    : '',
                                                                                                fileName: value
                                                                                                    ? this.state.soundFiles.filter(
                                                                                                        (
                                                                                                            item: any,
                                                                                                        ) => {
                                                                                                            return (
                                                                                                                item.id ===
                                                                                                                value
                                                                                                            );
                                                                                                        },
                                                                                                    )[0]
                                                                                                        .fileName
                                                                                                    : '',
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    SoundPathUrlTransfer: value
                                                                                        ? this.state.soundFiles.filter(
                                                                                            (
                                                                                                file: any,
                                                                                            ) => {
                                                                                                return (
                                                                                                    file.id ===
                                                                                                    value
                                                                                                );
                                                                                            },
                                                                                        )[0]
                                                                                            .wavFilePath
                                                                                        : '',
                                                                                },
                                                                            );

                                                                            if (
                                                                                Platform.OS ==
                                                                                'android'
                                                                            ) {
                                                                                this.setState(
                                                                                    {
                                                                                        transferFileSelected: true,
                                                                                    },
                                                                                );
                                                                            }
                                                                        }}
                                                                        onDonePress={() => {
                                                                            if (
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .transfer
                                                                                    .soundFileId
                                                                                    .length >
                                                                                0
                                                                            ) {
                                                                                this.setState(
                                                                                    {
                                                                                        transferFileSelected: true,
                                                                                    },
                                                                                );
                                                                            }
                                                                        }}
                                                                        items={this.state.soundFiles.map(
                                                                            (
                                                                                file: any,
                                                                            ) => {
                                                                                return {
                                                                                    label:
                                                                                        file.fileName,
                                                                                    value:
                                                                                        file.id,
                                                                                };
                                                                            },
                                                                        )}
                                                                        placeholder={{
                                                                            label:
                                                                                'Select Audio File',
                                                                        }}
                                                                        style={
                                                                            this
                                                                                .pickerSelectStyles
                                                                        }
                                                                    />
                                                                    {Platform.OS ==
                                                                        'ios' && (
                                                                            <Ionicons
                                                                                name="md-arrow-dropdown"
                                                                                size={
                                                                                    18
                                                                                }
                                                                                color="#7b7b7b"
                                                                                style={{
                                                                                    marginLeft: 8,
                                                                                    marginTop: 8,
                                                                                }}
                                                                            />
                                                                        )}
                                                                </View>
                                                                <CmlButton
                                                                    title="Upload Audio"
                                                                    backgroundColor="#02b9db"
                                                                    style={{
                                                                        marginTop: 24,
                                                                    }}
                                                                    onPress={() => {
                                                                        this.uploadAudio();
                                                                    }}
                                                                />
                                                            </>
                                                        )}

                                                    {this.state
                                                        .transferFileSelected && (
                                                            <>
                                                                <View
                                                                    style={{
                                                                        width:
                                                                            '100%',
                                                                        marginTop: 8,
                                                                    }}>
                                                                    <CmlText
                                                                        style={{
                                                                            width:
                                                                                '100%',
                                                                        }}>
                                                                        Transfer
                                                                        Digit
                                                                </CmlText>

                                                                    <View
                                                                        style={[
                                                                            styles.panelUploadContainer,
                                                                            {
                                                                                marginTop: 8,
                                                                            },
                                                                        ]}>
                                                                        <RNPickerSelect
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .transfer
                                                                                    .digit
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        campaign: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign,
                                                                                            call: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call,
                                                                                                transfer: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign
                                                                                                        .call
                                                                                                        .transfer,
                                                                                                    digit: value,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                );
                                                                            }}
                                                                            items={this.DIGITS.map(
                                                                                (
                                                                                    digit: any,
                                                                                ) => {
                                                                                    return {
                                                                                        label: digit,
                                                                                        value: digit,
                                                                                    };
                                                                                },
                                                                            )}
                                                                            placeholder={{}}
                                                                            style={
                                                                                this
                                                                                    .pickerSelectStyles
                                                                            }
                                                                        />
                                                                        {Platform.OS ==
                                                                            'ios' && (
                                                                                <Ionicons
                                                                                    name="md-arrow-dropdown"
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                    color="#7b7b7b"
                                                                                    style={{
                                                                                        marginLeft: 8,
                                                                                        marginTop: 8,
                                                                                    }}
                                                                                />
                                                                            )}
                                                                    </View>

                                                                    <CmlText
                                                                        style={{
                                                                            width:
                                                                                '100%',
                                                                            marginTop: 12,
                                                                        }}>
                                                                        Concurrent
                                                                        Transfers (1
                                                                        - 99)
                                                                </CmlText>
                                                                    <View
                                                                        style={[
                                                                            styles.panelUploadContainer,
                                                                            {
                                                                                marginTop: 8,
                                                                            },
                                                                        ]}>
                                                                        <CmlTextInput
                                                                            style={{
                                                                                flex: 1,
                                                                            }}
                                                                            keyboardType={
                                                                                'numeric'
                                                                            }
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .transfer
                                                                                    .ctlimit +
                                                                                ''
                                                                            }
                                                                            onChangeText={(
                                                                                value: any,
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        campaign: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign,
                                                                                            call: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call,
                                                                                                transfer: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign
                                                                                                        .call
                                                                                                        .transfer,
                                                                                                    ctlimit: value,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                );
                                                                            }}
                                                                        />
                                                                    </View>

                                                                    <CmlText
                                                                        style={{
                                                                            width:
                                                                                '100%',
                                                                            marginTop: 12,
                                                                        }}>
                                                                        Phone Number
                                                                </CmlText>
                                                                    <View
                                                                        style={[
                                                                            styles.panelUploadContainer,
                                                                            {
                                                                                marginTop: 8,
                                                                            },
                                                                        ]}>
                                                                        <CmlTextInput
                                                                            style={{
                                                                                flex: 1,
                                                                            }}
                                                                            keyboardType={
                                                                                'phone-pad'
                                                                            }
                                                                            placeholder="555-555-5555"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .transfer
                                                                                    .number
                                                                            }
                                                                            onChangeText={(
                                                                                value: any,
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        campaign: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign,
                                                                                            call: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call,
                                                                                                transfer: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign
                                                                                                        .call
                                                                                                        .transfer,
                                                                                                    number: value,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                );
                                                                            }}
                                                                        />
                                                                    </View>
                                                                </View>

                                                                <CmlButton
                                                                    title="Remove Audio"
                                                                    backgroundColor="#ffa67a"
                                                                    style={{
                                                                        marginTop: 40,
                                                                    }}
                                                                    onPress={() => {
                                                                        this.setState(
                                                                            {
                                                                                transferFileSelected: false,
                                                                                campaign: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign,
                                                                                    call: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call,
                                                                                        transfer: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .transfer,
                                                                                            soundFileId:
                                                                                                '',
                                                                                            fileName:
                                                                                                '',
                                                                                            defaultAudio: false,
                                                                                        },
                                                                                    },
                                                                                },
                                                                                SoundPathUrlTransfer:
                                                                                    '',
                                                                            },
                                                                        );
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        {this.state.isDNC && (
                                            <View
                                                style={[
                                                    styles.panel,
                                                    {
                                                        marginTop: 16,
                                                    },
                                                ]}>
                                                <View
                                                    style={
                                                        styles.leftContainer
                                                    }>
                                                    <Image
                                                        source={require('../assets/images/do_not_call.png')}
                                                        style={styles.leftLogo}
                                                        resizeMode="contain"
                                                    />
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            Utils.presentToast(
                                                                "This audio file will be played if the recipient chooses to opt out the future campaigns. Ex - 'You have now been placed on the do not call list and you will not receive any future automated calls from us.'",
                                                            );
                                                        }}>
                                                        <AntDesign
                                                            name="infocirlce"
                                                            size={20}
                                                            color="#7b7b7b"
                                                            style={{
                                                                marginLeft: 8,
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={styles.panelBody}>
                                                    {this.state
                                                        .doNotCallSelected && (
                                                            <>
                                                                {this.state.campaign
                                                                    .call.dnc
                                                                    .defaultAudio && (
                                                                        <View
                                                                            style={{
                                                                                width:
                                                                                    '100%',
                                                                                flexDirection:
                                                                                    'row',
                                                                                marginBottom: 12,
                                                                            }}>
                                                                            <CmlText
                                                                                style={{
                                                                                    flex: 1,
                                                                                    marginTop: 4,
                                                                                }}
                                                                                numberOfLines={
                                                                                    1
                                                                                }>
                                                                                Default
                                                                                Audio
                                                                    </CmlText>

                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.playSound(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <AntDesign
                                                                                    name="playcircleo"
                                                                                    size={
                                                                                        24
                                                                                    }
                                                                                />
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.download(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <View
                                                                                    style={
                                                                                        styles.itemIcon
                                                                                    }>
                                                                                    <AntDesign
                                                                                        name="download"
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                        color="#f57536"
                                                                                    />
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}
                                                                {!this.state
                                                                    .campaign.call
                                                                    .dnc
                                                                    .defaultAudio && (
                                                                        <View
                                                                            style={{
                                                                                width:
                                                                                    '100%',
                                                                                flexDirection:
                                                                                    'row',
                                                                                marginBottom: 12,
                                                                            }}>
                                                                            <CmlText
                                                                                style={{
                                                                                    flex: 1,
                                                                                    marginTop: 4,
                                                                                }}
                                                                                numberOfLines={
                                                                                    1
                                                                                }>
                                                                                {
                                                                                    this.state.soundFiles.filter(
                                                                                        (
                                                                                            file: any,
                                                                                        ) => {
                                                                                            return (
                                                                                                file.id ==
                                                                                                this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call
                                                                                                    .dnc
                                                                                                    .soundFileId
                                                                                            );
                                                                                        },
                                                                                    )[0]
                                                                                        .fileName
                                                                                }
                                                                            </CmlText>

                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.playSound(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <AntDesign
                                                                                    name="playcircleo"
                                                                                    size={
                                                                                        24
                                                                                    }
                                                                                />
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                style={{
                                                                                    marginRight: 8,
                                                                                }}
                                                                                onPress={
                                                                                    () => { }
                                                                                    // this.download(
                                                                                    //     item.item,
                                                                                    // )
                                                                                }>
                                                                                <View
                                                                                    style={
                                                                                        styles.itemIcon
                                                                                    }>
                                                                                    <AntDesign
                                                                                        name="download"
                                                                                        size={
                                                                                            14
                                                                                        }
                                                                                        color="#f57536"
                                                                                    />
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}
                                                            </>
                                                        )}

                                                    {!this.state
                                                        .doNotCallSelected && (
                                                            <>
                                                                <View
                                                                    style={{
                                                                        width:
                                                                            '100%',
                                                                    }}>
                                                                    <CmlText>
                                                                        For best
                                                                        results:
                                                                </CmlText>
                                                                    <CmlText
                                                                        style={{
                                                                            fontSize: 12,
                                                                            color:
                                                                                '#6a6a6a',
                                                                        }}>
                                                                        23-37
                                                                        seconds
                                                                        recommended
                                                                </CmlText>
                                                                </View>
                                                                <View
                                                                    style={[
                                                                        styles.panelSwitchContainer,
                                                                        {
                                                                            marginTop: 16,
                                                                        },
                                                                    ]}>
                                                                    <Switch
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .campaign
                                                                                .call
                                                                                .transfer
                                                                                .defaultAudio
                                                                        }
                                                                        onValueChange={(
                                                                            value: boolean,
                                                                        ) => {
                                                                            this.setState(
                                                                                {
                                                                                    campaign: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign,
                                                                                        call: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call,
                                                                                            dnc: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call
                                                                                                    .dnc,
                                                                                                defaultAudio: value,
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    SoundPathUrlDnc: this
                                                                                        .state
                                                                                        .defaultDNCLiveSound
                                                                                        .wavFilePath,
                                                                                },
                                                                                () => {
                                                                                    if (
                                                                                        this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call
                                                                                            .dnc
                                                                                            .defaultAudio
                                                                                    ) {
                                                                                        this.setState(
                                                                                            {
                                                                                                campaign: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign,
                                                                                                    call: {
                                                                                                        ...this
                                                                                                            .state
                                                                                                            .campaign
                                                                                                            .call,
                                                                                                        dnc: {
                                                                                                            ...this
                                                                                                                .state
                                                                                                                .campaign
                                                                                                                .call
                                                                                                                .dnc,
                                                                                                            soundFileId: this
                                                                                                                .state
                                                                                                                .defaultDNCLiveSound
                                                                                                                .id,
                                                                                                            fileName: this.state.soundFiles.filter(
                                                                                                                (
                                                                                                                    item: any,
                                                                                                                ) => {
                                                                                                                    return (
                                                                                                                        item.id ===
                                                                                                                        this
                                                                                                                            .state
                                                                                                                            .defaultDNCLiveSound
                                                                                                                            .id
                                                                                                                    );
                                                                                                                },
                                                                                                            )[0]
                                                                                                                .fileName,
                                                                                                        },
                                                                                                    },
                                                                                                },
                                                                                                doNotCallSelected: true,
                                                                                            },
                                                                                        );
                                                                                    } else {
                                                                                        this.setState(
                                                                                            {
                                                                                                campaign: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign,
                                                                                                    call: {
                                                                                                        ...this
                                                                                                            .state
                                                                                                            .campaign
                                                                                                            .call,
                                                                                                        dnc: {
                                                                                                            ...this
                                                                                                                .state
                                                                                                                .campaign
                                                                                                                .call
                                                                                                                .dnc,
                                                                                                            soundFileId:
                                                                                                                '',
                                                                                                        },
                                                                                                    },
                                                                                                },
                                                                                                doNotCallSelected: true,
                                                                                            },
                                                                                        );
                                                                                    }
                                                                                },
                                                                            );
                                                                        }}
                                                                        trackColor={{
                                                                            true:
                                                                                '#02b8da',
                                                                            false:
                                                                                'grey',
                                                                        }}
                                                                    />
                                                                    <CmlText
                                                                        style={
                                                                            styles.panelOptionText
                                                                        }>
                                                                        Use default
                                                                        audio
                                                                </CmlText>
                                                                </View>
                                                                <View
                                                                    style={
                                                                        styles.panelUploadContainer
                                                                    }>
                                                                    <RNPickerSelect
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .campaign
                                                                                .call
                                                                                .dnc
                                                                                .soundFileId
                                                                        }
                                                                        onValueChange={(
                                                                            value,
                                                                        ) => {
                                                                            this.setState(
                                                                                {
                                                                                    campaign: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign,
                                                                                        call: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call,
                                                                                            dnc: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call
                                                                                                    .dnc,
                                                                                                soundFileId: value
                                                                                                    ? value
                                                                                                    : '',
                                                                                                fileName: this.state.soundFiles.filter(
                                                                                                    (
                                                                                                        file: any,
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            file.id ===
                                                                                                            value
                                                                                                        );
                                                                                                    },
                                                                                                )[0]
                                                                                                    .fileName,
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                    SoundPathUrlDnc: value
                                                                                        ? this.state.soundFiles.filter(
                                                                                            (
                                                                                                file: any,
                                                                                            ) => {
                                                                                                return (
                                                                                                    file.id ===
                                                                                                    value
                                                                                                );
                                                                                            },
                                                                                        )[0]
                                                                                            .wavFilePath
                                                                                        : '',
                                                                                },
                                                                            );

                                                                            if (
                                                                                Platform.OS ==
                                                                                'android'
                                                                            ) {
                                                                                this.setState(
                                                                                    {
                                                                                        doNotCallSelected: true,
                                                                                    },
                                                                                );
                                                                            }
                                                                        }}
                                                                        onDonePress={() => {
                                                                            if (
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .dnc
                                                                                    .soundFileId
                                                                                    .length >
                                                                                0
                                                                            ) {
                                                                                this.setState(
                                                                                    {
                                                                                        doNotCallSelected: true,
                                                                                    },
                                                                                );
                                                                            }
                                                                        }}
                                                                        items={this.state.soundFiles.map(
                                                                            (
                                                                                file: any,
                                                                            ) => {
                                                                                return {
                                                                                    label:
                                                                                        file.fileName,
                                                                                    value:
                                                                                        file.id,
                                                                                };
                                                                            },
                                                                        )}
                                                                        placeholder={{
                                                                            label:
                                                                                'Select Audio File',
                                                                        }}
                                                                        style={
                                                                            this
                                                                                .pickerSelectStyles
                                                                        }
                                                                    />
                                                                    {Platform.OS ==
                                                                        'ios' && (
                                                                            <Ionicons
                                                                                name="md-arrow-dropdown"
                                                                                size={
                                                                                    18
                                                                                }
                                                                                color="#7b7b7b"
                                                                                style={{
                                                                                    marginLeft: 8,
                                                                                    marginTop: 8,
                                                                                }}
                                                                            />
                                                                        )}
                                                                </View>
                                                                <CmlButton
                                                                    title="Upload Audio"
                                                                    backgroundColor="#02b9db"
                                                                    style={{
                                                                        marginTop: 24,
                                                                    }}
                                                                    onPress={() => {
                                                                        this.uploadAudio();
                                                                    }}
                                                                />
                                                            </>
                                                        )}

                                                    {this.state
                                                        .doNotCallSelected && (
                                                            <>
                                                                <View
                                                                    style={{
                                                                        width:
                                                                            '100%',
                                                                        marginTop: 8,
                                                                    }}>
                                                                    <CmlText
                                                                        style={{
                                                                            width:
                                                                                '100%',
                                                                        }}>
                                                                        DNC Digit
                                                                </CmlText>

                                                                    <View
                                                                        style={[
                                                                            styles.panelUploadContainer,
                                                                            {
                                                                                marginTop: 8,
                                                                            },
                                                                        ]}>
                                                                        <RNPickerSelect
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .dnc
                                                                                    .digit
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        campaign: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign,
                                                                                            call: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call,
                                                                                                dnc: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign
                                                                                                        .call
                                                                                                        .dnc,
                                                                                                    digit: value,
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                );
                                                                            }}
                                                                            items={this.DIGITS.map(
                                                                                (
                                                                                    digit: any,
                                                                                ) => {
                                                                                    return {
                                                                                        label: digit,
                                                                                        value: digit,
                                                                                    };
                                                                                },
                                                                            )}
                                                                            placeholder={{
                                                                                label:
                                                                                    'Select DNC Digit',
                                                                            }}
                                                                            style={
                                                                                this
                                                                                    .pickerSelectStyles
                                                                            }
                                                                        />
                                                                        {Platform.OS ==
                                                                            'ios' && (
                                                                                <Ionicons
                                                                                    name="md-arrow-dropdown"
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                    color="#7b7b7b"
                                                                                    style={{
                                                                                        marginLeft: 8,
                                                                                        marginTop: 8,
                                                                                    }}
                                                                                />
                                                                            )}
                                                                    </View>
                                                                </View>

                                                                <CmlButton
                                                                    title="Remove Audio"
                                                                    backgroundColor="#ffa67a"
                                                                    style={{
                                                                        marginTop: 40,
                                                                    }}
                                                                    onPress={() => {
                                                                        this.setState(
                                                                            {
                                                                                doNotCallSelected: false,
                                                                                campaign: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign,
                                                                                    call: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call,
                                                                                        dnc: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .dnc,
                                                                                            soundFileId:
                                                                                                '',
                                                                                            defaultAudio: false,
                                                                                        },
                                                                                    },
                                                                                },
                                                                                SoundPathUrlDnc:
                                                                                    '',
                                                                            },
                                                                        );
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                </View>
                                            </View>
                                        )}

                                        <TouchableOpacity
                                            style={styles.continueButton}
                                            onPress={() => this.continue()}>
                                            <View
                                                style={
                                                    styles.continueButtonContainer
                                                }>
                                                <CmlText
                                                    style={
                                                        styles.continueButtonText
                                                    }>
                                                    CONTINUE
                                                </CmlText>
                                                <MaterialIcons
                                                    name="navigate-next"
                                                    size={30}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </KeyboardAvoidingScrollView>
                                </View>
                            )}
                            {this.state.step == 4 && (
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        Select Contact List
                                    </CmlText>

                                    {((
                                        !this.state.isDNC &&
                                        !this.state.isTransfer) ||
                                        this.state.step > 3) &&
                                        Utils.validatePhoneNumber(
                                            this.state.campaign.call.callerId,
                                        ) &&
                                        ((this.state.campaign.call.voicemail
                                            .isRingless &&
                                            this.state.campaign.call.voicemail
                                                .soundFileId) ||
                                            (!this.state.isDNC &&
                                                !this.state.isTransfer &&
                                                !this.state.campaign.call
                                                    .voicemail.isRingless &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId) ||
                                            (this.state.isTransfer &&
                                                Utils.validatePhoneNumber(
                                                    this.state.campaign.call
                                                        .transfer.number,
                                                ) &&
                                                !this.state.isDNC &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call
                                                    .transfer.defaultAudio ||
                                                    this.state.campaign.call
                                                        .transfer
                                                        .soundFileId)) ||
                                            (this.state.isDNC &&
                                                !this.state.isTransfer &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call.dnc
                                                    .defaultAudio ||
                                                    this.state.campaign.call.dnc
                                                        .soundFileId)) ||
                                            (Utils.validatePhoneNumber(
                                                this.state.campaign.call
                                                    .transfer.number,
                                            ) &&
                                                this.state.isDNC &&
                                                this.state.isTransfer &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call
                                                    .transfer.defaultAudio ||
                                                    this.state.campaign.call
                                                        .transfer
                                                        .soundFileId) &&
                                                (this.state.campaign.call.dnc
                                                    .defaultAudio ||
                                                    this.state.campaign.call.dnc
                                                        .soundFileId))) && (
                                            <View
                                                style={{
                                                    height: 32,
                                                    alignItems: 'flex-end',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                    width: '100%',
                                                    marginTop: 8,
                                                }}>
                                                <CmlButton
                                                    title="Send A Test Call"
                                                    backgroundColor="#ffa67a"
                                                    style={{ marginTop: 16 }}
                                                    onPress={() => {
                                                        this.setState({
                                                            sendTestCall: true,
                                                            testCallNumber: '',
                                                        });
                                                    }}
                                                />
                                            </View>
                                        )}
                                    <ScrollView style={styles.panelContainer}>
                                        <View style={styles.panel}>
                                            <View style={styles.panelBody}>
                                                <View
                                                    style={[
                                                        styles.panelUploadContainer,
                                                        { marginTop: 8 },
                                                    ]}>
                                                    <RNPickerSelect
                                                        value={
                                                            this.state.campaign
                                                                .contactlistId
                                                        }
                                                        onValueChange={(
                                                            value,
                                                        ) => {
                                                            this.setState({
                                                                campaign: {
                                                                    ...this
                                                                        .state
                                                                        .campaign,
                                                                    contactlistId: value,
                                                                },
                                                            });
                                                        }}
                                                        items={this.state.contactList.map(
                                                            (file: any) => {
                                                                return {
                                                                    label:
                                                                        file.name,
                                                                    value:
                                                                        file.id,
                                                                };
                                                            },
                                                        )}
                                                        placeholder={{
                                                            label:
                                                                'Select Contact List',
                                                        }}
                                                        style={
                                                            this
                                                                .pickerSelectStyles
                                                        }
                                                    />
                                                    {Platform.OS == 'ios' && (
                                                        <Ionicons
                                                            name="md-arrow-dropdown"
                                                            size={18}
                                                            color="#c1c1c1"
                                                            style={{
                                                                marginLeft: 8,
                                                                marginTop: 8,
                                                            }}
                                                        />
                                                    )}
                                                </View>

                                                <CmlButton
                                                    title="Upload Contact List"
                                                    backgroundColor="#02b9db"
                                                    style={{
                                                        marginTop: 16,
                                                        width: 180,
                                                    }}
                                                    onPress={() => {
                                                        this.uploadList();
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.continueButton}
                                            onPress={() => this.continue()}>
                                            <View
                                                style={
                                                    styles.continueButtonContainer
                                                }>
                                                <CmlText
                                                    style={
                                                        styles.continueButtonText
                                                    }>
                                                    CONTINUE
                                                </CmlText>
                                                <MaterialIcons
                                                    name="navigate-next"
                                                    size={30}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </ScrollView>
                                </View>
                            )}
                            {this.state.step == 5 && (
                                <View style={styles.stepViewContainer}>
                                    <TouchableWithoutFeedback>
                                        <View style={{ width: '100%' }}>
                                            <CmlText
                                                style={styles.stepDescription}>
                                                Campaign Settings
                                            </CmlText>

                                            {((
                                                !this.state.isDNC &&
                                                !this.state.isTransfer) ||
                                                this.state.step > 3) &&
                                                Utils.validatePhoneNumber(
                                                    this.state.campaign.call.callerId,
                                                ) &&
                                                ((this.state.campaign.call.voicemail
                                                    .isRingless &&
                                                    this.state.campaign.call.voicemail
                                                        .soundFileId) ||
                                                    (!this.state.isDNC &&
                                                        !this.state.isTransfer &&
                                                        !this.state.campaign.call
                                                            .voicemail.isRingless &&
                                                        this.state.campaign.call
                                                            .voicemail.soundFileId &&
                                                        this.state.campaign.call
                                                            .liveanswer.soundFileId) ||
                                                    (this.state.isTransfer &&
                                                        Utils.validatePhoneNumber(
                                                            this.state.campaign.call
                                                                .transfer.number,
                                                        ) &&
                                                        !this.state.isDNC &&
                                                        this.state.campaign.call
                                                            .liveanswer.soundFileId &&
                                                        this.state.campaign.call
                                                            .voicemail.soundFileId &&
                                                        (this.state.campaign.call
                                                            .transfer.defaultAudio ||
                                                            this.state.campaign.call
                                                                .transfer
                                                                .soundFileId)) ||
                                                    (this.state.isDNC &&
                                                        !this.state.isTransfer &&
                                                        this.state.campaign.call
                                                            .liveanswer.soundFileId &&
                                                        this.state.campaign.call
                                                            .voicemail.soundFileId &&
                                                        (this.state.campaign.call.dnc
                                                            .defaultAudio ||
                                                            this.state.campaign.call.dnc
                                                                .soundFileId)) ||
                                                    (Utils.validatePhoneNumber(
                                                        this.state.campaign.call
                                                            .transfer.number,
                                                    ) &&
                                                        this.state.isDNC &&
                                                        this.state.isTransfer &&
                                                        this.state.campaign.call
                                                            .liveanswer.soundFileId &&
                                                        this.state.campaign.call
                                                            .voicemail.soundFileId &&
                                                        (this.state.campaign.call
                                                            .transfer.defaultAudio ||
                                                            this.state.campaign.call
                                                                .transfer
                                                                .soundFileId) &&
                                                        (this.state.campaign.call.dnc
                                                            .defaultAudio ||
                                                            this.state.campaign.call.dnc
                                                                .soundFileId))) && (
                                                    <View
                                                        style={{
                                                            height: 32,
                                                            alignItems: 'flex-end',
                                                            flexDirection: 'row',
                                                            justifyContent: 'flex-end',
                                                            width: '100%',
                                                            marginTop: 8,
                                                        }}>
                                                        <CmlButton
                                                            title="Send A Test Call"
                                                            backgroundColor="#ffa67a"
                                                            style={{ marginTop: 16 }}
                                                            onPress={() => {
                                                                this.setState({
                                                                    sendTestCall: true,
                                                                    testCallNumber: '',
                                                                });
                                                            }}
                                                        />
                                                    </View>
                                                )}
                                            <ScrollView
                                                style={styles.panelContainer}>
                                                <View style={styles.panel}>
                                                    <View
                                                        style={
                                                            styles.panelBody
                                                        }>
                                                        <CmlText
                                                            style={{
                                                                width: '100%',
                                                            }}>
                                                            Maximum Calls Per
                                                            Minute
                                                        </CmlText>
                                                        <View
                                                            style={[
                                                                styles.panelUploadContainer,
                                                                { marginTop: 8 },
                                                            ]}>
                                                            <CmlTextInput
                                                                style={
                                                                    styles.panelUploadLabel
                                                                }
                                                                placeholder="Calls Per Minute"
                                                                keyboardType="numeric"
                                                                value={this.state.campaign.call.settings.cpm.toString()}
                                                                onChangeText={(
                                                                    value: string,
                                                                ) => {
                                                                    if (
                                                                        Number(
                                                                            value,
                                                                        ) == NaN
                                                                    ) {
                                                                        this.setState(
                                                                            {
                                                                                campaign: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign,
                                                                                    call: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call,
                                                                                        settings: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .settings,
                                                                                            cpm: 1,
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        );
                                                                    } else {
                                                                        this.setState(
                                                                            {
                                                                                campaign: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign,
                                                                                    call: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call,
                                                                                        settings: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .settings,
                                                                                            cpm: Number(
                                                                                                value,
                                                                                            ),
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        );
                                                                    }
                                                                }}></CmlTextInput>
                                                        </View>
                                                        {(this.state.campaign
                                                            .call.settings.cpm <
                                                            1 ||
                                                            this.state.campaign
                                                                .call.settings
                                                                .cpm > 50) && (
                                                                <CmlText
                                                                    style={{
                                                                        width:
                                                                            '100%',
                                                                        fontSize: 12,
                                                                        color:
                                                                            'red',
                                                                        marginTop: 8,
                                                                    }}>
                                                                    Please enter a
                                                                    value between 1
                                                                    and 50
                                                                </CmlText>
                                                            )}

                                                        <CmlText
                                                            style={{
                                                                width: '100%',
                                                                marginTop: 24,
                                                            }}>
                                                            Callback Options
                                                        </CmlText>
                                                        <CmlText
                                                            style={{
                                                                width: '100%',
                                                                fontSize: 12,
                                                                color:
                                                                    '#6a6a6a',
                                                            }}>
                                                            Which Contacts would
                                                            you like to retry?
                                                        </CmlText>
                                                        <View
                                                            style={[
                                                                styles.panelSwitchContainer,
                                                                { marginTop: 16 },
                                                            ]}>
                                                            <Switch
                                                                onValueChange={(
                                                                    value,
                                                                ) =>
                                                                    this.setState(
                                                                        {
                                                                            campaign: {
                                                                                ...this
                                                                                    .state
                                                                                    .campaign,
                                                                                call: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign
                                                                                        .call,
                                                                                    settings: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call
                                                                                            .settings,
                                                                                        callbackOptions: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .settings
                                                                                                .callbackOptions,
                                                                                            vm: value,
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                                value={
                                                                    this.state
                                                                        .campaign
                                                                        .call
                                                                        .settings
                                                                        .callbackOptions
                                                                        .vm
                                                                }
                                                                trackColor={{
                                                                    true:
                                                                        '#02b8da',
                                                                    false:
                                                                        'grey',
                                                                }}
                                                            />
                                                            <CmlText
                                                                style={
                                                                    styles.panelOptionText
                                                                }>
                                                                Voicemail
                                                            </CmlText>
                                                        </View>
                                                        <View
                                                            style={[
                                                                styles.panelSwitchContainer,
                                                                { marginTop: 8 },
                                                            ]}>
                                                            <Switch
                                                                onValueChange={(
                                                                    value,
                                                                ) =>
                                                                    this.setState(
                                                                        {
                                                                            campaign: {
                                                                                ...this
                                                                                    .state
                                                                                    .campaign,
                                                                                call: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign
                                                                                        .call,
                                                                                    settings: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call
                                                                                            .settings,
                                                                                        callbackOptions: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .settings
                                                                                                .callbackOptions,
                                                                                            busy: value,
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                                value={
                                                                    this.state
                                                                        .campaign
                                                                        .call
                                                                        .settings
                                                                        .callbackOptions
                                                                        .busy
                                                                }
                                                                trackColor={{
                                                                    true:
                                                                        '#02b8da',
                                                                    false:
                                                                        'grey',
                                                                }}
                                                            />
                                                            <CmlText
                                                                style={
                                                                    styles.panelOptionText
                                                                }>
                                                                Busy
                                                            </CmlText>
                                                        </View>
                                                        <View
                                                            style={[
                                                                styles.panelSwitchContainer,
                                                                { marginTop: 8 },
                                                            ]}>
                                                            <Switch
                                                                onValueChange={(
                                                                    value,
                                                                ) =>
                                                                    this.setState(
                                                                        {
                                                                            campaign: {
                                                                                ...this
                                                                                    .state
                                                                                    .campaign,
                                                                                call: {
                                                                                    ...this
                                                                                        .state
                                                                                        .campaign
                                                                                        .call,
                                                                                    settings: {
                                                                                        ...this
                                                                                            .state
                                                                                            .campaign
                                                                                            .call
                                                                                            .settings,
                                                                                        callbackOptions: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign
                                                                                                .call
                                                                                                .settings
                                                                                                .callbackOptions,
                                                                                            na: value,
                                                                                        },
                                                                                    },
                                                                                },
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                                value={
                                                                    this.state
                                                                        .campaign
                                                                        .call
                                                                        .settings
                                                                        .callbackOptions
                                                                        .na
                                                                }
                                                                trackColor={{
                                                                    true:
                                                                        '#02b8da',
                                                                    false:
                                                                        'grey',
                                                                }}
                                                            />
                                                            <CmlText
                                                                style={
                                                                    styles.panelOptionText
                                                                }>
                                                                No answer
                                                            </CmlText>
                                                        </View>

                                                        {(this.state.campaign
                                                            .call.settings
                                                            .callbackOptions
                                                            .busy ||
                                                            this.state.campaign
                                                                .call.settings
                                                                .callbackOptions
                                                                .vm ||
                                                            this.state.campaign
                                                                .call.settings
                                                                .callbackOptions
                                                                .na) && (
                                                                <>
                                                                    <CmlText
                                                                        style={{
                                                                            width:
                                                                                '100%',
                                                                            marginTop: 16,
                                                                        }}>
                                                                        Number of
                                                                        Attempts
                                                                        (1-5)
                                                                </CmlText>

                                                                    <View
                                                                        style={[
                                                                            styles.panelUploadContainer,
                                                                            {
                                                                                marginTop: 8,
                                                                            },
                                                                        ]}>
                                                                        <RNPickerSelect
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .settings
                                                                                    .callbackOptions
                                                                                    .attempts
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        campaign: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign,
                                                                                            call: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call,
                                                                                                settings: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign
                                                                                                        .call
                                                                                                        .settings,
                                                                                                    callbackOptions: {
                                                                                                        ...this
                                                                                                            .state
                                                                                                            .campaign
                                                                                                            .call
                                                                                                            .settings
                                                                                                            .callbackOptions,
                                                                                                        attempts: value,
                                                                                                    },
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                );
                                                                            }}
                                                                            items={[
                                                                                1,
                                                                                2,
                                                                                3,
                                                                                4,
                                                                                5,
                                                                            ].map(
                                                                                (
                                                                                    digit: any,
                                                                                ) => {
                                                                                    return {
                                                                                        label:
                                                                                            digit +
                                                                                            '',
                                                                                        value: digit,
                                                                                    };
                                                                                },
                                                                            )}
                                                                            placeholder={{}}
                                                                            style={
                                                                                this
                                                                                    .pickerSelectStyles
                                                                            }
                                                                        />
                                                                        {Platform.OS ==
                                                                            'ios' && (
                                                                                <Ionicons
                                                                                    name="md-arrow-dropdown"
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                    color="#7b7b7b"
                                                                                    style={{
                                                                                        marginLeft: 8,
                                                                                        marginTop: 12,
                                                                                    }}
                                                                                />
                                                                            )}
                                                                    </View>
                                                                    <CmlText
                                                                        style={{
                                                                            width:
                                                                                '100%',
                                                                            marginTop: 16,
                                                                        }}>
                                                                        Minutes
                                                                        between
                                                                        Attempts
                                                                </CmlText>

                                                                    <View
                                                                        style={[
                                                                            styles.panelUploadContainer,
                                                                            {
                                                                                marginTop: 8,
                                                                            },
                                                                        ]}>
                                                                        <RNPickerSelect
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .campaign
                                                                                    .call
                                                                                    .settings
                                                                                    .callbackOptions
                                                                                    .attemptTime
                                                                            }
                                                                            onValueChange={(
                                                                                value,
                                                                            ) => {
                                                                                this.setState(
                                                                                    {
                                                                                        campaign: {
                                                                                            ...this
                                                                                                .state
                                                                                                .campaign,
                                                                                            call: {
                                                                                                ...this
                                                                                                    .state
                                                                                                    .campaign
                                                                                                    .call,
                                                                                                settings: {
                                                                                                    ...this
                                                                                                        .state
                                                                                                        .campaign
                                                                                                        .call
                                                                                                        .settings,
                                                                                                    callbackOptions: {
                                                                                                        ...this
                                                                                                            .state
                                                                                                            .campaign
                                                                                                            .call
                                                                                                            .settings
                                                                                                            .callbackOptions,
                                                                                                        attemptTime: value,
                                                                                                    },
                                                                                                },
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                );
                                                                            }}
                                                                            items={[
                                                                                15,
                                                                                30,
                                                                                45,
                                                                                60,
                                                                                75,
                                                                                90,
                                                                                105,
                                                                                120,
                                                                            ].map(
                                                                                (
                                                                                    digit: any,
                                                                                ) => {
                                                                                    return {
                                                                                        label:
                                                                                            digit +
                                                                                            '',
                                                                                        value: digit,
                                                                                    };
                                                                                },
                                                                            )}
                                                                            placeholder={{}}
                                                                            style={
                                                                                this
                                                                                    .pickerSelectStyles
                                                                            }
                                                                        />
                                                                        {Platform.OS ==
                                                                            'ios' && (
                                                                                <Ionicons
                                                                                    name="md-arrow-dropdown"
                                                                                    size={
                                                                                        18
                                                                                    }
                                                                                    color="#7b7b7b"
                                                                                    style={{
                                                                                        marginLeft: 8,
                                                                                        marginTop: 12,
                                                                                    }}
                                                                                />
                                                                            )}
                                                                    </View>
                                                                </>
                                                            )}
                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    style={
                                                        styles.continueButton
                                                    }
                                                    onPress={() =>
                                                        this.continue()
                                                    }>
                                                    <View
                                                        style={
                                                            styles.continueButtonContainer
                                                        }>
                                                        <CmlText
                                                            style={
                                                                styles.continueButtonText
                                                            }>
                                                            CONTINUE
                                                        </CmlText>
                                                        <MaterialIcons
                                                            name="navigate-next"
                                                            size={30}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            </ScrollView>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )}
                            {this.state.step == 6 && (
                                <View style={styles.stepViewContainer}>
                                    <CmlText style={styles.stepDescription}>
                                        When would you like to schedule your
                                        campaign to start?
                                    </CmlText>

                                    {((
                                        !this.state.isDNC &&
                                        !this.state.isTransfer) ||
                                        this.state.step > 3) &&
                                        Utils.validatePhoneNumber(
                                            this.state.campaign.call.callerId,
                                        ) &&
                                        ((this.state.campaign.call.voicemail
                                            .isRingless &&
                                            this.state.campaign.call.voicemail
                                                .soundFileId) ||
                                            (!this.state.isDNC &&
                                                !this.state.isTransfer &&
                                                !this.state.campaign.call
                                                    .voicemail.isRingless &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId) ||
                                            (this.state.isTransfer &&
                                                Utils.validatePhoneNumber(
                                                    this.state.campaign.call
                                                        .transfer.number,
                                                ) &&
                                                !this.state.isDNC &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call
                                                    .transfer.defaultAudio ||
                                                    this.state.campaign.call
                                                        .transfer
                                                        .soundFileId)) ||
                                            (this.state.isDNC &&
                                                !this.state.isTransfer &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call.dnc
                                                    .defaultAudio ||
                                                    this.state.campaign.call.dnc
                                                        .soundFileId)) ||
                                            (Utils.validatePhoneNumber(
                                                this.state.campaign.call
                                                    .transfer.number,
                                            ) &&
                                                this.state.isDNC &&
                                                this.state.isTransfer &&
                                                this.state.campaign.call
                                                    .liveanswer.soundFileId &&
                                                this.state.campaign.call
                                                    .voicemail.soundFileId &&
                                                (this.state.campaign.call
                                                    .transfer.defaultAudio ||
                                                    this.state.campaign.call
                                                        .transfer
                                                        .soundFileId) &&
                                                (this.state.campaign.call.dnc
                                                    .defaultAudio ||
                                                    this.state.campaign.call.dnc
                                                        .soundFileId))) && (
                                            <View
                                                style={{
                                                    height: 32,
                                                    alignItems: 'flex-end',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-end',
                                                    width: '100%',
                                                    marginTop: 8,
                                                }}>
                                                <CmlButton
                                                    title="Send A Test Call"
                                                    backgroundColor="#ffa67a"
                                                    style={{ marginTop: 16 }}
                                                    onPress={() => {
                                                        this.setState({
                                                            sendTestCall: true,
                                                            testCallNumber: '',
                                                        });
                                                    }}
                                                />
                                            </View>
                                        )}

                                    <ScrollView style={styles.panelContainer}>
                                        <View
                                            style={[
                                                styles.panel,
                                                {
                                                    width: '70%',
                                                    alignSelf: 'center',
                                                },
                                            ]}>
                                            <View
                                                style={[
                                                    styles.panelBody,
                                                    { padding: 8 },
                                                ]}>
                                                <Feather
                                                    name="play-circle"
                                                    size={70}
                                                    color="#7b7b7b"
                                                    style={{
                                                        marginLeft: 8,
                                                    }}
                                                />
                                                <CmlButton
                                                    title="Start Now"
                                                    backgroundColor="#02b9db"
                                                    style={{ marginTop: 8 }}
                                                    onPress={() => {
                                                        this.onStart();
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.panel,
                                                {
                                                    width: '70%',
                                                    alignSelf: 'center',
                                                    marginTop: 16,
                                                },
                                            ]}>
                                            <View
                                                style={[
                                                    styles.panelBody,
                                                    { padding: 8 },
                                                ]}>
                                                <MaterialIcons
                                                    name="access-time"
                                                    size={70}
                                                    color="#7b7b7b"
                                                    style={{
                                                        marginLeft: 8,
                                                    }}
                                                />
                                                <CmlButton
                                                    title="In The Future"
                                                    backgroundColor="#ffa67a"
                                                    style={{ marginTop: 8 }}
                                                    onPress={() => {
                                                        this.setState({
                                                            startFuture: true,
                                                            scheduleType: 2,
                                                        });
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={{ width: 30 }}>
                        <View
                            style={{
                                alignItems: 'center',
                                paddingTop: 100,
                            }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ step: 0 })}>
                                <View
                                    style={
                                        this.state.step == 0
                                            ? styles.selectedStepContainer
                                            : styles.stepContainer
                                    }>
                                    <CmlText
                                        style={[
                                            styles.stepLabel,
                                            {
                                                color:
                                                    this.state.step == 0
                                                        ? 'black'
                                                        : 'white',
                                            },
                                        ]}>
                                        1
                                    </CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image
                                source={require('../assets/images/create_campaign_seperator.png')}
                                style={{
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.finishStep >= 1)
                                        this.setState({ step: 1 });
                                }}>
                                <View
                                    style={
                                        this.state.step == 1
                                            ? styles.selectedStepContainer
                                            : styles.stepContainer
                                    }>
                                    <CmlText
                                        style={[
                                            styles.stepLabel,
                                            {
                                                color:
                                                    this.state.step == 1
                                                        ? 'black'
                                                        : 'white',
                                            },
                                        ]}>
                                        2
                                    </CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image
                                source={require('../assets/images/create_campaign_seperator.png')}
                                style={{
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.finishStep >= 2)
                                        this.setState({ step: 2 });
                                }}>
                                <View
                                    style={
                                        this.state.step == 2
                                            ? styles.selectedStepContainer
                                            : styles.stepContainer
                                    }>
                                    <CmlText
                                        style={[
                                            styles.stepLabel,
                                            {
                                                color:
                                                    this.state.step == 2
                                                        ? 'black'
                                                        : 'white',
                                            },
                                        ]}>
                                        3
                                    </CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image
                                source={require('../assets/images/create_campaign_seperator.png')}
                                style={{
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.finishStep >= 3)
                                        this.setState({ step: 3 });
                                }}>
                                <View
                                    style={
                                        this.state.step == 3
                                            ? styles.selectedStepContainer
                                            : styles.stepContainer
                                    }>
                                    <CmlText
                                        style={[
                                            styles.stepLabel,
                                            {
                                                color:
                                                    this.state.step == 3
                                                        ? 'black'
                                                        : 'white',
                                            },
                                        ]}>
                                        4
                                    </CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image
                                source={require('../assets/images/create_campaign_seperator.png')}
                                style={{
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.finishStep >= 4)
                                        this.setState({ step: 4 });
                                }}>
                                <View
                                    style={
                                        this.state.step == 4
                                            ? styles.selectedStepContainer
                                            : styles.stepContainer
                                    }>
                                    <CmlText
                                        style={[
                                            styles.stepLabel,
                                            {
                                                color:
                                                    this.state.step == 4
                                                        ? 'black'
                                                        : 'white',
                                            },
                                        ]}>
                                        5
                                    </CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image
                                source={require('../assets/images/create_campaign_seperator.png')}
                                style={{
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.finishStep >= 5)
                                        this.setState({ step: 5 });
                                }}>
                                <View
                                    style={
                                        this.state.step == 5
                                            ? styles.selectedStepContainer
                                            : styles.stepContainer
                                    }>
                                    <CmlText
                                        style={[
                                            styles.stepLabel,
                                            {
                                                color:
                                                    this.state.step == 5
                                                        ? 'black'
                                                        : 'white',
                                            },
                                        ]}>
                                        6
                                    </CmlText>
                                </View>
                            </TouchableOpacity>

                            <Image
                                source={require('../assets/images/create_campaign_seperator.png')}
                                style={{
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (this.state.finishStep >= 6)
                                        this.setState({ step: 6 });
                                }}>
                                <View
                                    style={
                                        this.state.step == 6
                                            ? styles.selectedStepContainer
                                            : styles.stepContainer
                                    }>
                                    <CmlText
                                        style={[
                                            styles.stepLabel,
                                            {
                                                color:
                                                    this.state.step == 6
                                                        ? 'black'
                                                        : 'white',
                                            },
                                        ]}>
                                        7
                                    </CmlText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Modal
                    isVisible={this.state.startNow}
                    backdropOpacity={0}
                    onBackdropPress={() => this.setState({ startNow: false })}>
                    <View style={AppStyle.dialogContainer}>
                        <View>
                            <CmlText style={styles.dialogTitle}>
                                Start Now
                            </CmlText>
                            <View style={styles.dialogSwitchContainer}>
                                <Switch
                                    ios_backgroundColor="#9e9e9e"
                                    value={
                                        this.state.campaign.call.schedule
                                            .resumeNextDay
                                    }
                                    onValueChange={(value: boolean) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    schedule: {
                                                        ...this.state.campaign
                                                            .call.schedule,
                                                        resumeNextDay: value,
                                                    },
                                                },
                                            },
                                            isScheduleForMultipleDays: false,
                                        });
                                    }}
                                    trackColor={{
                                        true: '#02b8da',
                                        false: 'grey',
                                    }}
                                />
                                <View
                                    style={{
                                        flex: 1,
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.panelOptionText,
                                            { color: 'white' },
                                        ]}>
                                        Resume campaign the following day if
                                        campaign isn't completed by 10 pm
                                    </CmlText>
                                    <View style={styles.borderBottom}>
                                        <CmlText
                                            style={[
                                                styles.panelOptionText,
                                                {
                                                    color: 'white',
                                                    fontSize: 10,
                                                    marginTop: 8,
                                                },
                                            ]}>
                                            (Trusted Messaging will stop all
                                            campaigns if not complete)
                                        </CmlText>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.panelSwitchContainer,
                                    { marginTop: 16 },
                                ]}>
                                <Switch
                                    ios_backgroundColor="#9e9e9e"
                                    value={this.state.isScheduleForMultipleDays}
                                    onValueChange={(value: boolean) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    schedule: {
                                                        ...this.state.campaign
                                                            .call.schedule,
                                                        resumeNextDay: !value,
                                                    },
                                                },
                                            },
                                            isScheduleForMultipleDays: value,
                                        });
                                    }}
                                    trackColor={{
                                        true: '#02b8da',
                                        false: 'grey',
                                    }}
                                />
                                <CmlText
                                    style={[
                                        styles.panelOptionText,
                                        { color: 'white' },
                                    ]}>
                                    Schedule for multiple days
                                </CmlText>
                            </View>
                            {this.state.isScheduleForMultipleDays && (
                                <View
                                    style={[
                                        styles.dialogTimeContainer,
                                        { marginTop: 8 },
                                    ]}>
                                    <PickerCheckBox
                                        data={items}
                                        headerComponent={
                                            <Text style={{ fontSize: 16 }}>
                                                Select the days for your
                                                campaign to run.
                                            </Text>
                                        }
                                        OnConfirm={(pItems: any) => {
                                            let WEEKDAYS = {
                                                Sunday: false,
                                                Monday: false,
                                                Tuesday: false,
                                                Wednesday: false,
                                                Thursday: false,
                                                Friday: false,
                                                Saturday: false,
                                            };
                                            pItems.forEach((item: any) => {
                                                if (
                                                    item.itemDescription ==
                                                    'Sunday'
                                                ) {
                                                    WEEKDAYS.Sunday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Monday'
                                                ) {
                                                    WEEKDAYS.Monday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Tuesday'
                                                ) {
                                                    WEEKDAYS.Tuesday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Wednesday'
                                                ) {
                                                    WEEKDAYS.Wednesday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Thursday'
                                                ) {
                                                    WEEKDAYS.Thursday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Friday'
                                                ) {
                                                    WEEKDAYS.Friday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Saturday'
                                                ) {
                                                    WEEKDAYS.Saturday = true;
                                                }
                                            });

                                            this.setState({ WEEKDAYS: WEEKDAYS });
                                        }}
                                        ConfirmButtonTitle="OK"
                                        DescriptionField="itemDescription"
                                        KeyField="itemKey"
                                        placeholder="Please select days"
                                        arrowColor="#FFD740"
                                        arrowSize={10}
                                        placeholderSelectedItems="$count selected item(s)"
                                    />
                                </View>
                            )}

                            <CmlText style={styles.dialogSmallTitle}>
                                Campaign Time Restrictions
                            </CmlText>
                            <CmlText style={styles.dialogDescription}>
                                Contacts will not be dialed outside these hours
                            </CmlText>

                            <View style={styles.dialogTimeContainer}>
                                <CmlText style={styles.dialogTimePlaceholder}>
                                    Start Time
                                </CmlText>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            startRestrictionTimepicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            { fontSize: 14 },
                                        ]}>
                                        {Utils.convertTo12(
                                            this.state.campaign.call.settings
                                                .restrictions.startTime,
                                        )}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={
                                        this.state.startRestrictionTimepicker
                                    }
                                    mode="time"
                                    date={
                                        new Date(
                                            '2019-01-01T' +
                                            this.state.campaign.call
                                                .settings.restrictions
                                                .startTime,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    settings: {
                                                        ...this.state.campaign
                                                            .call.settings,
                                                        restrictions: {
                                                            ...this.state
                                                                .campaign.call
                                                                .settings
                                                                .restrictions,
                                                            startTime:
                                                                (value.getHours() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                value.getHours() +
                                                                ':' +
                                                                ((value.getMinutes() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                    value.getMinutes()),
                                                        },
                                                    },
                                                },
                                            },
                                            startRestrictionTimepicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            startRestrictionTimepicker: false,
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
                                            endRestrictionTimepicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            { fontSize: 14 },
                                        ]}>
                                        {Utils.convertTo12(
                                            this.state.campaign.call.settings
                                                .restrictions.EndTime,
                                        )}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={
                                        this.state.endRestrictionTimepicker
                                    }
                                    mode="time"
                                    date={
                                        new Date(
                                            '2019-01-01T' +
                                            this.state.campaign.call
                                                .settings.restrictions
                                                .EndTime,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    settings: {
                                                        ...this.state.campaign
                                                            .call.settings,
                                                        restrictions: {
                                                            ...this.state
                                                                .campaign.call
                                                                .settings
                                                                .restrictions,
                                                            EndTime:
                                                                (value.getHours() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                value.getHours() +
                                                                ':' +
                                                                ((value.getMinutes() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                    value.getMinutes()),
                                                        },
                                                    },
                                                },
                                            },
                                            endRestrictionTimepicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            endRestrictionTimepicker: false,
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
                                    value={
                                        this.state.campaign.call.settings
                                            .restrictions.timeZone
                                    }
                                    onValueChange={(value) =>
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    settings: {
                                                        ...this.state.campaign
                                                            .call.settings,
                                                        restrictions: {
                                                            ...this.state
                                                                .campaign.call
                                                                .settings
                                                                .restrictions,
                                                            timeZone: value,
                                                        },
                                                    },
                                                },
                                            },
                                        })
                                    }
                                    items={this.timezones}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.continueButton]}
                                onPress={() => this.start()}>
                                <View
                                    style={[
                                        styles.continueButtonContainer,
                                        { borderColor: 'white', width: 140 },
                                    ]}>
                                    <CmlText
                                        style={[
                                            styles.continueButtonText,
                                            {
                                                color: 'white',
                                                marginLeft: 8,
                                            },
                                        ]}>
                                        COMPLETE
                                    </CmlText>
                                    <MaterialIcons
                                        name="navigate-next"
                                        size={30}
                                        color="#ffa67a"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.startFuture}
                    backdropOpacity={0}
                    onBackdropPress={() => this.setState({ startFuture: false })}>
                    <View style={AppStyle.dialogContainer}>
                        <View>
                            <CmlText style={styles.dialogTitle}>
                                Start In The Future
                            </CmlText>

                            <View style={styles.dialogTimeContainer}>
                                <CmlText style={styles.dialogTimePlaceholder}>
                                    Start Date
                                </CmlText>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            scheduleStartDatePicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            { fontSize: 14 },
                                        ]}>
                                        {moment(
                                            this.state.campaign.call.schedule
                                                .startDateUI,
                                        ).format('MM/DD/yyyy ')}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={
                                        this.state.scheduleStartDatePicker
                                    }
                                    mode="date"
                                    minimumDate={new Date()}
                                    date={
                                        new Date(
                                            this.state.campaign.call.schedule.startDateUI,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    schedule: {
                                                        ...this.state.campaign
                                                            .call.schedule,
                                                        startDateUI: moment(
                                                            value,
                                                        ).format('YYYY-MM-DD'),
                                                    },
                                                },
                                            },
                                            scheduleStartDatePicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            scheduleStartDatePicker: false,
                                        })
                                    }
                                />
                            </View>
                            <View style={styles.dialogTimeContainer}>
                                <CmlText style={styles.dialogTimePlaceholder}>
                                    Start Time
                                </CmlText>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            scheduleStartTimePicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            { fontSize: 14 },
                                        ]}>
                                        {Utils.convertTo12(
                                            this.state.campaign.call.schedule
                                                .startTime,
                                        )}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={
                                        this.state.scheduleStartTimePicker
                                    }
                                    mode="time"
                                    date={
                                        new Date(
                                            '2019-01-01T' +
                                            this.state.campaign.call
                                                .schedule.startTime,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    schedule: {
                                                        ...this.state.campaign
                                                            .call.schedule,
                                                        startTime:
                                                            (value.getHours() <
                                                                10
                                                                ? '0'
                                                                : '') +
                                                            value.getHours() +
                                                            ':' +
                                                            ((value.getMinutes() <
                                                                10
                                                                ? '0'
                                                                : '') +
                                                                value.getMinutes()),
                                                    },
                                                },
                                            },
                                            scheduleStartTimePicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            scheduleStartTimePicker: false,
                                        })
                                    }
                                />
                            </View>
                            <View style={styles.dialogSwitchContainer}>
                                <Switch
                                    ios_backgroundColor="#9e9e9e"
                                    value={
                                        this.state.campaign.call.schedule
                                            .resumeNextDay
                                    }
                                    onValueChange={(value: boolean) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    schedule: {
                                                        ...this.state.campaign
                                                            .call.schedule,
                                                        resumeNextDay: value,
                                                    },
                                                },
                                            },
                                            isScheduleForMultipleDays: false,
                                        });
                                    }}
                                    trackColor={{
                                        true: '#02b8da',
                                        false: 'grey',
                                    }}
                                />
                                <View
                                    style={{
                                        flex: 1,
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.panelOptionText,
                                            { color: 'white' },
                                        ]}>
                                        Resume campaign the following day if
                                        campaign isn't completed by 10 pm
                                    </CmlText>
                                    <View style={styles.borderBottom}>
                                        <CmlText
                                            style={[
                                                styles.panelOptionText,
                                                {
                                                    color: 'white',
                                                    fontSize: 10,
                                                    marginTop: 8,
                                                },
                                            ]}>
                                            (Trusted Messaging will stop all
                                            campaigns if not complete)
                                        </CmlText>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.panelSwitchContainer,
                                    { marginTop: 16 },
                                ]}>
                                <Switch
                                    ios_backgroundColor="#9e9e9e"
                                    value={this.state.isScheduleForMultipleDays}
                                    onValueChange={(value: boolean) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    schedule: {
                                                        ...this.state.campaign
                                                            .call.schedule,
                                                        resumeNextDay: !value,
                                                    },
                                                },
                                            },
                                            isScheduleForMultipleDays: value,
                                        });
                                    }}
                                    trackColor={{
                                        true: '#02b8da',
                                        false: 'grey',
                                    }}
                                />
                                <CmlText
                                    style={[
                                        styles.panelOptionText,
                                        { color: 'white' },
                                    ]}>
                                    Schedule for multiple days
                                </CmlText>
                            </View>
                            {this.state.isScheduleForMultipleDays && (
                                <View
                                    style={[
                                        styles.dialogTimeContainer,
                                        { marginTop: 8 },
                                    ]}>
                                    <PickerCheckBox
                                        data={items}
                                        headerComponent={
                                            <Text style={{ fontSize: 16 }}>
                                                Select the days for your
                                                campaign to run.
                                            </Text>
                                        }
                                        OnConfirm={(pItems: any) => {
                                            let WEEKDAYS = {
                                                Sunday: false,
                                                Monday: false,
                                                Tuesday: false,
                                                Wednesday: false,
                                                Thursday: false,
                                                Friday: false,
                                                Saturday: false,
                                            };
                                            pItems.forEach((item: any) => {
                                                if (
                                                    item.itemDescription ==
                                                    'Sunday'
                                                ) {
                                                    WEEKDAYS.Sunday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Monday'
                                                ) {
                                                    WEEKDAYS.Monday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Tuesday'
                                                ) {
                                                    WEEKDAYS.Tuesday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Wednesday'
                                                ) {
                                                    WEEKDAYS.Wednesday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Thursday'
                                                ) {
                                                    WEEKDAYS.Thursday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Friday'
                                                ) {
                                                    WEEKDAYS.Friday = true;
                                                }
                                                if (
                                                    item.itemDescription ==
                                                    'Saturday'
                                                ) {
                                                    WEEKDAYS.Saturday = true;
                                                }
                                            });

                                            this.setState({ WEEKDAYS: WEEKDAYS });
                                        }}
                                        ConfirmButtonTitle="OK"
                                        DescriptionField="itemDescription"
                                        KeyField="itemKey"
                                        placeholder="Please select days"
                                        arrowColor="#FFD740"
                                        arrowSize={10}
                                        placeholderSelectedItems="$count selected item(s)"
                                    />
                                </View>
                            )}

                            <CmlText style={styles.dialogSmallTitle}>
                                Campaign Time Restrictions
                            </CmlText>
                            <CmlText style={styles.dialogDescription}>
                                Contacts will not be dialed outside these hours
                            </CmlText>

                            <View style={styles.dialogTimeContainer}>
                                <CmlText style={styles.dialogTimePlaceholder}>
                                    Start Time
                                </CmlText>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            startRestrictionTimepicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            { fontSize: 14 },
                                        ]}>
                                        {Utils.convertTo12(
                                            this.state.campaign.call.settings
                                                .restrictions.startTime,
                                        )}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={
                                        this.state.startRestrictionTimepicker
                                    }
                                    mode="time"
                                    date={
                                        new Date(
                                            '2019-01-01T' +
                                            this.state.campaign.call
                                                .settings.restrictions
                                                .startTime,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    settings: {
                                                        ...this.state.campaign
                                                            .call.settings,
                                                        restrictions: {
                                                            ...this.state
                                                                .campaign.call
                                                                .settings
                                                                .restrictions,
                                                            startTime:
                                                                (value.getHours() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                value.getHours() +
                                                                ':' +
                                                                ((value.getMinutes() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                    value.getMinutes()),
                                                        },
                                                    },
                                                },
                                            },
                                            startRestrictionTimepicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            startRestrictionTimepicker: false,
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
                                            endRestrictionTimepicker: true,
                                        });
                                    }}>
                                    <CmlText
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            { fontSize: 14 },
                                        ]}>
                                        {Utils.convertTo12(
                                            this.state.campaign.call.settings
                                                .restrictions.EndTime,
                                        )}
                                    </CmlText>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={
                                        this.state.endRestrictionTimepicker
                                    }
                                    mode="time"
                                    date={
                                        new Date(
                                            '2019-01-01T' +
                                            this.state.campaign.call
                                                .settings.restrictions
                                                .EndTime,
                                        )
                                    }
                                    onConfirm={(value: any) => {
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    settings: {
                                                        ...this.state.campaign
                                                            .call.settings,
                                                        restrictions: {
                                                            ...this.state
                                                                .campaign.call
                                                                .settings
                                                                .restrictions,
                                                            EndTime:
                                                                (value.getHours() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                value.getHours() +
                                                                ':' +
                                                                ((value.getMinutes() <
                                                                    10
                                                                    ? '0'
                                                                    : '') +
                                                                    value.getMinutes()),
                                                        },
                                                    },
                                                },
                                            },
                                            endRestrictionTimepicker: false,
                                        });
                                    }}
                                    onCancel={() =>
                                        this.setState({
                                            endRestrictionTimepicker: false,
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
                                    value={
                                        this.state.campaign.call.settings
                                            .restrictions.timeZone
                                    }
                                    onValueChange={(value) =>
                                        this.setState({
                                            campaign: {
                                                ...this.state.campaign,
                                                call: {
                                                    ...this.state.campaign.call,
                                                    settings: {
                                                        ...this.state.campaign
                                                            .call.settings,
                                                        restrictions: {
                                                            ...this.state
                                                                .campaign.call
                                                                .settings
                                                                .restrictions,
                                                            timeZone: value,
                                                        },
                                                    },
                                                },
                                            },
                                        })
                                    }
                                    items={this.timezones}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.continueButton]}
                                onPress={() => this.start()}>
                                <View
                                    style={[
                                        styles.continueButtonContainer,
                                        { borderColor: 'white', width: 140 },
                                    ]}>
                                    <CmlText
                                        style={[
                                            styles.continueButtonText,
                                            {
                                                color: 'white',
                                                marginLeft: 8,
                                            },
                                        ]}>
                                        COMPLETE
                                    </CmlText>
                                    <MaterialIcons
                                        name="navigate-next"
                                        size={30}
                                        color="#ffa67a"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.uploadList}
                    backdropOpacity={0}
                    onBackdropPress={() => this.setState({ uploadList: false })}>
                    <View style={AppStyle.dialogContainer}>
                        <CmlText style={AppStyle.dialogSmallTitle}>
                            Upload New List
                        </CmlText>

                        <View
                            style={[
                                AppStyle.panelSwitchContainer,
                                { marginTop: 16 },
                            ]}>
                            <Switch
                                ios_backgroundColor="#9e9e9e"
                                onValueChange={(value) =>
                                    this.setState({ containHeader: value })
                                }
                                value={this.state.containHeader}
                                trackColor={{
                                    true: '#02b8da',
                                    false: 'grey',
                                }}
                            />
                            <CmlText
                                style={[
                                    AppStyle.panelOptionText,
                                    { color: 'white' },
                                ]}>
                                Does your file contain headers?
                            </CmlText>
                        </View>

                        <CmlText style={AppStyle.dialogDescription}>
                            Select Phone Number Column
                        </CmlText>
                        <View
                            style={[
                                AppStyle.dialogTimeContainer,
                                {
                                    padding: 0,
                                },
                            ]}>
                            <RNPickerSelect
                                style={pickerSelectStyles}
                                value={this.state.headerColumn}
                                onValueChange={(value) =>
                                    this.setState({
                                        headerColumn: value,
                                    })
                                }
                                items={[
                                    { label: 'A', value: 'A' },
                                    { label: 'B', value: 'B' },
                                    { label: 'C', value: 'C' },
                                    { label: 'D', value: 'D' },
                                    { label: 'E', value: 'E' },
                                    { label: 'F', value: 'F' },
                                    { label: 'G', value: 'G' },
                                    { label: 'H', value: 'H' },
                                    { label: 'I', value: 'I' },
                                    { label: 'J', value: 'J' },
                                    { label: 'K', value: 'K' },
                                    { label: 'L', value: 'L' },
                                    { label: 'M', value: 'M' },
                                    { label: 'N', value: 'N' },
                                    { label: 'O', value: 'O' },
                                    { label: 'P', value: 'P' },
                                    { label: 'Q', value: 'Q' },
                                    { label: 'R', value: 'R' },
                                    { label: 'S', value: 'S' },
                                    { label: 'T', value: 'T' },
                                    { label: 'U', value: 'U' },
                                    { label: 'V', value: 'V' },
                                    { label: 'W', value: 'W' },
                                    { label: 'X', value: 'X' },
                                    { label: 'Y', value: 'Y' },
                                    { label: 'Z', value: 'Z' },
                                ]}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 16,
                            }}>
                            <CmlButton
                                title="Cancel"
                                backgroundColor="#ffa67a"
                                onPress={() =>
                                    this.setState({
                                        uploadList: false,
                                        headerColumn: 'A',
                                        containHeader: false,
                                        currentItem: null,
                                    })
                                }
                                style={{
                                    width: 100,
                                    marginTop: 16,
                                }}
                            />
                            <View style={{ flex: 1 }} />
                            <CmlButton
                                title="Upload"
                                backgroundColor="#02b9db"
                                style={{
                                    width: 100,
                                    marginTop: 16,
                                    marginLeft: 16,
                                }}
                                onPress={() => this.upload()}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.sendTestCall}
                    backdropOpacity={0}
                    onBackdropPress={() =>
                        this.setState({ sendTestCall: false })
                    }>
                    <View style={AppStyle.dialogContainer}>
                        <View>
                            <CmlText
                                style={[
                                    AppStyle.dialogTitle,
                                    {
                                        textAlign: 'center',
                                        fontSize: 16,
                                    },
                                ]}>
                                Please enter the number you would like to
                                receive the test call
                            </CmlText>

                            <View style={AppStyle.dialogTimeContainer}>
                                <CmlTextInput
                                    value={this.state.testCallNumber}
                                    onChangeText={(value: string) =>
                                        this.setState({
                                            testCallNumber: Utils.correctPhoneNumber(
                                                value,
                                            ),
                                        })
                                    }
                                    keyboardType="phone-pad"
                                    maxLength={11}
                                    style={[
                                        AppStyle.dialogTimePlaceholder,
                                        {
                                            flex: 1,
                                            fontSize: 14,
                                        },
                                    ]}></CmlTextInput>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: 32,
                                    justifyContent: 'flex-end',
                                }}>
                                <CmlButton
                                    title="Send Test Call"
                                    backgroundColor="#ffa67a"
                                    style={{ marginTop: 16 }}
                                    onPress={() => this.sendTestCall()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
};

export default compose(connect(mapStateToProps))(CampaignCreate);
