import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch } from '../../../App'
import { getTodos } from '../../redux/actions'

export const useGetTodos = () => {
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(getTodos())
	}, [])
}

/*export const useDeleteTodos = (todo: ITodo| undefined, navigation:any) => {
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(deleteTodo(todo?.id));
		navigation.goBack()
	}, [])
}*/
