import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
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
        {/* <Ul> */}
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
        {/* </Ul> */}
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
  background-color: rgba(78, 55, 75, 0.39);
`
const WindowContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 70%;
  background-color: rgb(226, 74, 132);
  margin: auto;
  padding: 40px 20px;
  list-style-type: none;

  @media (max-width: 850px) {
    padding: 10px;
  }
`

const Ul = styled.ul`
`