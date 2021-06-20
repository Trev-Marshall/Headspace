import React, { useState } from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {COLORS1} from '../Design/Constants'
import PageHeading from './PageHeading'
import BackButton from './BackButton'

function Reflections() {

  const [todos, setTodos] = useState([
    {text: 'this is the text of a reflection',
    isCompleted: false},
    {text: 'This is the second reflection on the list',
    isCompleted: false},
    {text: 'This is the third reflection on the list',
    isCompleted: false}
  ])
  const [value, setValue] = useState("")
  const [formState, setFormState] = useState(false)

  return (
    <Container>
      <BackButton />
      <PageHeading value={"Reflections"} headingSizeEm={"4em"}/>
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

export default Reflections

const Container = styled.div`
  background-color: ${COLORS1.main};
  height: 100vh;
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
