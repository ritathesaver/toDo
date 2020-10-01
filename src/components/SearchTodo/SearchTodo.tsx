import React, { FunctionComponent, memo } from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'

interface ISearchProps {
	setSearch: (value: string) => void
	search: string
}

const SearchTodo: FunctionComponent<ISearchProps> = ({ setSearch, search }) => {
	return (
		<View style={styles.container}>
			<Icon style={styles.searchIcon} name="search" size={20} color="#fff" />
			<TextInput style={styles.inputForm} onChangeText={setSearch} value={search} placeholder="Search..." />
		</View>
	)
}

export default memo(SearchTodo)
