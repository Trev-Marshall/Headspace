import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'

function Signin() {
  return (
    <Container>

      <SignInDiv>
        <LogoText>Logo</LogoText>
        <Form>
          <Label>Email:</Label>
          <Input placeholder="Email..." />
          <Label>Password:</Label>
          <Input placeholder="Password..." />
          <Submit type="submit" />
        </Form>
      </SignInDiv>

    </Container>
  )
}

export default Signin

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
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