import { createReducer } from 'typesafe-actions'
import { toggleTodo, deleteTodo, addTodoAsync, editTodo } from '../actions'
//const { v4: uuidv4 } = require('uuid')
//import R from 'ramda'
export interface ITodo {
	id: number
	title: string
	completed: boolean
}

export interface ITodoState {
	loading: boolean
	error: Error | null
	todos: { [id: string]: ITodo }
}

const INITIAL_STATE: ITodoState = { todos: {}, loading: false, error: null }

export const toDoReducer = createReducer(INITIAL_STATE)
	.handleType('GET_TODOS_SUCCESS', (state: ITodoState, action: { type: string; payload: any }) => {
		const todos = action.payload.reduce(
			(acc: ITodo, item: ITodo) => ({
				...acc,
				[item.id]: item
			}),
			{}
		)
		return {
			...state,
			todos
		}
	})
	.handleAction(addTodoAsync.request, (state: ITodoState) => ({
		...state,
		loading: true
	}))
	.handleAction(addTodoAsync.success, (state: ITodoState, action: { type: string; payload: any }) => {
		const id = Date.now()
		return {
			...state,
			loading: false,

			error: null,

			todos: { ...state.todos, [id]: { ...action.payload, id } }
		}
	})
	.handleAction(addTodoAsync.failure, (state: ITodoState, action: { type: string; payload: any }) => ({
		...state,
		loading: false,
		error: action.payload.error
	}))
	.handleAction(toggleTodo, (state: ITodoState, action: { type: string; payload: any }) => {
		const { id } = action.payload
		return {
			...state,
			todos: { ...state.todos, [id]: { ...state.todos[id], completed: !state.todos[id].completed } }
		}
		//todos: state.todos.todos.id === id ? { ...state, completed: !state.todos.completed } : state
	})
	/*todos: state.todos.map(
				(todo: { id: any; completed: any }) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
			)*/
	.handleAction(deleteTodo, (state: ITodoState, action: { type: string; payload: any }) => {
		const { id } = action.payload
		let res = state.todos
		delete res[id]
		return { ...state, res }

		//todos: state.todos.filter((todo: { id: any }) => todo.id !== id)
	})
	.handleType('EDIT_TODO_SUCCESS', (state: ITodoState, action: { type: string; payload: any }) => {
		const { id, title } = action.payload
		console.log(id, title)

		return {
			...state,
			todos: { ...state.todos, [id]: { ...state.todos[id], title } }
			/*
			todos: state.todos.map((todo: ITodo): ITodo => {
				if (todo.id !== id) {
					return todo
				}

				return { ...todo, title }
			})*/
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
