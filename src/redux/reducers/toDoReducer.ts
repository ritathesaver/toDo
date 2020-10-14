import { createReducer } from 'typesafe-actions'
import { toggleTodo, deleteTodo, addTodoAsync, editTodo } from '../actions'
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

export const toDoReducer = createReducer(INITIAL_STATE)
	.handleType('GET_TODOS_SUCCESS', (state: ITodoState, action: { type: string; payload: any }) => ({
		...state,
		todos: action.payload
	}))
	.handleAction(addTodoAsync.request, (state: ITodoState) => ({
		...state,
		loading: true
	}))
	.handleAction(addTodoAsync.success, (state: ITodoState, action: { type: string; payload: any }) => ({
		...state,
		loading: false,
		error: null,
		todos: [ ...state.todos, action.payload ]
	}))
	.handleAction(addTodoAsync.failure, (state: ITodoState, action: { type: string; payload: any }) => ({
		...state,
		loading: false,
		error: action.payload.error
	}))
	.handleAction(toggleTodo, (state: ITodoState, action: { type: string; payload: any }) => {
		const { id } = action.payload
		return {
			...state,
			todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
		}
	})
	.handleAction(deleteTodo, (state: ITodoState, action: { type: string; payload: any }) => {
		const { id } = action.payload

		return {
			...state,
			todos: state.todos.filter((todo) => todo.id !== id)
		}
	})
	.handleType('EDIT_TODO_SUCCESS', (state: ITodoState, action: { type: string; payload: any }) => {
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
	})

/*export const toDoReducer = (state = INITIAL_STATE, action: { type: string; payload: any }): ITodoState => {
	switch (action.type) {
		case 'GET_TODOS_SUCCESS':
			return {
				...state,
				todos: action.payload
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
		case 'DELETE_TODO_SUCCESS': {
			const { id } = action.payload

			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== id)
			}
		}
		case 'EDIT_TODO_SUCCESS': {
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
*/
