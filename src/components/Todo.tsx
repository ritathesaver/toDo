import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native'
import { ITodo } from './TodoList'
import CheckBox from '@react-native-community/checkbox'
import { toggleTodo } from '../redux/actions'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'

export interface ITodoProps {
	todo: ITodo
	onClick: (event: GestureResponderEvent) => void
	toggleTodo: any
}

const Todo: FunctionComponent<ITodoProps> = ({ todo, onClick, toggleTodo }) => {
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<TouchableWithoutFeedback onPress={onClick}>
					<Text style={[ styles.todoText, todo.completed && styles.todoTextChecked ]}>{todo.text}</Text>
				</TouchableWithoutFeedback>
				<CheckBox
					disabled={false}
					value={todo.completed}
					onTintColor="#f8b500"
					onCheckColor="#f8b500"
					onValueChange={() => toggleTodo(todo.id)}
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
		{
			toggleTodo
		},
		dispatch
	)

export default connect(null, mapDispatchToProps)(Todo)
