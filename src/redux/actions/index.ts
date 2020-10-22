import { createAsyncAction, createCustomAction } from 'typesafe-actions'
import { ITodo, ITodoState } from '../reducers'
const { v4: uuidv4 } = require('uuid')
import 'react-native-get-random-values'
//let nextTodoId = 200

export const toggleTodo = createCustomAction('TOGGLE_TODO', (id: number) => ({ payload: { id } }))

export const getTodos = createCustomAction('GET_TODOS')

export const addTodo = createCustomAction('ADD_TODO', (title: string) => ({
	payload: { title }
}))

export const deleteTodo = createCustomAction('DELETE_TODO', (id: number | undefined) => ({ payload: { id } }))

export const editTodo = createCustomAction('EDIT_TODO', (id: number, title: string) => ({ payload: { id, title } }))

export const addTodoAsync = createAsyncAction('ADD_TODO_STARTED', 'ADD_TODO_SUCCESS', 'ADD_TODO_FAILURE')<
	null,
	ITodo,
	Error
>()
/*
export const addTodoSuccess = (todo: ITodo) => ({
	type: 'ADD_TODO_SUCCESS',
	payload: {
		id: todo.id,
		title: todo.title
	}
})

export const addTodoStarted = () => ({
	type: 'ADD_TODO_STARTED'
})

export const addTodoFailure = (error: Error) => ({
	type: 'ADD_TODO_FAILURE',
	payload: {
		error
	}
})



/*export const addTodos = (title: string) => ({
	type: 'ADD_TODO',
	payload: {
		id: nextTodoId++,
		title
	}
})


export const addTodoSuccess = (todo) => ({
	type: 'ADD_TODO_SUCCESS',
	payload: {
		id: todo.id,
		title: todo.title
	}
})

export const addTodoStarted = () => ({
	type: 'ADD_TODO_STARTED'
})

export const addTodoFailure = (error) => ({
	type: 'ADD_TODO_FAILURE',
	payload: {
		error
	}
})

export const deleteTodo = (id) => ({
	type: 'DELETE_TODO',
	payload: {
		id
	}
})

export const editTodo = (id, title) => ({
	type: 'EDIT_TODO',
	payload: {
		id,
		title
	}
})*/
