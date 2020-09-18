import React, { FunctionComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Navbar: FunctionComponent = () => {
	return (
		<View style={styles.navbar}>
			<Text style={styles.navbarLogo}>{Date.now().toLocaleString()}</Text>
		</View>
	)
}

export default Navbar

const styles = StyleSheet.create({
	navbar: {
		height: 150,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
		backgroundColor: '#f8b500'
	},
	navbarLogo: {
		color: '#f7f7f7',
		fontSize: 20
	}
})
