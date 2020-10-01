export interface ITodo {
	completed: boolean
	id: number
	text: string
}

const INITIAL_STATE: ITodo[] = []

export const toDoReducer = (state = INITIAL_STATE, action: { type: string; id: number; text: string }): ITodo[] => {
	switch (action.type) {
		case 'ADD_TODO':
			console.log(action.id)
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]
		case 'TOGGLE_TODO':
			return state.map((todo) => (todo.id === action.id ? { ...todo, completed: !todo.completed } : todo))
		case 'DELETE_TODO':
			return state.filter((todo) => todo.id !== action.id)
		case 'EDIT_TODO':
			return state.map((todo: ITodo): ITodo => {
				if (todo.id !== action.id) {
					return todo
				}

				return { ...todo, text: action.text }
			})
		default:
			return state
	}
}
