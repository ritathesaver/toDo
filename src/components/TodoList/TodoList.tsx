import React, { FunctionComponent, useState, useCallback, useEffect } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, FlatList } from 'react-native'
import Todo from '../Todo/Todo'
import AddTodo from '../AddTodo/AddTodo'
import SearchTodo from '../SearchTodo/SearchTodo'
import { NavigationProp } from '@react-navigation/native'
import { styles } from './styles'
import WarningSvg from '../../assets/warning.svg'
import { ITodo } from '../../redux/reducers'
import { useGetTodos } from '../hooks/useDispatchActions'
import { useSelectError, useSelectLoading, useSelectSearch } from '../hooks/useSelect'

export interface ITodoListProps {
	todos: ITodo[]
	navigation: NavigationProp<any>
}

interface IItemProps {
	item: ITodo
	index: number
}

const TodoList: FunctionComponent<ITodoListProps> = ({ navigation }) => {
	useGetTodos()
	const [ search, setSearch ] = useState('')

	const clearSearch = () => {
		setSearch('')
	}

	const renderHeader = useCallback(() => <SearchTodo setSearch={setSearch} search={search} />, [ search ])

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			{useSelectError() && <WarningSvg />}
			<AddTodo clearSearch={clearSearch} />
			{useSelectLoading() && <ActivityIndicator size="large" color="#f8b500" />}
			{!useSelectLoading() &&
			!useSelectError() && (
				<FlatList
					data={useSelectSearch(search).reverse()}
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
