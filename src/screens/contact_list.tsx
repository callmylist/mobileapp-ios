import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
    Switch,
    Linking
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header';
import { CmlText } from '../components/text';
import { CmlTextInput } from '../components/textinput';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { CmlButton } from '../components/button';
import { ContactService } from '../service/contact.service';
import Modal from 'react-native-modal';
import AppStyle from '../shared/styles';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import RNPickerSelect from 'react-native-picker-select';
import { CmlSpinner } from '../components/loading';
import Utils from '../utils';
import { store } from '../redux/store';
import RNFetchBlob from 'rn-fetch-blob'

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
        fontSize: 12,
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
    panelSwitchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    panelOptionText: {
        color: '#6a6a6a',
        fontSize: 12,
        marginLeft: 8,
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
        width: '100%'
    },
});

class ContactList extends Component<
    { navigation: any },
    {
        deleteConfirm: boolean;
        sounds: any[];
        uploadList: boolean;
        currentItem: any;
        containHeader: boolean;
        headerColumn: string;
        loading: boolean,
        noList: boolean
    }
    > {
    constructor(props: any) {
        super(props);

        this.state = {
            deleteConfirm: false,
            uploadList: false,
            sounds: [],
            currentItem: null,
            containHeader: false,
            headerColumn: 'A',
            loading: false,
            noList: false
        };
    }

    componentDidMount() {
        this.loadData();

        this.props.navigation.addListener('willFocus', (payload: any) => {
            this.loadData();
        });
    }

    loadData = () => {
        ContactService.getContactList({
            currentPage: 0,
            pageSize: 0,
        }).subscribe((response: any) => {
            this.setState({
                sounds: response.data,
                noList: response.data.length == 0 ? true : false
            });
        });
    };

    onMenu = () => {
        this.props.navigation.openDrawer();
    };

    deleteList = () => {
        let item = this.state.currentItem;
        ContactService.deleteContactList(item.id).subscribe((response: any) => {
            this.setState({
                deleteConfirm: false,
            });
            this.loadData();
        });
    };

    download = (item: any) => {
        let dirs = RNFetchBlob.fs.dirs
        console.log(dirs.DocumentDir)
        this.setState({ loading: true })
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path: dirs.DocumentDir + '/' + item.fileName
            })
            .fetch('GET', store.getState().authReducer.assets.assetsPath + item.fileS3Path, {
                //some headers ..
            })
            .then((res) => {
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log(res)
                Utils.presentToast("File downloaded to application folder.")
                this.setState({ loading: false })
            })
    }

    uploadList = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.csv]
        });

        this.setState({
            uploadList: true,
            currentItem: res
        });
    };

    upload = async () => {
        this.setState({
            loading: true,
            uploadList: false
        })
        ContactService.uploadContactList(this.state.currentItem, this.state.containHeader, this.state.headerColumn, (response: any) => {
            console.log(response)
            this.setState({
                loading: false
            })
            if (response.success == true) {
                this.loadData()
            }
            else {
                Utils.presentToast(response.message)
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header onMenu={this.onMenu} menu={true} />
                <CmlSpinner
                    visible={this.state.loading}
                />
                <View style={styles.container}>
                    <CmlText style={styles.campaignLabel}>Contact List</CmlText>
                    <View
                        style={{
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            style={{
                                marginTop: 16,
                            }}
                            onPress={() => this.uploadList()}>
                            <View
                                style={[styles.buttonContainer, { backgroundColor: '#565757' }]}>
                                <Feather name="upload" color="white" size={18} />
                                <CmlText style={styles.buttonTitle}>
                                    Upload Contact List
                                </CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.noList && <View style={{
                            padding: 16
                        }}>

                            <CmlText state={{
                                paddingLeft: 20,
                                marginTop: 20,
                            }}>No sounds</CmlText>
                        </View>
                    }
                    <FlatList
                        style={{
                            marginTop: 24,
                        }}
                        data={this.state.sounds}
                        renderItem={(item: any) => {
                            return (
                                <View
                                    style={[
                                        styles.itemContainer,
                                        {
                                            backgroundColor:
                                                item.index % 2 == 1 ? 'white' : '#f6fbfd',
                                        },
                                    ]}>
                                    <CmlText
                                        style={{
                                            width: 40,
                                        }}>
                                        {item.index + 1}.
                                    </CmlText>

                                    <CmlText
                                        style={{
                                            fontSize: 16,
                                            flex: 1,
                                        }}>
                                        {item.item.name}
                                    </CmlText>

                                    <View
                                        style={{
                                            backgroundColor: '#ffa67a',
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: 12,
                                        }}>
                                        <CmlText
                                            style={{
                                                color: 'white',
                                            }}>
                                            {item.item.numberCount}
                                        </CmlText>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            marginRight: 8,
                                        }} onPress={() => this.download(item.item)}>
                                        <View style={styles.itemIcon}>
                                            <AntDesign name="download" size={14} color="#f57536" />
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
                                            <AntDesign name="delete" size={14} color="red" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}></FlatList>
                </View>

                <Modal
                    isVisible={this.state.uploadList}
                    backdropOpacity={0}
                    onBackdropPress={() => this.setState({ uploadList: false })}>
                    <View style={AppStyle.dialogContainer}>
                        <CmlText style={AppStyle.dialogSmallTitle}>Upload New List</CmlText>

                        <View style={[AppStyle.panelSwitchContainer, { marginTop: 16 }]}>
                            <Switch ios_backgroundColor="#9e9e9e"
                                onValueChange={(value) => this.setState({ containHeader: value })}
                                value={this.state.containHeader} />
                            <CmlText style={[AppStyle.panelOptionText, { color: 'white' }]}>
                                Does your file contain headers?
                        </CmlText>
                        </View>

                        {
                            this.state.containHeader && <>
                                <CmlText style={AppStyle.dialogDescription}>
                                    Select Phone Number Column
                                </CmlText>
                                <View style={[AppStyle.dialogTimeContainer, {
                                    padding: 0
                                }]}><RNPickerSelect
                                        disabled={!this.state.containHeader}
                                        style={pickerSelectStyles}
                                        value={this.state.headerColumn}
                                        onValueChange={(value) => this.setState({
                                            headerColumn: value
                                        })}
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
                            </>
                        }


                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 16,
                            }}>
                            <CmlButton
                                title="Upload"
                                backgroundColor="#02b9db"
                                style={{ width: 100, marginTop: 16 }}
                                onPress={() => this.upload()}
                            />
                            <View style={{ flex: 1 }} />
                            <CmlButton
                                title="Cancel"
                                backgroundColor="#ffa67a"
                                onPress={() => this.setState({
                                    uploadList: false,
                                    headerColumn: 'A',
                                    containHeader: false,
                                    currentItem: null
                                })}
                                style={{ width: 100, marginTop: 16, marginLeft: 16 }}
                            />
                        </View>
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.deleteConfirm}
                    backdropOpacity={0}
                    onBackdropPress={() =>
                        this.setState({ deleteConfirm: false, currentItem: null })
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
                                Are you sure you want delete this contact list?
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
                                    style={{ marginTop: 16, marginRight: 16 }}
                                    onPress={() => this.deleteList()}
                                />
                                <CmlButton
                                    title="No"
                                    backgroundColor="#02b9db"
                                    style={{ marginTop: 16 }}
                                    onPress={() => this.setState({ deleteConfirm: false })}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

export default ContactList;
