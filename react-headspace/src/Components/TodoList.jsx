import React, {useState} from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {COLORS1} from '../Design/Constants'

function TodoList() {
  const [todos, setTodos] = useState([
    {text: 'this is the text of a todo',
    isCompleted: false},
    {text: 'This is the second todo on the list',
    isCompleted: false},
    {text: 'This is the third todo on the list',
    isCompleted: false}
  ])
  const [value, setValue] = useState("")
  const [formState, setFormState] = useState(false)

  return (
    <Container>
      <Ul>
        {todos && 
        todos.map((todo, index) => (
          <Todo
          key={index}
          index={index}
          todo={todo}
          setTodos={setTodos}
          todos={todos}
          />
        ))}
      </Ul>
      {formState ? 
      (
        <TodoForm 
      value={value} 
      setValue={setValue}
      setTodos={setTodos}
      todos={todos}
      setFormState={setFormState}
      />
      ) : (
        <Span
        onClick={() => setFormState(true)}
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