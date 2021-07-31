import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { COLORS1 } from '../Design/Constants';

function Goal({index, goals, goal, setGoals, setFormState, setValue, setLoading}) {

  const completeTodo = index => {
    setLoading(true)
    const newGoals = [...goals];
    const completedGoal = newGoals[index]
    console.log(completedGoal.id)
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
          console.log(e)
        })
  }

  const handleEdit = index => {
    console.log(index)
    const newGoals = [...goals];
    console.log(newGoals[index])
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
  margin: 13px;
  font-size: 1.4em; 
  border-top: 1px solid lightgrey;
  padding-top: 5px;
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