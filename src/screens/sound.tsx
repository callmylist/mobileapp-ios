import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
    Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {CmlButton} from '../components/button';
import {SoundService} from '../service/sound.service';
import TrackPlayer from 'react-native-track-player';
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
    borderBottom: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    dialogTimeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingVertical: 8,
        flexDirection: 'row',
    },
    dialogTimePlaceholder: {
        color: 'white',
        fontSize: 10,
        marginTop: 12,
    },
    dialogDescription: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
        marginTop: 16,
    },
    dialogSmallTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24,
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

class SoundScreen extends Component<
    {
        navigation: any;
    },
    {
        sounds: any[];
        textToSpeech: boolean;
        playSound: boolean;
        loading: boolean;
        deleteConfirm: boolean;
        currentItem: any;
        noSounds: boolean;
        gender: number;
        text: string;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            sounds: [],
            textToSpeech: false,
            playSound: false,
            loading: false,
            deleteConfirm: false,
            currentItem: null,
            noSounds: false,
            gender: 1,
            text: '',
        };
    }

    componentDidMount() {
        this.loadAudios();
    }

    loadAudios = () => {
        SoundService.getSoundList().subscribe((response: any) => {
            this.setState({
                sounds: response.data,
                noSounds: response.data.length == 0 ? true : false,
            });
        });
    };

    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    playSound = async (item: any) => {
        const url =
            store.getState().authReducer.assets.assetsPath + item.wavFilePath;

        const localFile = `${RNFS.CachesDirectoryPath}/` + item.fileName;

        this.setState({loading: true});
        const options = {
            fromUrl: url,
            toFile: localFile,
        };
        RNFS.downloadFile(options).promise.then(() => {
            this.setState({loading: false}, () => {
                setTimeout(() => {
                    FileViewer.open(localFile);
                }, 500);
            });
        });
    };

    togglePlayback = async () => {
        let playbackState = await TrackPlayer.getState();
        if (playbackState === TrackPlayer.STATE_PAUSED) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    };

    resetPlayer = async () => {
        this.setState({playSound: false});
        await TrackPlayer.reset();
    };

    uploadAudio = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.audio],
        });

        this.setState({loading: true});
        SoundService.uploadSound(res, (response: any) => {
            this.setState({loading: false});
            if (response.success == true) {
                this.loadAudios();
            } else {
                Utils.presentToast(response.message);
            }
        });
    };

    deleteSound = () => {
        let item = this.state.currentItem;
        SoundService.deleteSound(item.id).subscribe((response: any) => {
            this.setState({
                deleteConfirm: false,
            });
            this.loadAudios();
        });
    };

    download = (item: any) => {
        let dirs = RNFetchBlob.fs.dirs;
        this.setState({loading: true});
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
                this.setState({loading: false});
                RNFetchBlob.ios.previewDocument(res.data);
            });
    };

    useText = () => {
        if (this.state.text.length == 0) {
            Utils.presentToast('Please enter valid text');
            return;
        }

        if (this.state.gender == null) {
            Utils.presentToast('Please select valid gender');
            return;
        }

        this.setState({
            loading: true,
        });
        SoundService.textToSpeech({
            text: this.state.text,
            gender: this.state.gender,
        }).subscribe((response: any) => {
            this.setState({
                text: '',
                gender: 1,
                textToSpeech: false,
                loading: false,
            });
            if (response.success) {
                this.loadAudios();
            } else {
                Utils.presentToast(
                    response.message + '.' + response.submessage,
                );
            }
        });
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true} />
                <CmlSpinner visible={this.state.loading} />
                <View style={styles.container}>
                    <CmlText style={styles.campaignLabel}>My Sounds</CmlText>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            style={{
                                marginTop: 16,
                            }}
                            onPress={() => this.setState({textToSpeech: true})}>
                            <View style={styles.buttonContainer}>
                                <FontAwesome
                                    name="comment"
                                    color="white"
                                    size={20}
                                />
                                <CmlText style={styles.buttonTitle}>
                                    Text to Speech
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                marginTop: 16,
                            }}
                            onPress={() => this.uploadAudio()}>
                            <View
                                style={[
                                    styles.buttonContainer,
                                    {backgroundColor: '#565757'},
                                ]}>
                                <Feather
                                    name="upload"
                                    color="white"
                                    size={20}
                                />
                                <CmlText style={styles.buttonTitle}>
                                    Upload Audio
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <CmlText
                        style={[
                            styles.campaignLabel,
                            {
                                fontSize: 8,
                                width: '80%',
                                alignSelf: 'center',
                                marginBottom: 24,
                            },
                        ]}>
                        IT’s Simple. Add and review your audio files here. We
                        have given you 3 easy ways to add sounds. You may record
                        sound files using our recording interface. All sound
                        files will be listed below. Please call 1-317-552-0035.
                        When prompted enter Id: 92632# and Password: 9559#
                    </CmlText>
                    {this.state.noSounds && (
                        <View
                            style={{
                                padding: 16,
                            }}>
                            <CmlText
                                state={{
                                    paddingLeft: 20,
                                    marginTop: 20,
                                }}>
                                No sounds
                            </CmlText>
                        </View>
                    )}
                    <FlatList
                        data={this.state.sounds}
                        renderItem={(item: any) => {
                            return (
                                <View
                                    style={[
                                        styles.itemContainer,
                                        {
                                            backgroundColor:
                                                item.index % 2 == 1
                                                    ? 'white'
                                                    : '#f6fbfd',
                                        },
                                    ]}>
                                    <CmlText
                                        style={{
                                            width: 20,
                                        }}>
                                        {item.index + 1}.
                                    </CmlText>

                                    <CmlText
                                        style={{
                                            fontSize: 16,
                                        }}>
                                        {item.item.name}
                                    </CmlText>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            marginRight: 8,
                                        }}
                                        onPress={() =>
                                            this.playSound(item.item)
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
                                        onPress={() =>
                                            this.download(item.item)
                                        }>
                                        <View style={styles.itemIcon}>
                                            <AntDesign
                                                name="download"
                                                size={14}
                                                color="#f57536"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            marginRight: 8,
                                        }}
                                        onPress={() => {
                                            this.setState({
                                                deleteConfirm: true,
                                                currentItem: item.item,
                                            });
                                        }}>
                                        <View
                                            style={[
                                                styles.itemIcon,
                                                {
                                                    borderColor: 'red',
                                                },
                                            ]}>
                                            <AntDesign
                                                name="delete"
                                                size={14}
                                                color="red"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}></FlatList>
                </View>

                <Modal
                    isVisible={this.state.textToSpeech}
                    backdropOpacity={0}
                    onBackdropPress={() =>
                        this.setState({textToSpeech: false})
                    }>
                    <View style={AppStyle.dialogContainer}>
                        <View>
                            <CmlText style={styles.dialogSmallTitle}>
                                Please enter the text and select void gender
                                below.
                            </CmlText>
                            <View style={styles.dialogTimeContainer}>
                                <CmlTextInput
                                    style={[
                                        styles.dialogTimePlaceholder,
                                        {
                                            height: 100,
                                            textAlignVertical: 'top',
                                            fontSize: 12,
                                            width: '100%',
                                        },
                                    ]}
                                    placeholderTextColor="white"
                                    placeholder="Enter Text To Speech"
                                    multiline={true}
                                    blurOnSubmit={true}
                                    value={this.state.text}
                                    onChangeText={(value: string) =>
                                        this.setState({text: value})
                                    }
                                />
                            </View>

                            <CmlText style={styles.dialogDescription}>
                                Voice Gender
                            </CmlText>
                            <View style={styles.dialogTimeContainer}>
                                <RNPickerSelect
                                    style={pickerSelectStyles}
                                    value={this.state.gender}
                                    onValueChange={(value) =>
                                        this.setState({
                                            gender: value,
                                        })
                                    }
                                    items={[
                                        {label: 'Male Voice', value: 1},
                                        {label: 'Female Voice', value: 2},
                                    ]}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 16,
                                }}>
                                <CmlButton
                                    title="Use Text"
                                    backgroundColor="#02b9db"
                                    style={{width: 100, marginTop: 16}}
                                    onPress={() => this.useText()}
                                />
                                <View style={{flex: 1}} />
                                <CmlButton
                                    title="Cancel"
                                    backgroundColor="#ffa67a"
                                    style={{
                                        width: 100,
                                        marginTop: 16,
                                        marginLeft: 16,
                                    }}
                                    onPress={() =>
                                        this.setState({
                                            textToSpeech: false,
                                            text: '',
                                            gender: 1,
                                        })
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Dialog
                    visible={this.state.textToSpeech}
                    onTouchOutside={() => {
                        this.setState({textToSpeech: false});
                    }}
                    dialogStyle={styles.dialogContainer}
                    overlayOpacity={0}>
                    <DialogContent>
                        <View style={{paddingVertical: 0}}>
                            <View>
                                <CmlText style={styles.dialogSmallTitle}>
                                    Please enter the text and select void gender
                                    below.
                                </CmlText>
                                <View style={styles.dialogTimeContainer}>
                                    <CmlTextInput
                                        style={[
                                            styles.dialogTimePlaceholder,
                                            {
                                                height: 100,
                                                textAlignVertical: 'top',
                                            },
                                        ]}
                                        placeholderTextColor="white"
                                        placeholder="Enter Text To Speech"
                                        multiline={true}
                                    />
                                </View>

                                <CmlText style={styles.dialogDescription}>
                                    Voice Gender
                                </CmlText>
                                <View style={styles.dialogTimeContainer}>
                                    <CmlText
                                        style={styles.dialogTimePlaceholder}>
                                        Male Voice
                                    </CmlText>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 16,
                                    }}>
                                    <CmlButton
                                        title="Use Text"
                                        backgroundColor="#02b9db"
                                        style={{width: 100, marginTop: 16}}
                                    />
                                    <View style={{flex: 1}} />
                                    <CmlButton
                                        title="Cancel"
                                        backgroundColor="#ffa67a"
                                        style={{
                                            width: 100,
                                            marginTop: 16,
                                            marginLeft: 16,
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>

                <Modal
                    isVisible={this.state.playSound}
                    backdropOpacity={0}
                    onBackdropPress={() => this.resetPlayer()}>
                    <View style={AppStyle.dialogContainer}>
                        <Player onTogglePlayback={this.togglePlayback} />
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.deleteConfirm}
                    backdropOpacity={0}
                    onBackdropPress={() =>
                        this.setState({deleteConfirm: false, currentItem: null})
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
                                Confirmation
                            </CmlText>
                            <CmlText style={AppStyle.dialogDescription}>
                                Are you sure you want delete this sound file?
                            </CmlText>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: 32,
                                    justifyContent: 'flex-end',
                                }}>
                                <CmlButton
                                    title="Yes"
                                    backgroundColor="#ffa67a"
                                    style={{marginTop: 16, marginRight: 16}}
                                    onPress={() => this.deleteSound()}
                                />
                                <CmlButton
                                    title="No"
                                    backgroundColor="#02b9db"
                                    style={{marginTop: 16}}
                                    onPress={() =>
                                        this.setState({deleteConfirm: false})
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

export default SoundScreen;
