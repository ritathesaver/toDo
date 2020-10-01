import { combineReducers } from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { toDoReducer, ITodo } from './toDoReducer'

export interface RootState {
	todos: ITodo[]
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default combineReducers({
	todos: toDoReducer
})
