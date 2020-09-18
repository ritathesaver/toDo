import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import { ITodo } from './TodoList'

export interface ITodoProps {
	todo: ITodo
	onClick: (event: GestureResponderEvent) => void
}

const Todo: FunctionComponent<ITodoProps> = ({ todo, onClick }) => {
	console.log(todo)
	return (
		<TouchableOpacity onPress={onClick}>
			<View style={styles.container}>
				<Text>{todo.text}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		margin: 10,
		alignItems: 'center'
	}
})

export default Todo
