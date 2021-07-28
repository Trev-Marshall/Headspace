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
import ArchivePng from '../assets/images/Archive container.png'

function Goals({setLoading}) {

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
    axios('http://localhost:8000/get-goals/', {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
      }})
      .then(res => {
        setLoading(false)
        console.log(res)
        setGoals(res.data)
      })
      .catch(e => console.log(e))
    axios.post('http://localhost:8000/refresh-token-auth/', {
      'token': `${localStorage.getItem('token')}`
    })
    .then(res => console.log(res))
  }, [])

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
          />
        ))}
      {/* </Ul> */}
      {formState.display ? 
      (
        <GoalForm 
      value={value} 
      setValue={setValue}
      setGoals={setGoals}
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

const Img = styled.img`
width: 100%;
position: absolute;
`