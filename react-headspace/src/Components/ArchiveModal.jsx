import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { COLORS1 } from '../Design/Constants'
import Goal from './Goal'

function ArchiveModal({ setArchiveState }) {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/get-finished-goals',{
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
      }})
      .then(res => {
        setGoals(res.data)
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <Container onClick={() => setArchiveState(false)}>
      <WindowContainer>
        <Span>Completed Goals</Span>
        <OverflowDiv>
      {goals && 
        goals.map((goal, index) => (
          <Goal
          key={index}
          index={index}
          goal={goal}
          setGoals={setGoals}
          goals={goals}
          />
        ))}
        </OverflowDiv>
      </WindowContainer>
    </Container>
  )
}

export default ArchiveModal

const Container = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: rgba(78, 55, 75, 0.39);
  `
  const WindowContainer = styled.div`
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 70%;
  background-color: ${COLORS1.off_white};
  margin: auto;
  padding: 40px 20px;
  list-style-type: none;

  @media (max-width: 850px) {
    padding: 10px;
  }
`

const Ul = styled.ul`
`

const Span = styled.div`
  text-align: center;
  font-size: 1.5em;
  border-bottom: 2px solid ${COLORS1.dark_grey};
  padding-bottom: 5px;
`

const OverflowDiv = styled.div`
 overflow: auto;
`