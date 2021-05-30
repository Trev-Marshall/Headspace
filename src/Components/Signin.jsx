import React from 'react'
import styled from 'styled-components'

function Signin() {
  return (
    <Container>

      <SignInDiv>
        <LogoText>Logo</LogoText>
        <Form>
          <Label>Email:</Label>
          <Input />
          <Label>Password:</Label>
          <Input />
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
  background-color: #F3F9D2;
`
const SignInDiv = styled.div`
  background-color: #231F20;
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
  color: #F3F9D2;
  padding: 10px 0;
  font-size: 1.05em;
`

const Input = styled.input`
  padding: 10px;
  background-color: #92B4A7;
  border-radius: 10px;
`


const Submit = styled.input`
  margin: 15px 0;
  background-color: #F3F9D2;
  font-weight: bold;
  width: 40%;
  margin-left: auto;
  padding: 14px;
  font-size: 1.1em;
  border-radius: 15px;
`

const LogoText = styled.h1`
  color: #F3F9D2;
  height: 100px;
  width: 90%;
  text-align: left;
  font-size: 2.5em;
`