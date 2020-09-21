import React, { FunctionComponent, useState, useCallback } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, Button, TextInput } from 'react-native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import Todo from './Todo'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { deleteTodo, editTodo } from '../redux/actions'
import { ITodo } from './TodoList'
import { connect } from 'react-redux'

interface IDetailsProps {
  route: RouteProp<any, any>
  deleteTodo: any
  editTodo: any
  todo: ITodo
  navigation: NavigationProp<any>

}

const TodoDetails: FunctionComponent<IDetailsProps> = ({ route, deleteTodo, editTodo, navigation }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const [inputActive, setInputActive] = useState(false)
  const [text, setText] = useState(route?.params?.todo.text)

  const onEdit = useCallback(
    () => {
      if (text) {
        setInputActive(false)
   
        editTodo(route?.params?.todo.id, text)
      }

      setText('')
    },
    [text]
  )

  if (isDeleted) {
    navigation.goBack()
  }
  return (
    <KeyboardAvoidingView style={styles.containerTodo} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
       <Todo onClick={() => { }} todo={route?.params?.todo} />
        <Button color='#f7f7f7' onPress={() => { deleteTodo(route?.params?.todo.id); setIsDeleted(true) }} title="Delete"></Button>
        {inputActive ? (
          <TextInput
            style={styles.inputForm}
            onChangeText={setText}
            defaultValue={text}
            placeholder="Edit your todo"
            onSubmitEditing={onEdit}
          />
        ) : (
            <Button color='#f7f7f7' onPress={() => {setInputActive(true) }} title="Edit"></Button>
          )}
     
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      deleteTodo,
      editTodo 
    },
    
    dispatch
  )

const styles = StyleSheet.create({
  containerTodo: {
    backgroundColor: '#393e46',
    width: '100%',
    height: '100%',
    padding: 10
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
})

const mapStateToProps = (state: { todos: String }) => {
  const { todos } = state
  return { todos }
}



export default connect( mapStateToProps, mapDispatchToProps)(TodoDetails)