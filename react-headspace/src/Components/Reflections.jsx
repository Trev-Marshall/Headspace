import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {COLORS1} from '../Design/Constants'
import PageHeading from './PageHeading'
import BackButton from './BackButton'
import Reflection from './Reflection'
import ReflectionForm from './ReflectionForm'
import axios from 'axios'
import LoadingSign from './LoadingSign'

function Reflections({setLoading}) {

  const [reflection, setReflection] = useState({})
  const [value, setValue] = useState({
    'reflection': '',
  })
  const [formState, setFormState] = useState({
    display: false,
    edit: false
  })


  const d = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    setLoading(true)
    axios.get('http://localhost:8000/current-reflection/', { headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          setLoading(false)
          console.log(res.data) 
          setReflection(res.data)
          if(!res.data[0]){
            alert('You have no reflection for today! Would you like to add a new one?')
            setFormState({
              display: true,
              edit: false
            })
          }
        })
  }, [])

  return (
    <OuterWrapper>
    <Container>
      <ReflectionContainer>
      <Span>
        {d.getMonth()}-{d.getDate()}-{d.getFullYear()}
        </Span> 
        {reflection[0] && 
        <Reflection
          reflection={reflection[0]}
          setReflection={setReflection}
          setFormState={setFormState}
          setValue={setValue}
        ></Reflection>
        }
      </ReflectionContainer>
      {formState.display &&
      <FormContainer>
        <ReflectionForm 
      value={value} 
      setLoading={setLoading}
      setValue={setValue}
      setFormState={setFormState}
      formState={formState}
      reflection={reflection}
      setReflection={setReflection}
      />
      </FormContainer>
    }
    </Container>
    </OuterWrapper>
  )
}

export default Reflections

const OuterWrapper = styled.div`
  background-color: ${COLORS1.off_white};
  width: 100%;
  min-height: calc(100vh - 108px);
  display: flex;
`

const Container = styled.div`
  display: flex;
  background: rgba(196, 196, 196, 0.15);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.14);
  margin: 5px auto;
  flex-direction: column;
  border-radius: 25px;
  width: 90%;
  max-width: 800px;
  min-height: 650px; 
  // height: 
  overflow: auto;


  @media (max-width: 900px) {
    // min-height: 0;
  }
`

const FormContainer = styled.div`
  width: 70%;
  margin: auto;
`

const ReflectionContainer = styled.div`
  width: 100%;
`

const Span = styled.p`
  color: #0E886B;
  padding-top: 5px;
  padding-left: 20px;
  font-size: 20px;
`