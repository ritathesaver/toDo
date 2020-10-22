import { useTypedSelector, RootState } from '../../redux/rootReducer'
import { ITodo } from '../../redux/reducers'

export const useSelectSearch = (search: string): ITodo[] =>
	useTypedSelector(
		(state: RootState) =>
			Object.keys(state.todos.todos)
				.filter((id: string) => state.todos.todos[id].title.toLowerCase().includes(search.toLowerCase()))
				.map((id: string) => state.todos.todos[id])
		//	state.todos.todos.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
	)
