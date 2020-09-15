import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/header';
import {CmlText} from '../components/text';
import {CmlTextInput} from '../components/textinput';
import {WebView} from 'react-native-webview';
import {stripeCheckoutRedirectHTML} from '../components/stripe/stripeCheckout';
import {SUCCESSURL} from '../components/stripe/stripeSettings';
import Utils from '../utils';

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
});

class StripeScreen extends Component<{
    navigation: any;
}> {
    componentDidMount() {}

    onBack = () => {
        this.props.navigation.pop();
    };

    onLoadStart = (syntheticEvent) => {
        const {nativeEvent} = syntheticEvent;
        if (
            nativeEvent.url ===
            'https://portalstg.callmylist.com/revamp/home?payment=success'
        ) {
            this.onBack();
            Utils.presentToast('Successfully added fund.');
            return;
        }
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <Header back={true} onBack={this.onBack} menu={false} />
                <View style={{flex: 1}}>
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            html: stripeCheckoutRedirectHTML(
                                this.props.navigation.state.params.stripeKey,
                                this.props.navigation.state.params.sessionId,
                            ),
                        }}
                        onLoadStart={this.onLoadStart}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

export default StripeScreen;
