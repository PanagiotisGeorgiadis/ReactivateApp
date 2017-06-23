import React from "react";
import {View, Text, StyleSheet, StatusBar} from 'react-native';

export default class Header extends React.Component {

	componentWillMount() {

	}

	render() {

		return(
			<View style = { styles.header }>
				<StatusBar style = { styles.statusBar } barStyle = "light-content" />
				<Text style = { styles.title }>
					{ "#" + this.props.titleText }
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		height: 80,
		backgroundColor: "lightseagreen",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: 10
	},
	title: {
		color: "white",
		fontWeight: "bold",
		fontSize: 24
	}
});
