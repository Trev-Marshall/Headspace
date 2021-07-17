import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'
import { array } from 'prop-types'

function GoalForm({value, setValue, goals, setGoals, formState, setFormState}) {

  const addGoal = value => {
    const newGoals = [...goals];
    setGoals(newGoals)
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
    e.preventDefault()
    if (!value) return;
    console.log(value)
    axios.post('http://localhost:8000/create-goal/', value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      console.log(res.data)
      setGoals([...goals,
      res.data])
    }
    )
    .catch(e => console.log(e))
    addGoal(value);
    setValue({
      'goal': '',
      'completeBy': '',
      'completed': false,
      'id': null
    });
  }

  const handleSubmitEdit = (e) => {
    e.preventDefault()
    console.log(value.id)
    if (!value) return;
    axios.post(`http://localhost:8000/update-goal/${value.id}/`, value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      console.log(res)
      
      setGoals([...goals, goals[value.id] = res.data])
    }
    )
    .catch(e => console.log(e))
    resetEditForm();
    setValue({
      'task': '',
      'details': '',
      'completed': false,
      'value': null
    });
  }

  return (
    <Form onSubmit={(e) => {formState.edit ? handleSubmitEdit(e) : handleSubmit(e)}}>
      <Input
      type='text'
      value={value.goal}
      name="task"
      onChange={e => setValue({...value, 'goal': e.target.value})}
      placeholder="Task..."
      />
      <Input
      type='date'
      name='details'
      value={value.completeBy}
      onChange={e => setValue({...value, 'completeBy': e.target.value})} />
      <Input
      type='checkbox'
      onChange={e => setValue({...value, 'completed': e.currentTarget.checked})}
      checked={value.completed}
      />
      <Input 
      type="submit"
      value={formState.edit ? 'Edit' : 'Create'}
      >
      </Input>
    </Form>
  )
}

export default GoalForm

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