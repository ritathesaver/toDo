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

const TodoDetails: FunctionComponent<IDetailsProps> = ({ route, todo, deleteTodo, editTodo, navigation }) => {
  const [inputActive, setInputActive] = useState(false)
  const [text, setText] = useState(todo?.text)

  const onEdit = useCallback(
    () => {
      if (text) {
        setInputActive(false)
   
        editTodo(todo.id, text)
      }
    },
    [text]
  )


  return (
    <KeyboardAvoidingView style={styles.containerTodo} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          todo ? (
            <>
              <Todo onClick={() => { }} todo={todo} />
              <Button color='#f7f7f7' onPress={() => { deleteTodo(todo.id); navigation.goBack() }} title="Delete" />
              {inputActive ? (
                <TextInput
                  style={styles.inputForm}
                  onChangeText={setText}
                  defaultValue={text}
                  placeholder="Edit your todo"
                  onSubmitEditing={onEdit}
                />
              ) : (
                <Button color='#f7f7f7' onPress={() => { setInputActive(true) }} title="Edit"></Button>
              )}
            </>
          ) : null
        }
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

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

const mapStateToProps = (state: { todos: ITodo[] }, { route }: IDetailsProps) => {
  const { todos } = state
  const todo = todos.find(item => item.id === route?.params?.id)
  return { todo }
}


const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      deleteTodo,
      editTodo
    },

    dispatch
  )


export default connect( mapStateToProps, mapDispatchToProps)(TodoDetails)