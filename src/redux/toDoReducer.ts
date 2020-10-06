export interface ITodo {
	id: number
	title: string
	completed: boolean
}

export interface ITodoState {
	todos: ITodo[]
	loading: boolean
	error: null
}

const INITIAL_STATE: ITodoState = { loading: false, error: null, todos: [] }

export const toDoReducer = (state = INITIAL_STATE, action: { type: string; payload: any }): ITodoState => {
	switch (action.type) {
		case 'GET_TODOS':
			return {
				...state,
				todos: action.payload
			}
		case 'ADD_TODO': {
			const { id, title } = action.payload
			return {
				...state,
				loading: false,
				error: null,
				todos: [
					...state.todos,
					{
						id: id,
						title: title,
						completed: false
					}
				]
			}
		}
		case 'ADD_TODO_STARTED':
			return {
				...state,
				loading: true
			}

		case 'ADD_TODO_SUCCESS':
			return {
				...state,
				loading: false,
				error: null,
				todos: [ ...state.todos, action.payload ]
			}
		case 'ADD_TODO_FAILURE':
			return {
				...state,
				loading: false,
				error: action.payload.error
			}
		case 'TOGGLE_TODO': {
			const { id } = action.payload
			return {
				...state,
				todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
			}
		}
		case 'DELETE_TODO': {
			const { id } = action.payload

			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== id)
			}
		}
		case 'EDIT_TODO': {
			const { id, title } = action.payload

			return {
				...state,
				todos: state.todos.map((todo: ITodo): ITodo => {
					if (todo.id !== id) {
						return todo
					}

					return { ...todo, title }
				})
			}
		}
		default:
			return state
	}
}
