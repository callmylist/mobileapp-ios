import React, {Component} from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity, SafeAreaView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
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
});

class Sound extends Component {
    
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
                        Contact List
                    </CmlText>
                </View>
            </SafeAreaView>
        );
    }
}
  
export default Sound;