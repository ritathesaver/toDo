import React, { FunctionComponent } from 'react'
import { View, Text, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { styles } from './styles'
import { AppDispatch } from '../../../App'
import { useDispatch } from 'react-redux'
import { toggleTodo } from '../../redux/actions/index'
import { ITodo } from '../../redux/reducers'

export interface ITodoProps {
	todo: ITodo
	onClick: (event: GestureResponderEvent) => void
}

const Todo: FunctionComponent<ITodoProps> = ({ todo, onClick }) => {
	const dispatch: AppDispatch = useDispatch()
	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<TouchableWithoutFeedback onPress={onClick}>
					<Text style={[ styles.todoText, todo.completed && styles.todoTextChecked ]}>{todo.title}</Text>
				</TouchableWithoutFeedback>
				<CheckBox
					disabled={false}
					value={todo.completed}
					onTintColor="#f8b500"
					onCheckColor="#f8b500"
					onValueChange={() => dispatch(toggleTodo(todo.id))}
				/>
			</View>
			<View style={styles.line} />
		</View>
	)
}

export default Todo
