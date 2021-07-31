import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'
import { array } from 'prop-types'

function GoalForm({value, setValue, goals, setGoals, formState, setFormState, setLoading, setLocalStrgUpdateProfile}) {



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
    console.log(value)
    axios.post('http://localhost:8000/create-goal/', value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      setLoading(false)
      console.log(res.data)
      setGoals([...goals,
      res.data])
      localStorage.setItem('goals', JSON.stringify([...goals, res.data]))
      if(res.statusText === "OK"){
        setValue({
          'goal': '',
          'completeBy': '',
          'completed': false,
          'id': null
        });
        setFormState({
          display: false,
          edit: false
        })
        setLocalStrgUpdateProfile(true)
      }
    }
    )
    .catch(e => console.log(e))
  }

  const handleSubmitEdit = (e) => {
    setLoading(true)
    e.preventDefault()
    console.log(value.id)
    if (!value) return;
    axios.post(`http://localhost:8000/update-goal/${value.id}/`, value, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then( res => {
      setLoading(false)
      console.log(res)
      localStorage.setItem('goals', JSON.stringify([...goals, res.data]))
      setGoals([...goals, res.data])
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
    setLocalStrgUpdateProfile(true)
  }

  return (
    <Form onSubmit={(e) => {formState.edit ? handleSubmitEdit(e) : handleSubmit(e)}}>
      <DivFlexRow>
      <Input
      style={{flex: 1}}
      type='text'
      maxLength="100"
      value={value.goal}
      name="task"
      onChange={e => setValue({...value, 'goal': e.target.value})}
      placeholder="Goal..."
      />
      <span
      style={{fontWeight: 800, fontSize: '2.5em'}}
      >&#10003;</span>
      <Input
      type='checkbox'
      onChange={e => setValue({...value, 'completed': e.currentTarget.checked})}
      checked={value.completed}
      />
      </DivFlexRow>
      <Input
      type='date'
      name='details'
      value={value.completeBy}
      onChange={e => setValue({...value, 'completeBy': e.target.value})} />
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
  padding: 10px;
  background: #9EB3B745;
  border: none;
  border-bottom: 3px solid ${COLORS1.off_black};
  font-size: 1.1em;
  overflow: hidden;
  border-radius: 2px;
  margin: 10px 15px;

  @media (min-width: 900px) {
    margin: 10px 10%;
  }
`

const DivFlexRow = styled.div`
  display: flex;
  align-items: center;
`