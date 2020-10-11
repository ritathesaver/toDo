import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { toDoReducer, ITodoState } from './reducers'

export interface RootState {
	todos: ITodoState
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default combineReducers({
	todos: toDoReducer
})
