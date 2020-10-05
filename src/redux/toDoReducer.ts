export interface ITodo {
	completed: boolean
	id: number
	text: string
}

const INITIAL_STATE: ITodo[] = []

export const toDoReducer = (state = INITIAL_STATE, action: { type: string; payload: any }): ITodo[] => {
	switch (action.type) {
		case 'GET_TODOS':
			return [ ...action.payload ]
		case 'ADD_TODO': {
			const { id, text } = action.payload
			return [
				...state,
				{
					id,
					text,
					completed: false
				}
			]
		}
		case 'TOGGLE_TODO': {
			const { id } = action.payload
			return state.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
		}
		case 'DELETE_TODO': {
			const { id } = action.payload

			return state.filter((todo) => todo.id !== id)
		}
		case 'EDIT_TODO': {
			const { id, text } = action.payload
			return state.map((todo: ITodo): ITodo => {
				if (todo.id !== id) {
					return todo
				}

				return { ...todo, text }
			})
		}
		default:
			return state
	}
}
