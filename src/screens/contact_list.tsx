import React, {Component} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView, Switch} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { CmlButton } from '../components/button'

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
    buttonContainer: {
        backgroundColor: '#0cbcdc',
        width: 180,
        height: 32,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 16
    },
    buttonTitle: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        marginLeft: 4
    },
    itemContainer: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 16
    },
    itemIcon: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#f57536',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingVertical: 8,
        flexDirection: 'row'
    },
    dialogTimePlaceholder: {
        color: 'white',
        fontSize: 10,
        marginTop: 12
    },
    dialogDescription: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
        marginTop: 16
    },
    dialogSmallTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
        marginTop: 24
    },    
    panelSwitchContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        width: '100%'
    },    
    panelOptionText: {
        color: '#6a6a6a',
        fontSize: 12,
        marginLeft: 8
    },
});

class ContactList extends Component {

    state = {
        sounds: [
            {
                name: 'My list'
            },
            {
                name: 'My list'
            },
            {
                name: 'My list'
            },
            {
                name: 'My list'
            },
            {
                name: 'My list'
            },
            {
                name: 'My list'
            },
            {
                name: 'My list'
            },
            {
                name: 'My list'
            },
        ]
    }

    componentDidMount() {

        this.setState({uploadList: false});
    }
    
    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={styles.container}>

                    <CmlText style={styles.campaignLabel}>
                        Contact List
                    </CmlText>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            marginTop: 16
                        }} onPress={() => this.setState({uploadList: true})}>
                            <View style={[styles.buttonContainer, {backgroundColor:'#565757'}]}>
                                <Feather 
                                    name="upload"
                                    color="white"
                                    size={18}
                                />
                                <CmlText style={styles.buttonTitle}>Upload Contact List</CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        style={{
                            marginTop: 24
                        }}
                        data={this.state.sounds}
                        renderItem={(item: any) => {
                        return <View style={[styles.itemContainer, {
                            backgroundColor: item.index % 2 == 1? 'white': '#f6fbfd'
                        }]}>
                                <CmlText style={{
                                    width: 20
                                }}>{item.index + 1}.</CmlText>
                                
                                <CmlText style={{
                                    fontSize: 16,
                                    width: '30%'
                                }}>{item.item.name}</CmlText>
                                <View style={{
                                    backgroundColor: '#ffa67a',
                                    width: 24,
                                    height: 24,
                                    borderRadius: 12,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 50
                                }}>
                                    <CmlText style={{
                                        color: 'white'
                                    }}>
                                        4
                                    </CmlText>
                                </View>   

                                <View style={{
                                    flex: 1
                                }} /> 
                                <TouchableOpacity style={{
                                    marginRight: 8
                                }}>
                                    <View style={styles.itemIcon}>
                                        <AntDesign 
                                            name="download"
                                            size={14}
                                            color="#f57536"
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    marginRight: 8
                                }}>
                                    <View style={[styles.itemIcon, {
                                        borderColor: 'red'
                                    }]}>
                                        <AntDesign 
                                            name="delete"
                                            size={14}
                                            color="red"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>;
                        }}
                    >

                    </FlatList>

                </View>

                <Dialog
                    visible={this.state.uploadList}
                    onTouchOutside={() => {
                    this.setState({ uploadList: false });
                    }}
                    dialogStyle={styles.dialogContainer}
                    overlayOpacity={0}
                >
                    <DialogContent>
                        <View style={{paddingVertical: 0}}>
                            <View>
                                <CmlText style={styles.dialogSmallTitle}>Upload New List</CmlText>

                                <View style={[styles.panelSwitchContainer, {marginTop: 16}]}>
                                    <Switch
                                        ios_backgroundColor='#9e9e9e'
                                    />
                                    <CmlText style={[styles.panelOptionText, {color: 'white'}]}>Does your file contain headers?</CmlText>
                                </View>

                                <CmlText style={styles.dialogDescription}>Select Phone Number Column</CmlText>
                                <View style={styles.dialogTimeContainer}>
                                    <CmlText style={styles.dialogTimePlaceholder}>A</CmlText>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 16
                                }}>
                                    <CmlButton title="Upload" backgroundColor="#02b9db" style={{width: 100, marginTop: 16}}/>
                                    <View style={{flex: 1}} />
                                    <CmlButton title="Cancel" backgroundColor="#ffa67a" style={{width: 100, marginTop: 16, marginLeft: 16}}/>
                                </View>
                            </View>
                        </View>
                    </DialogContent>
                </Dialog>
            </SafeAreaView>
        );
    }
}
  
export default ContactList;