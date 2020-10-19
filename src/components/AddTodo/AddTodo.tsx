import React, { FunctionComponent, useState, useCallback } from 'react'
import { TouchableOpacity, View, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../redux/actions/index'

import AddSvg from '../../assets/add.svg'
import { styles } from './styles'
import { AppDispatch } from '../../../App'

export interface Props {
	clearSearch: any
}

const AddTodo: FunctionComponent<Props> = ({ clearSearch }) => {
	const [ inputActive, setInputActive ] = useState(false)
	const [ text, setText ] = useState('')
	const dispatch: AppDispatch = useDispatch()

	const onAdd = useCallback(
		() => {
			if (text) {
				setInputActive(false)
				dispatch(addTodo(text))
			}

			setText('')
		},
		[ text ]
	)
	clearSearch()

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
