import React, { FunctionComponent, useState, useCallback } from 'react'
import { StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { addTodo, toggleTodo } from '../redux/actions'
import Todo from './Todo'
import AddTodo from './AddTodo'
import SearchTodo from './SearchTodo'
import { NavigationProp } from '@react-navigation/native'

export interface ITodo {
	completed: boolean
	id: number
	text: string
}

export interface ITodoListProps {
	todos: ITodo[]
	navigation: NavigationProp<any>
}

interface IItemProps {
	item: ITodo
	index: number
}

const TodoList: FunctionComponent<ITodoListProps> = ({ todos, navigation }) => {
	const [ search, setSearch ] = useState('')

	const renderHeader = useCallback(() => <SearchTodo setSearch={setSearch} search={search} />, [ search ])
	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<FlatList
				data={todos.filter((todo) => todo.text.includes(search))}
				keyExtractor={(todo: ITodo) => `${todo.id}`}
				ListHeaderComponent={renderHeader()}
				ListFooterComponent={AddTodo}
				renderItem={({ item, index }: IItemProps) => (
					<Todo
						todo={item}
						onClick={() => {
							navigation.navigate('Details', { todo: item })
						}}
					/>
				)}
			/>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingTop: 15,
		flex: 1,
		backgroundColor: '#393e46'
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
