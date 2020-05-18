import React, {Component} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'

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
        fontSize: 16,
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
    }
});

class Sound extends Component {

    state = {
        sounds: [
            {
                name: 'My voice'
            },
            {
                name: 'My voice'
            },
            {
                name: 'My voice'
            },
            {
                name: 'My voice'
            },
            {
                name: 'My voice'
            },
            {
                name: 'My voice'
            },
            {
                name: 'My voice'
            },
            {
                name: 'My voice'
            },
        ]
    }

    componentDidMount() {
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
                        My Sounds
                    </CmlText>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{
                            marginTop: 16
                        }}>
                            <View style={styles.buttonContainer}>
                                <FontAwesome 
                                    name="comment"
                                    color="white"
                                    size={20}
                                />
                                <CmlText style={styles.buttonTitle}>Text to Speech</CmlText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: 16
                        }}>
                            <View style={[styles.buttonContainer, {backgroundColor:'#565757'}]}>
                                <Feather 
                                    name="upload"
                                    color="white"
                                    size={20}
                                />
                                <CmlText style={styles.buttonTitle}>Upload Audio</CmlText>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <CmlText style={[styles.campaignLabel, {
                        fontSize: 8,
                        width: '80%',
                        alignSelf: 'center',
                        marginBottom: 24
                    }]}>
                    IT’s Simple. Add and review your audio files here. We have given you 3 easy ways to add sounds. You may record sound files using our recording interface. All sound files will be listed below. Please call 
1-317-552-0035. When prompted enter Id: 92632# and Password: 9559# 
                    </CmlText>

                    <FlatList 
                        data={this.state.sounds}
                        renderItem={(item: any) => {
                        return <View style={[styles.itemContainer, {
                            backgroundColor: item.index % 2 == 1? 'white': '#f6fbfd'
                        }]}>
                                <CmlText style={{
                                    width: 20
                                }}>{item.index + 1}.</CmlText>
                                
                                <CmlText style={{
                                    fontSize: 16
                                }}>{item.item.name}</CmlText>
                                <View style={{
                                    flex: 1
                                }} />
                                <TouchableOpacity style={{
                                    marginRight: 8
                                }}>
                                    <AntDesign 
                                        name="playcircleo"
                                        size={24}
                                    />
                                </TouchableOpacity>
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
            </SafeAreaView>
        );
    }
}
  
export default Sound;