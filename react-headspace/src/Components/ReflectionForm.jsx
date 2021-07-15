import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'
import { array } from 'prop-types'

function ReflectionForm({ setValue, value, formState, setReflection, setFormState }) {

  const handleReflectionEdit = e => {
    e.preventDefault()
    console.log(value, 'handleReflectionEdit has been activated')
    if (!value) return;
    axios.post(`http://localhost:8000/update-reflection/${value.id}/`, value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      console.log(res)
      setReflection([res.data])
    }
    )
    .catch(e => console.log(e))
    setFormState({
      display: false,
      edit: false
    })
    setValue('');
  }


  return (
    <Form onSubmit={(e) => handleReflectionEdit(e)}>
      <TextArea
      value={value.reflection}
      name="task"
      onChange={e => setValue({...value, 'reflection': e.target.value})}
      placeholder="Task..."
      />
      <Input 
      type="submit"
      value={formState.edit ? 'Edit' : 'Create'}
      >
      </Input>
    </Form>
  )
}

export default ReflectionForm

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

const TextArea = styled.textarea`
  width: 80%;
  height: 500px;
  border: none;
  border-bottom: 3px solid ${COLORS1.bright_color};
  background-color: ${COLORS1.secondary_main};
  color: white;
  font-size: 1.5em;
  &::placeholder {
    color: white;
  }
`