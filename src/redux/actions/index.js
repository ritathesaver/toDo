import axios from 'axios'

export const getTodos = (data) => async (dispatch) => {
	dispatch({
		type: 'GET_TODOS',
		payload: data.map(({ title, userId, ...item }) => ({ ...item, text: title }))
	})
}

export const addTodo = (text) => async (dispatch) => {
	const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title: text, completed: false })

	dispatch({
		type: 'ADD_TODO',
		payload: {
			id: res.data.id,
			text: res.data.title
		}
	})
}

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

export const editTodo = (id, text) => async (dispatch) => {
	const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, { title: text })
	dispatch({
		type: 'EDIT_TODO',
		payload: {
			id: res.data.id,
			text: res.data.title
		}
	})
}
