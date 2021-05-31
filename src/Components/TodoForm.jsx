import React from 'react'
import styled from 'styled-components'

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
      />
    </Form>
  )
}

export default TodoForm

const Form = styled.form`

`

const Input = styled.input`

`