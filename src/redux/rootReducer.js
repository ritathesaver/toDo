import { combineReducers } from 'redux'

const INITIAL_STATE = []

const toDoReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'ADD_TODO':
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
			return state.map((todo) => {
				if (todo.id !== action.id) {
					return todo
				}

				return { ...todo, text: action.text }
			})
		default:
			return state
	}
}

export default combineReducers({
	todos: toDoReducer
})
