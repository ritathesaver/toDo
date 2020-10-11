import axios from 'axios'

let nextTodoId = 201

export const getTodos = () => ({
	type: 'GET_TODOS'
})

export const addTodo = (title) => ({
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

export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	payload: {
		id
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
})
