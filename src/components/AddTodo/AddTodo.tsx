import React, { FunctionComponent, useState, useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { addTodo } from '../../redux/actions/index'

import AddSvg from '../../assets/add.svg'
import { styles } from './styles'
import { AppDispatch } from '../../../App'

export interface Props {
	clearSearch: any
}

const AddTodo: FunctionComponent<Props> = ({ clearSearch }) => {
	const [ inputActive, setInputActive ] = useState(false)
	const dispatch: AppDispatch = useDispatch()
	const [ text, setText ] = useState('')
	const onAdd = useCallback(
		() => {
			if (text) {
				setInputActive(false)
				dispatch(addTodo(text))
			}
			clearSearch()

			setText('')
		},
		[ dispatch, text ]
	)

	return (
		<View style={styles.container}>
			{inputActive ? (
				<TextInput
					style={styles.inputForm}
					onChangeText={setText}
					defaultValue={text}
					placeholder="Type your todo...sweetie"
					onSubmitEditing={onAdd}
				/>
			) : (
				<TouchableOpacity onPress={() => setInputActive(true)}>
					<AddSvg style={styles.addButton} />
				</TouchableOpacity>
			)}
		</View>
	)
}

export default AddTodo
