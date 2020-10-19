import { useTypedSelector, RootState } from "../../redux/rootReducer"


export const useSelectLoading = () => useTypedSelector((state: RootState) => state.todos.loading)
export const useSelectError = () => useTypedSelector((state: RootState) => state.todos.error)
export const useSelectSearch = (search: string) =>
	useTypedSelector((state: RootState) =>
		state.todos.todos.filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
	)
export const useSelectTodo = (route:any) => useTypedSelector((state: RootState) => state.todos.todos.find(item => item.id === route?.params?.id))