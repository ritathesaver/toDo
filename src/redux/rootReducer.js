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
		default:
			return state
	}
}

export default combineReducers({
	todos: toDoReducer
})
