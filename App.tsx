import React, { FunctionComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import Navbar from './src/components/Navbar'
import { store } from './src/redux'
import TodoList from './src/components/TodoList'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TodoDetails from './src/components/TodoDetails'

const Stack = createStackNavigator()

const App: FunctionComponent = () => {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<View style={styles.container}>
					<Navbar />
					<Stack.Navigator>
						<Stack.Screen options={{ headerShown: false }} name="List" component={TodoList} />
						<Stack.Screen
							options={{
								headerTitle: '',
								headerTintColor: '#f7f7f7',
								headerStyle: { backgroundColor: '#393e46' }
							}}
							name="Details"
							component={TodoDetails}
						/>
					</Stack.Navigator>
				</View>
			</Provider>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#393e46'
	}
})

export default App
