import { useDispatch } from 'react-redux'
import { useEffect, useCallback } from 'react'
import { AppDispatch } from '../../../App'
import { getTodos } from '../../redux/actions'
import { useTypedSelector, RootState } from '../../redux/rootReducer'

export const useFetchTodos = () => {
	const dispatch: AppDispatch = useDispatch()

	const fetchTodos = useCallback(
		() => {
			dispatch(getTodos())
		},
		[dispatch]
	);

	const loading = useTypedSelector((state: RootState) => state.todos.loading)
	const error = useTypedSelector((state: RootState) => state.todos.error)

	return [fetchTodos, loading, error] as const
}

/*export const useDeleteTodos = (todo: ITodo| undefined, navigation:any) => {
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(deleteTodo(todo?.id));
		navigation.goBack()
	}, [])
}*/
