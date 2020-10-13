import React, {Component} from 'react';
import {StyleSheet, Image, View, AsyncStorage} from 'react-native';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {loadAssets} from '../redux/actions/authActions';
import reducer from '../redux/reducers/authReducer';
import {store} from '../redux/store';
import RestClient from '../service/restclient';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    pattern: {
        width: '100%',
        resizeMode: 'stretch',
        height: '30%',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '70%',
        resizeMode: 'contain',
        height: 200,
    },
});

class WelcomeScreen extends Component<
    {
        assets: any;
        navigation: any;
        loadAssets: any;
    },
    {}
> {
    componentDidMount() {
        this.props.loadAssets();
        RestClient.navigator = this.props.navigation;
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        if (this.props.assets) {
            if (store.getState().authReducer.loggedInContact != null) {
                this.props.navigation.navigate('App');
            } 
            else {
                this.props.navigation.navigate('AuthNavigator');
            }
        }
    }

    render() {
        return (
            <>
                <View style={{flexDirection: 'column', flex: 1}}>
                    {/* <Image
                        source={require('../assets/images/splash_top.png')}
                        style={styles.pattern}
                    />
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/images/blast_logo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <Image
                        source={require('../assets/images/splash_bottom.png')}
                        style={styles.pattern}
                    /> */}
                </View>
            </>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        assets: state.authReducer.assets,
    };
};

export default compose(connect(mapStateToProps, {loadAssets}))(WelcomeScreen);
