import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import SignupForm from './SignupForm'
import SigninForm from './SigninForm'

function Signin({ handleLogin, handleSignup }) {
  const [formState, setForm] = useState({
    username: '',
    password: '',
  })
  const [display, setDisplay] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm( prevstate => {
      const newState = { ...prevstate }
      newState[name] = value
      return newState;
    })
  }

  return (
    <Container>
      {
        display ? (
          <SigninForm 
          formState={formState}
          display={display}
          setDisplay={setDisplay}
          handleChange={handleChange}
          handleLogin={handleLogin}
          />
        ) : (
          <SignupForm 
          formState={formState}
          display={display}
          setDisplay={setDisplay}
          handleChange={handleChange}
          handleSignup={handleSignup}
          />
        )
      }
    </Container>
  )
}

export default Signin

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS1.secondary_main};
`