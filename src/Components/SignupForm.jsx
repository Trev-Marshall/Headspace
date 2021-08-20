import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'

function SignupForm({ handleSignup, formState, handleChange, display, setDisplay }) {


  return (
    <>
      <SignInDiv>
        {/* <LogoText>Headspace</LogoText> */}
        <FormText>Sign-up</FormText>
        <Form onSubmit={e => handleSignup(e, formState)}>
          <Label htmlFor="username">Username:</Label>
          <Input 
          type="text"
          name="username" 
          placeholder="Username..."
          value={formState.username}
          onChange={handleChange}
          />
          <Label htmlFor="password">Password:</Label>
          <Input 
          name="password"
          type="password" 
          value={formState.password}
          placeholder="Password..." 
          onChange={handleChange}
          />
          <Submit type="submit" />
        </Form>
      <AccountText>Already have an account? <SignupLink onClick={() => setDisplay(!display)}>Sign in.</SignupLink></AccountText>
      </SignInDiv>
      </>
  )
}

export default SignupForm

const SignInDiv = styled.div`
  background: #9EB3B745;
  border-radius: 15px;
  width: 400px;
  height: 400px;
  display: flex; 
  align-items: center;
  flex-direction: column;
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(39px);

  @media (max-width: 400px) {
    width: 97%;
    height: 300px;
  }
  @media (max-width: 900px) {
    width: 82%;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: auto;
`

const Label = styled.label`
  color: white;
  padding: 10px 0;
  font-size: 1.05em;
  display: none;
`

const Input = styled.input`
  padding: 10px;
  background: #9EB3B745;
  border: none;
  border-bottom: 3px solid ${COLORS1.off_black};
  font-size: 1.1em;
  margin: 10px 0;
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
  color: ${COLORS1.dark_grey};
  cursor: pointer;
`

const FormText = styled.h3`
  width: 90%;
  text-align: left;
  font-size: 2.5em;
  margin: 20px 0 0;
  font-weight: 400;

  @media (max-width: 400px) {
    font-size: 1.5em;
    margin: 15px 0 0 0;
  }
`

const SignupLink = styled.a`
  cursor: pointer;
  color: #08A097;
`

const AccountText = styled.p`
  text-align: center;
    @media (max-width: 400px) {
    font-size: .9em;
  }
`