import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import SignupForm from './SignupForm'
import SigninForm from './SigninForm'
import TopVector from '../assets/images/top-vector-signin.png'
import BottomVector from '../assets/images/bottom-vector-signin.png'

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
      <Background1
      src={TopVector}
      alt="background"
      />
      <Background2
      src={BottomVector}
      alt="background"
      />
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
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS1.off_white};
`

const Background1 = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`
const Background2 = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
`