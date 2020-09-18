import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { addTodo, toggleTodo } from '../redux/actions'
import Todo from './Todo'

export interface ITodo {
	completed: boolean
	id: number
	text: string
}

export interface ITodoListProps {
	todos: ITodo[]
}

const TodoList: FunctionComponent<ITodoListProps> = ({ todos }) => {
	return (
		<View style={styles.container}>
			{todos.map((todo: ITodo) => <Todo key={todo.id} todo={todo} onClick={() => toggleTodo(todo.id)} />)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		marginTop: 15,
		alignItems: 'center'
	}
})

const mapStateToProps = (state: { todos: ITodo[] }) => {
	const { todos } = state
	return { todos }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
		{
			addTodo
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
