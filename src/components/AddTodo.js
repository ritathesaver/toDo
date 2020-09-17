import React from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import AddSvg from '../assets/add.svg'

export default function AddTodo() {
	return (
		<View style={styles.container}>
			<TextInput style={styles.inputForm} />
			<TouchableOpacity>
				<AddSvg style={styles.addButton} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		marginTop: 15,
		alignItems: 'center'
	},
	inputForm: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		color: '#000',
		backgroundColor: '#fff',
		padding: 10,
		width: '100%'
	},

	addButton: {
		marginTop: 5,
		width: 35,
		height: 35
	}
})
