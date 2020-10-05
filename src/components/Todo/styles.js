import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		margin: 20
	},
	todoText: {
		width: '90%',
		color: '#f7f7f7',
		fontSize: 20
	},
	line: {
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		marginTop: 20,
		width: '100%'
	},
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	todoTextChecked: {
		textDecorationLine: 'line-through'
	}
})
