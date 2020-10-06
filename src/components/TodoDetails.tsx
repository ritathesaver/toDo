import React, { FunctionComponent } from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import Todo from './Todo'

interface IDetailsProps {
  route: RouteProp<any, any>
}

const TodoDetails: FunctionComponent<IDetailsProps> = ({ route }) => {
  return (
    <KeyboardAvoidingView style={styles.containerTodo} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Todo onClick={() => { }} todo={route?.params?.todo} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default TodoDetails

const styles = StyleSheet.create({
  containerTodo: {
    backgroundColor: '#393e46',
    width: '100%',
    height: '100%',
    padding: 10
  }
})
