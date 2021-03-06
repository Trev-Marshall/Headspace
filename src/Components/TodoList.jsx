import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'

function TodoList({ setLoading, needsLocalStrgUpdateTasks, setLocalStrgUpdateTasks, setLocalStrgUpdateProfile }) {
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
  

  useEffect(() => {
    setLoading(true)
    if(needsLocalStrgUpdateTasks === false) {
      setTodos(JSON.parse(localStorage.getItem('tasks')))
      setLoading(false)
    } else if (needsLocalStrgUpdateTasks) {
      axios.get('http://localhost:8000/todos/',  {
      headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }})
      .then(res => {
        setLoading(false)
          setTodos(res.data)
          localStorage.setItem('tasks', JSON.stringify(res.data))
          setLocalStrgUpdateTasks(false)
      })
      .catch(e => alert(e))
    }
  }, [needsLocalStrgUpdateTasks, setLoading, setLocalStrgUpdateTasks])

  return (
    <Container>
      <Ul>
        {todos && 
        todos.map((todo, index) => (
          <Todo
          key={todo.id}
          index={index}
          todo={todo}
          setLocalStrgUpdateProfile={setLocalStrgUpdateProfile}
          setFormState={setFormState}
          setValue={setValue}
          setTodos={setTodos}
          setLoading={setLoading}
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
      setLocalStrgUpdateProfile={setLocalStrgUpdateProfile}
      setLoading={setLoading}
      formState={formState}
      todos={todos}
      setLocalStrgUpdateTasks={setLocalStrgUpdateTasks}
      setFormState={setFormState}
      />
      ) : (
        <Div>
          <Span
          onClick={() => setFormState({
            'display': true,
            'edit': false
          })}
          >+</Span>
        </Div>
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
  flex-direction: column;
`

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
`

const Span = styled.span`
  font-size: 2.5em;
  transition: all 250ms;
  cursor: pointer;
  color: ${COLORS1.off_black};
`

const Div = styled.div`
  transition: all 250ms;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  &:hover {
    transform: rotate(90deg);
    ${Span} {
      color: ${COLORS1.secondary_accent};
      // transform: rotate(90deg);
    }
  }
`