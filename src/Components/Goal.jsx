import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { refreshToken } from '../utils/refreshCall';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function Goal({index, goals, goal, setGoals, setFormState, setValue, setLoading, setLocalStrgUpdateProfile}) {

  const completeTodo = index => {
    refreshToken()
    setLoading(true)
    const newGoals = [...goals];
    const completedGoal = newGoals[index]
    completedGoal.completed = true
    axios.post(`http://localhost:8000/update-goal/${completedGoal.id}/`, completedGoal, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          setLoading(false)
          newGoals.splice(index, 1)
          setGoals([...newGoals,
            res.data
          ])
          localStorage.setItem('goals', JSON.stringify([...goals, res.data]))
        })
        .catch(e => {
          alert(e)
        })
        setLocalStrgUpdateProfile(true)
  }

  const handleEdit = index => {
    const newGoals = [...goals];
    setFormState({
    'display': true,
    'edit': true
    })
    setValue(newGoals[index])
    const array = [...goals]
    array.splice(index, 1)
    setGoals(array)
  }

  return (
    <Container>
      <Li>
        {goal.goal} <span
        style={{color: '#0E886B'}}>
        | Complete by: {goal.completeBy}
        </span>
      </Li>
        
      <div>
      {!goal.completed && <Span 
      onClick={() => completeTodo(index)}
      ><CheckCircleOutlineIcon /></Span>}
      <Span onClick={() => handleEdit(index)}><EditIcon /></Span>
      </div>
    </Container>
  )
}

export default Goal

const Li = styled.li`
  margin: 7px;
  font-size: 1.4em; 
`

const Span = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  opacity: .5;
  transition: opacity 250ms;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  background: rgba(196, 196, 196, 0.1);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 25px;

  width: fit-content;
  &:hover {
    ${Span} {
      opacity: 1;
    }
  }
  max-width: 800px;

  @media (max-width: 850px) {
    flex-direction: column;
    padding: 0 15px;
  }
`