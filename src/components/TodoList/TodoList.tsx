import React, { FunctionComponent, useState, useCallback } from 'react'
import { StyleSheet, KeyboardAvoidingView, FlatList } from 'react-native'
import Todo from '../Todo/Todo'
import AddTodo from '../AddTodo/AddTodo'
import SearchTodo from '../SearchTodo/SearchTodo'
import { NavigationProp } from '@react-navigation/native'
import { styles } from './styles'
import { useTypedSelector, RootState } from '../../redux/rootReducer'

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

const TodoList: FunctionComponent<ITodoListProps> = ({ navigation }) => {
	const [ search, setSearch ] = useState('')

	const todos = useTypedSelector((state: RootState) => state.todos)

	const clearSearch = () => {
		setSearch('')
	}

	const renderHeader = useCallback(() => <SearchTodo setSearch={setSearch} search={search} />, [ search ])

	const renderFooter = useCallback(() => <AddTodo clearSearch={clearSearch} />, [])

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<FlatList
				data={todos.filter((todo) => todo.text.toLowerCase().includes(search.toLowerCase()))}
				keyExtractor={(todo: ITodo) => `${todo.id}`}
				ListHeaderComponent={renderHeader()}
				ListFooterComponent={renderFooter()}
				renderItem={({ item, index }: IItemProps) => (
					<Todo
						todo={item}
						onClick={() => {
							navigation.navigate('Details', { id: item.id })
						}}
					/>
				)}
			/>
		</KeyboardAvoidingView>
	)
}

export default TodoList
