import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'
import { refreshToken } from '../utils/refreshCall'

function TodoForm({value, setValue, todos, setTodos, formState, setFormState, setLoading, setLocalStrgUpdateProfile}) {

  const resetEditForm = () => {
  setFormState({
    display: false,
    edit: false
  })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    refreshToken()
    setLoading(true)
    if (!value) return;
    axios.post('http://localhost:8000/wel/', value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      setLoading(false)
      setTodos([...todos,
      res.data])
      localStorage.setItem('tasks', JSON.stringify([...todos, res.data]))
      if(res.statusText === "OK"){
        setValue({
          'task': '',
          'details': '',
          'completed': false,
          'value': null
        });
        setFormState({
          display: false,
          edit: false
        })
        setLocalStrgUpdateProfile(true)
      }
    }
    )
    .catch(e => alert(e))
  }

  const handleSubmitEdit = (e) => {
    setLoading(true)
    e.preventDefault()
    refreshToken()
    if (!value) return;
    axios.post(`http://localhost:8000/edit-todo/${value.id}/`, value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      setLoading(false)
      setTodos([...todos, res.data])
      localStorage.setItem('tasks', JSON.stringify([...todos, res.data]))
    }
    )
    .catch(e => alert(e))
    resetEditForm(value);
    setValue({
      'task': '',
      'details': '',
      'completed': false,
      'value': null
    });
    setLocalStrgUpdateProfile(true)
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
      style={{fontWeight: 800, fontSize: '2.5em'}}
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