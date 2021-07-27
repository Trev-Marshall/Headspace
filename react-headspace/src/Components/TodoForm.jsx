import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'
import { array } from 'prop-types'

function TodoForm({value, setValue, todos, setTodos, formState, setFormState, setLoading}) {

  const addTodo = text => {
    const newTodo = [...todos];
    setTodos(newTodo)
    setFormState({
      display: false,
      edit: false
    })
  }

  const resetEditForm = () => {
  setFormState({
    display: false,
    edit: false
  })
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    if (!value) return;
    axios.post('http://localhost:8000/wel/', value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      setLoading(false)
      console.log(res.data)
      setTodos([...todos,
      res.data])
    }
    )
    .catch(e => console.log(e))
    addTodo(value);
    setValue({
      'task': '',
      'details': '',
      'completed': false,
      'value': null
    });
  }

  const handleSubmitEdit = (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(value.id)
    if (!value) return;
    axios.post(`http://localhost:8000/edit-todo/${value.id}/`, value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      setLoading(false)
      console.log(res)
      setTodos([...todos, todos[value.id] = res.data])
    }
    )
    .catch(e => console.log(e))
    resetEditForm(value);
    setValue({
      'task': '',
      'details': '',
      'completed': false,
      'value': null
    });
  }

  return (
    <Form onSubmit={(e) => {formState.edit ? handleSubmitEdit(e) : handleSubmit(e)}}>
      <DivFlexRow>
      <Input
      style={{flex: 1}}
      type='text'
      value={value.task}
      name="task"
      onChange={e => setValue({...value, 'task': e.target.value})}
      placeholder="Task..."
      maxLength="100"
      required={true}
      />
      <span
      style={{fontWeight: 800}}
      >&#10003;</span>
      <Input
      type='checkbox'
      onChange={e => setValue({...value, 'completed': e.currentTarget.checked})}
      />
      </DivFlexRow>
      {/* <Input
      type='text'
      maxLength="600"
      name='details'
      value={value.details}
      onChange={e => setValue({...value, 'details': e.target.value})}
      required={true}
      placeholder="Description..." /> */}
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
  padding: 10px;
  background: #9EB3B745;
  border: none;
  border-bottom: 3px solid ${COLORS1.off_black};
  font-size: 1.1em;
  overflow: hidden;
  border-radius: 2px;
  margin: 10px 15px;
`

const DivFlexRow = styled.div`
  display: flex;
  align-items: center;
`