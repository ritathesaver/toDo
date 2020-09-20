import React, { FunctionComponent, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Navbar: FunctionComponent = () => {
	const utc: String = new Date().toLocaleDateString('ru')
	const [ time, setTime ] = useState(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), 1000)
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<View style={styles.navbar}>
			<Text style={styles.navbarTitle}>{utc}</Text>
			<Text style={styles.navbarSubtitle}>{new Date(time).toLocaleTimeString()}</Text>
		</View>
	)
}

export default Navbar

const styles = StyleSheet.create({
	navbar: {
		height: 130,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f8b500'
	},
	navbarTitle: {
		marginTop: 20,
		color: '#f7f7f7',
		fontSize: 24
	},
	navbarSubtitle: {
		color: '#f7f7f7',
		fontSize: 18
	}
})
