import { call, put, all, fork, takeLatest } from 'redux-saga/effects'
import {
	addTodoAsync,
	getTodos,
	deleteTodo,
	editTodo,
	addTodo,
	addTodoStarted,
	addTodoSuccess,
	addTodoFailure
} from './actions'
import axios from 'axios'

async function getData() {
	const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
	return data
}
async function postData(body) {
	const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', body)
	return data
}

async function deleteData(id) {
	await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
}

async function editData(body) {
	const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${body.id}`, { title: body.title })
	console.log(data)
	return data
}

function* workerAddTodo(action) {
	yield put(addTodoAsync.request())

	try {
		const resAdd = yield call(postData, { title: action.payload.title, completed: false })

		yield put(addTodoAsync.success(resAdd))
	} catch (err) {
		yield put(addTodoAsync.failure(err))
	}
}

function* workerGetTodo() {
	const resGet = yield call(getData)

	yield put({ type: 'GET_TODOS_SUCCESS', payload: resGet })
}

function* workerDeleteTodo(action) {
	yield call(deleteData, { id: action.payload })
	yield put({ type: 'DELETE_TODO_SUCCESS', payload: action.payload })
}

function* workerEditTodo(action) {
	console.log(action.payload.id)
	const resEdit = yield call(editData, { id: action.payload.id, title: action.payload.title })
	console.log(resEdit)

	yield put({ type: 'EDIT_TODO_SUCCESS', payload: { id: resEdit.id, title: resEdit.title } })
}

export function* watchAddTodo() {
	yield takeLatest('ADD_TODO', workerAddTodo)
}

export function* watchGetTodo() {
	yield takeLatest('GET_TODOS', workerGetTodo)
}

export function* watchDeleteTodo() {
	yield takeLatest('DELETE_TODO', workerDeleteTodo)
}
export function* watchEditTodo() {
	yield takeLatest('EDIT_TODO', workerEditTodo)
}

export function* rootSaga() {
	yield all([ watchAddTodo(), watchGetTodo(), watchDeleteTodo(), watchEditTodo() ])
}
