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
const SignInDiv = styled.div`
  background-color: ${COLORS1.main};
  border-radius: 20px;
  width: 400px;
  height: 400px;
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
`

const Label = styled.label`
  color: white;
  padding: 10px 0;
  font-size: 1.05em;
  display: none;
`

const Input = styled.input`
  padding: 10px;
  background-color: ${COLORS1.main};
  border: none;
  border-bottom: 3px solid ${COLORS1.bright_color};
  color: white;
  font-size: 1.1em;
  margin: 10px 0;
  &::placeholder {
    color: white;
  }
`


const Submit = styled.input`
  margin: 15px 0;
  background-color: ${COLORS1.secondary_accent};
  font-weight: bold;
  border: none;
  width: 40%;
  margin-left: auto;
  padding: 14px;
  font-size: 1.1em;
  border-radius: 15px;
  color: white;
`

const LogoText = styled.h1`
  color: ${COLORS1.off_white};
  height: 100px;
  width: 90%;
  text-align: left;
  font-size: 2.5em;
`

const FormText = styled.h3`
  color: ${COLORS1.off_white};
  width: 90%;
  text-align: left;
  font-size: 2.5em;
`

const SignupLink = styled.a`

`