import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Navbar from './src/components/Navbar'
import AddTodo from './src/components/AddTodo'

export default function App() {
	return (
		<View style={styles.container}>
			<Navbar />
			<AddTodo />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#393e46'
	}
})
