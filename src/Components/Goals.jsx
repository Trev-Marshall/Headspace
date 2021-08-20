import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import axios from 'axios'
import Goal from './Goal'
import GoalForm from './GoalForm'
import ArchiveModal from './ArchiveModal'

function Goals({setLoading, setLocalStrgUpdateGoals, needsLocalStrgUpdateGoals, needsLocalStrgUpdateProfile}) {

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
    setLoading(true)
    if(needsLocalStrgUpdateGoals === false) {
      setGoals(JSON.parse(localStorage.getItem('goals')))
      setLoading(false)
    } else if (needsLocalStrgUpdateGoals) {
      axios('http://localhost:8000/get-goals/', {
      headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          setLoading(false)
          setGoals(res.data)
          localStorage.setItem('goals', JSON.stringify(res.data))
          setLocalStrgUpdateGoals(false)
        })
        .catch(e => alert(e))
      }
  }, [needsLocalStrgUpdateGoals, setLoading, setLocalStrgUpdateGoals])

  return (
    <Container>
      <ArchiveModalBtn 
      onClick={() => setArchiveState(!archiveModal)}
      >
        Archive</ArchiveModalBtn>
      {/* <Ul> */}
        {goals && 
        goals.map((goal, index) => (
          <Goal
          key={index}
          setLoading={setLoading}
          index={index}
          goal={goal}
          setValue={setValue}
          setFormState={setFormState}
          setGoals={setGoals}
          goals={goals}
          needsLocalStrgUpdateProfile={needsLocalStrgUpdateProfile}
          />
        ))}
      {/* </Ul> */}
      {formState.display ? 
      (
        <GoalForm 
      value={value} 
      setValue={setValue}
      setGoals={setGoals}
      needsLocalStrgUpdateProfile={needsLocalStrgUpdateProfile}
      setLoading={setLoading}
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
  display: flex;
  min-height: calc(100vh - 108px);
  position: relative;
  align-items: center;
  flex-direction: column;
  list-style-type: none;
  width: 100%;
  background-color: ${COLORS1.off_white};
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

  border-radius: 20px;
  padding: 20px 30px;
  font-weight: bold;
  font-size: 1.1em;
  outline: none;
  border: none;
  cursor: pointer;
  height: 50px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  position: fixed;
  right: 0px;
  bottom: 0px;
  border-radius: 30px 0 0 0;
  background: ${COLORS1.bright_color};
  cursor: pointer;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }

`