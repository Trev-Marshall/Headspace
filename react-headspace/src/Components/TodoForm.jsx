import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'

function TodoForm({value, setValue, todos, setTodos, formState, setFormState}) {

  const addTodo = text => {
    const newTodo = [...todos];
    setTodos(newTodo)
    setFormState({
      display: false,
      edit: false
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return;
    axios.post('http://localhost:8000/wel/', value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      console.log(res.data)
      setTodos([...todos,
      {
        'text': res.data.task,
        'details': res.data.details,
        'completed': res.data.completed
      }])
    }
    )
    .catch(e => console.log(e))
    addTodo(value);
    setValue({
      'task': '',
      'details': '',
      'completed': false
    });
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    console.log('Edit has been posted')
    // if (!value) return;
    // axios.post('http://localhost:8000/wel/', value, {
    // headers: {
    //       Authorization: `JWT ${localStorage.getItem('token')}`
    //     }})
    // .then( res => {
    //   console.log(res.data)
    //   setTodos([...todos,
    //   {
    //     'text': res.data.task,
    //     'details': res.data.details,
    //     'completed': res.data.completed
    //   }])
    // }
    // )
    // .catch(e => console.log(e))
    // addTodo(value);
    // setValue({
    //   'task': '',
    //   'details': '',
    //   'completed': false
    // });
  }

  return (
    <Form onSubmit={() => {formState.edit ? handleSubmitEdit : handleSubmit}}>
      <Input
      type='text'
      value={value.task}
      name="task"
      onChange={e => setValue({...value, 'task': e.target.value})}
      placeholder="Task..."
      />
      <Input
      type='text'
      name='details'
      onChange={e => setValue({...value, 'details': e.target.value})}
      placeholder="Description..." />
      <Input
      type='checkbox'
      onChange={e => setValue({...value, 'completed': e.currentTarget.checked})}
      />
      <Input 
      type="submit"
      value={formState.edit ? 'Edit' : 'Create'}
      >
      </Input>
    </Form>
  )
}

export default TodoForm

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
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