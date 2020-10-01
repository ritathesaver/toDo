import React, { FunctionComponent, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'

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
