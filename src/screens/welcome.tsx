import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    pattern: {
        width: '100%',
        resizeMode: 'stretch',
        height: '30%'
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: '70%',
        resizeMode: 'contain',
        height: 200
    }
});
  
class WelcomeScreen extends Component {

    componentDidMount() {
        setTimeout(() => this.props.navigation.navigate('AuthNavigator'), 2000)
    }

    render() {
      return (
        <>
            <View style={{flexDirection: "column", flex: 1}}>
                <Image 
                    source={require("../assets/images/splash_top.png")}
                    style={styles.pattern}
                />
                <View 
                    style={styles.logoContainer}
                >
                    <Image 
                        source={require("../assets/images/blast_logo.png")}
                        style={styles.logo}
                    />
                </View>
                <Image 
                    source={require("../assets/images/splash_bottom.png")}
                    style={styles.pattern}
                />
            </View>
        </>
      );
    }
  }
  
  export default WelcomeScreen;