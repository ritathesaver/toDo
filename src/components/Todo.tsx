import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native'
import { ITodo } from './TodoList'
import CheckBox from '@react-native-community/checkbox'

export interface ITodoProps {
	todo: ITodo
	onClick: (event: GestureResponderEvent) => void
}

const Todo: FunctionComponent<ITodoProps> = ({ todo, onClick }) => {
	const [ toggleCheckBox, setToggleCheckBox ] = useState(false)

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<TouchableWithoutFeedback onPress={onClick}>
					<Text style={[ styles.todoText, toggleCheckBox && styles.todoTextChecked ]}>{todo.text}</Text>
				</TouchableWithoutFeedback>
				<CheckBox
					disabled={false}
					value={toggleCheckBox}
					onTintColor="#f8b500"
					onCheckColor="#f8b500"
					onValueChange={(newValue) => setToggleCheckBox(newValue)}
				/>
			</View>
			<View style={styles.line} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		margin: 20
	},
	todoText: {
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

export default Todo
