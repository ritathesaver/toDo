import React, { FunctionComponent, useState, useCallback, memo } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

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

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputForm: {
		flex: 1,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: '#ccc',
		color: '#000',
		backgroundColor: '#fff',
		padding: 15,
		width: '100%'
	},
	searchIcon: {
		padding: 10
	}
})

export default memo(SearchTodo)
