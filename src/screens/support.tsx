import React, {Component} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView} from 'react-native';
import Header from '../components/header'
import { CmlText } from '../components/text'
import { CmlTextInput } from '../components/textinput'
import { ScrollView } from 'react-native-gesture-handler';

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
    inputContainer: {
        borderBottomColor:'black',
        borderBottomWidth: 1,
        flexDirection:'row',
        paddingLeft: 8,
        paddingRight: 8,
        margin: 16,
    },    
    input: {
        height: 36,
        fontSize: 16,
        flex: 1
    },
});

class Support extends Component {
    
    componentDidMount() {
    }
    
    onMenu = () => {
        this.props.navigation.openDrawer()
    }

    onTab = (index: number) => {
        this.setState({
            index: index
        })
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header onMenu={this.onMenu} menu={true}/>
                <View style={styles.container}>

                    <CmlText style={styles.campaignLabel}>
                        Support
                    </CmlText>
                    <ScrollView>
                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="First name"
                            />
                        </View>  

                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Last name"
                            />
                        </View>  

                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Email address"
                            />
                        </View>  

                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Phone no"
                            />
                        </View>  

                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={styles.input}
                                placeholder="Company name"
                            />
                        </View>  

                        <View style={styles.inputContainer}>
                            <CmlTextInput
                                style={[styles.input, {
                                    height: 100,
                                    textAlignVertical: "top"
                                }]}
                                placeholder="Notes"
                                multiline={true}
                            />
                        </View>
                    </ScrollView>     
                </View>
            </SafeAreaView>
        );
    }
}
  
export default Support;