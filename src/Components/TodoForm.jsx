import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'

function TodoForm({value, setValue, todos, setTodos, setFormState}) {

  const addTodo = text => {
    const newTodo = [...todos, {text, isCompleted: false}];
    setTodos(newTodo)
    setFormState(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return;
    addTodo(value);
    setValue("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
      type='text'
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Task..."
      />
    </Form>
  )
}

export default TodoForm

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`

const Input = styled.input`
  width: 80%;
  border: none;
  border-bottom: 3px solid ${COLORS1.bright_color};
  background-color: ${COLORS1.secondary_main};
  color: white;
  font-size: 1.5em;
  &::placeholder {
    color: white;
  }
`