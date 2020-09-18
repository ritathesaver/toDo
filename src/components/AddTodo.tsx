import React, { FunctionComponent, useState, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput, GestureResponderEvent } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import AddSvg from '../assets/add.svg'
import { addTodo } from '../redux/actions'

export interface Props {
	addTodo: any
}

const AddTodo: FunctionComponent<Props> = ({ addTodo }) => {
	const [ text, setText ] = useState('')
	const onAdd = useCallback(
		() => {
			addTodo(text)
			setText('')
		},
		[ text ]
	)
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.inputForm}
				onChangeText={setText}
				defaultValue={text}
				placeholder="Type your todo...sweety"
			/>
			<TouchableOpacity onPress={onAdd}>
				<AddSvg style={styles.addButton} />
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	inputForm: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		color: '#000',
		backgroundColor: '#fff',
		padding: 15,
		width: '100%'
	},

	addButton: {
		marginTop: 10,
		width: 40,
		height: 40
	}
})

const mapStateToProps = (state: { todos: String }) => {
	const { todos } = state
	return { todos }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
	bindActionCreators(
		{
			addTodo
		},
		dispatch
	)

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
