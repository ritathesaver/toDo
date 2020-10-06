import axios from 'axios'

export const getTodos = () => async (dispatch) => {
	const res = await axios.get('https://jsonplaceholder.typicode.com/todos')

	dispatch({
		type: 'GET_TODOS',
		payload: res.data
	})
}

export const addTodo = (title) => async (dispatch) => {
	dispatch(addTodoStarted())
	try {
		const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title: title, completed: false })
		dispatch(addTodoSuccess(res.data))
	} catch (err) {
		dispatch(addTodoFailure(err))
	}
}

const addTodoSuccess = (todo) => ({
	type: 'ADD_TODO_SUCCESS',
	payload: {
		id: todo.id,
		title: todo.title
	}
})

const addTodoStarted = () => ({
	type: 'ADD_TODO_STARTED'
})

const addTodoFailure = (error) => ({
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

export const deleteTodo = (id) => async (dispatch) => {
	await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

	dispatch({
		type: 'DELETE_TODO',
		payload: {
			id
		}
	})
}

export const editTodo = (id, title) => async (dispatch) => {
	const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { title: title })
	dispatch({
		type: 'EDIT_TODO',
		payload: {
			id: res.data.id,
			title: res.data.title
		}
	})
}
