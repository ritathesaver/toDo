import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import Navbar from './src/components/Navbar'
import AddTodo from './src/components/AddTodo'
import { store } from './src/redux'
import TodoList from './src/components/TodoList'

const App: FunctionComponent = () => {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<Navbar />
				<TodoList />
				<AddTodo />
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#393e46'
	}
})

export default App
