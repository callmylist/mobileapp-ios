import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import FeatherIcon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 56,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 8,
        borderBottomColor: '#e3e5e6',
        borderBottomWidth: 1,
    },
    logo: {
        width: '50%',
        resizeMode: 'contain',
        height: 35,
    },
});

class Header extends Component<{
    back?: boolean;
    onBack?: any;
    menu?: boolean;
    onMenu?: any;
}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={{width: 30}}>
                    <TouchableOpacity onPress={this.props.onBack}>
                        {this.props.back && (
                            <FeatherIcon
                                name="arrow-left"
                                color="#535353"
                                size={28}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <Image
                    source={require('../assets/images/blast_hor_logo.png')}
                    style={styles.logo}
                />
                <View style={{width: 30}}>
                    <TouchableOpacity onPress={this.props.onMenu}>
                        {this.props.menu && (
                            <FeatherIcon
                                name="menu"
                                color="#535353"
                                size={28}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Header;
