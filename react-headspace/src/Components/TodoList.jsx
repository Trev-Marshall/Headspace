import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'

function TodoList({setLoading}) {
  const [todos, setTodos] = useState([])
  const [value, setValue] = useState({
    'task': '',
    'details': '',
    'completed': false,
  })
  const [formState, setFormState] = useState({
    display: false,
    edit: false
  })
  const [taskDetailModal, setTaskDetailModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8000/todos/',  {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then(res => {
      setLoading(false)
      console.log(res.data)
      setTodos(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <Container>
      <Ul>
        {todos && 
        todos.map((todo, index) => (
          <Todo
          key={todo.id}
          index={index}
          todo={todo}
          setFormState={setFormState}
          setValue={setValue}
          setTodos={setTodos}
          todos={todos}
          />
        ))}
      </Ul>
      {formState.display ? 
      (
        <TodoForm 
      value={value} 
      setValue={setValue}
      setTodos={setTodos}
      setLoading={setLoading}
      formState={formState}
      todos={todos}
      setFormState={setFormState}
      />
      ) : (
        <Span
        onClick={() => setFormState({
          'display': true,
          'edit': false
        })}
        >+</Span>
      )
    }
    </Container>
  )
}

export default TodoList

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`

const Ul = styled.ul`
  list-style-type: none;
`

const Span = styled.span`
  font-size: 2.5em;
  transition: all 250ms;
  cursor: pointer;
  &:hover {
    color: ${COLORS1.secondary_accent};
    transform: rotate(90deg);
  }
`