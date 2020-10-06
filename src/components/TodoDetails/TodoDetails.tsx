import React, { FunctionComponent, useState, useCallback } from 'react'
import { ScrollView, KeyboardAvoidingView, Button,TextInput } from 'react-native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import Todo from '../Todo/Todo'
import { ITodo } from '../TodoList/TodoList'
import { useDispatch } from 'react-redux'
import {styles} from './styles'
import { useTypedSelector, RootState } from '../../redux/rootReducer'
import { AppDispatch } from '../../../App'
import { editTodo, deleteTodo } from '../../redux/actions/index'

interface IDetailsProps {
  route: RouteProp<any, any>
  todo: ITodo | undefined
  navigation: NavigationProp<any>

}


const TodoDetails: FunctionComponent<IDetailsProps> = ({navigation, route }) => {

  const todo = useTypedSelector((state: RootState) => state.todos.todos.find(item => item.id === route?.params?.id))
  const dispatch: AppDispatch = useDispatch()

 

  const [inputActive, setInputActive] = useState(false)
  const [title, setTitle] = useState(todo?.title)

  const onEdit = useCallback(
    () => {
      if (todo && title) {
        setInputActive(false)
        dispatch(editTodo(todo.id, title))
      
      }
    },
    [dispatch, title]
  )

  const onDelete = () => {
    dispatch(deleteTodo(todo?.id));
    navigation.goBack()
  }

  if (!todo) {
    return null
  }

  return (
    <KeyboardAvoidingView style={styles.containerTodo} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          todo ? (
            <>
              <Todo onClick={() => { }} todo={todo} />
              <Button color='#f7f7f7' onPress={onDelete} title="Delete" />
              {inputActive ? (
                <TextInput
                  style={styles.inputForm}
                  onChangeText={setTitle}
                  defaultValue={title}
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



export default TodoDetails