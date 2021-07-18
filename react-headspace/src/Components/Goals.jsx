import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {COLORS1} from '../Design/Constants'
import PageHeading from './PageHeading'
import BackButton from './BackButton.jsx'
import axios from 'axios'
import Goal from './Goal'
import GoalForm from './GoalForm'
import ArchiveModal from './ArchiveModal'

function Goals() {

  const [goals, setGoals] = useState([])
  const [value, setValue] = useState({
    'goal': '',
    'completeBy': '',
    'completed': false
  })
  const [formState, setFormState] = useState({
    display: false,
    edit: false
  })
  const [archiveModal, setArchiveState] = useState(false)

  useEffect(() => {
    axios('http://localhost:8000/get-goals/', {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
      }})
      .then(res => {
        console.log(res)
        setGoals(res.data)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <Container>
      <BackButton />
      <ArchiveModalBtn 
      onClick={() => setArchiveState(!archiveModal)}
      >Archive</ArchiveModalBtn>
      <PageHeading value={"Goals"} headingSizeEm={"4em"}/>
      <Ul>
        {goals && 
        goals.map((goal, index) => (
          <Goal
          key={index}
          index={index}
          goal={goal}
          setValue={setValue}
          setFormState={setFormState}
          setGoals={setGoals}
          goals={goals}
          />
        ))}
      </Ul>
      {formState.display ? 
      (
        <GoalForm 
      value={value} 
      setValue={setValue}
      setGoals={setGoals}
      goals={goals}
      formState={formState}
      setFormState={setFormState}
      />
      ) : (
        <Span
        onClick={() => setFormState({
          display: true,
          edit: false
        })}
        >+</Span>
      )
    }
    {archiveModal && 
    <ArchiveModal
    setArchiveState={setArchiveState}
    />
    }
    </Container>
  )
}

export default Goals

const Container = styled.div`
  background-color: ${COLORS1.main};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
`

const Ul = styled.ul`
  list-style-type: none;
`

const Span = styled.span`
  font-size: 2.5em;
  transition: all 250ms;
  cursor: pointer;
  &:hover {
    color: ${COLORS1.secondary_accent};
    transform: rotate(90deg);
  }
`

const ArchiveModalBtn = styled.button`
  border-radius: 4px;
  background: ${COLORS1.secondary_accent};
  padding: 10px 22px;
  font-weight: bold;
  font-size: 1.1em;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  position: absolute;
  top: 40px;
  right: 40px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`