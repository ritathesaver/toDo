import React, { FunctionComponent, useState, useCallback, useEffect } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, FlatList } from 'react-native'
import Todo from '../Todo/Todo'
import AddTodo from '../AddTodo/AddTodo'
import SearchTodo from '../SearchTodo/SearchTodo'
import { NavigationProp } from '@react-navigation/native'
import { styles } from './styles'
import { useTypedSelector, RootState } from '../../redux/rootReducer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../App'
import { getTodos } from '../../redux/actions/index'
import WarningSvg from '../../assets/warning.svg'

export interface ITodo {
	completed: boolean
	id: number
	title: string
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
	const dispatch: AppDispatch = useDispatch()
	useEffect(() => {
		dispatch(getTodos())
	}, [])

	const [ search, setSearch ] = useState('')

	const clearSearch = () => {
		setSearch('')
	}
	const todoLoading = useTypedSelector((state: RootState) => state.todos.loading)
	const todoError = useTypedSelector((state: RootState) => state.todos.error)

	const renderHeader = useCallback(() => <SearchTodo setSearch={setSearch} search={search} />, [ search ])

	const searchedTodos = useTypedSelector((state: RootState) =>
		state.todos.todos.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
	)

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			{todoError && <WarningSvg />}
			<AddTodo clearSearch={clearSearch} />
			{todoLoading && <ActivityIndicator size="large" color="#f8b500" />}
			{!todoLoading &&
			!todoError && (
				<FlatList
					data={searchedTodos.reverse()}
					keyExtractor={(todo: ITodo) => `${todo.id}`}
					ListHeaderComponent={renderHeader()}
					renderItem={({ item, index }: IItemProps) => (
						<Todo
							todo={item}
							onClick={() => {
								navigation.navigate('Details', { id: item.id })
							}}
						/>
					)}
				/>
			)}
		</KeyboardAvoidingView>
	)
}

export default TodoList
