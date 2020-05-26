import React, { Component } from 'react';
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadAssets } from '../redux/actions/appActions'
import reducer from '../redux/reducers/appReducer'
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

class WelcomeScreen extends Component<{
	assets: any,
	navigation: any,
	loadAssets: any
}, {}> {

	componentDidMount() {

		this.props.loadAssets()
	}

	componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
		if (this.props.assets) {
			this.props.navigation.navigate('AuthNavigator')
		}
	}

	render() {
		return (
			<>
				<View style={{ flexDirection: "column", flex: 1 }}>
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

const mapStateToProps = (state: any) => {
	return {
		assets: state.appReducer.assets
	};
}

export default compose(connect(mapStateToProps, { loadAssets }))(WelcomeScreen);