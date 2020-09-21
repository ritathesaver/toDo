let nextTodoId = 0
export const addTodo = (text) => ({
	type: 'ADD_TODO',
	id: nextTodoId++,
	text
})

export const toggleTodo = (id) => ({
	type: 'TOGGLE_TODO',
	id
})

export const deleteTodo = (id) => {
	return {
		type: 'DELETE_TODO',
		id: id
	}
}
export const editTodo = (id, text) => {
	return {
		type: 'EDIT_TODO',
		id: id,
		text: text
	}
}
