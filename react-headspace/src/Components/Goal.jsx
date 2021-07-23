import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function Goal({index, goals, goal, setGoals, setFormState, setValue}) {

  const completeTodo = index => {
    const newGoals = [...goals];
    const completedGoal = newGoals[index]
    console.log(completedGoal.id)
    completedGoal.completed = true
    axios.post(`http://localhost:8000/update-goal/${completedGoal.id}/`, completedGoal, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          newGoals.splice(index, 1)
          setGoals([...newGoals,
            res.data
          ])
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
        {goal.goal}
      </Li>
      <Li>
        Complete by: {goal.completeBy}
      </Li>
      {!goal.completed && <Span 
      onClick={() => completeTodo(index)}
      style={{ textDecoration: goal.completed ? "line-through" : "none" }}
      ><CheckCircleOutlineIcon /></Span>}
      <Span onClick={() => handleEdit(index)}><EditIcon /></Span>
    </Container>
  )
}

export default Goal

const Li = styled.li`
  margin: 13px;
  font-size: 1.4em; 
`

const Span = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  opacity: .5;
  transition: opacity 250ms;
  margin-right: 10px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    ${Span} {
      opacity: 1;
    }
  }

  @media (max-width: 850px) {
    flex-direction: column;
  }
`