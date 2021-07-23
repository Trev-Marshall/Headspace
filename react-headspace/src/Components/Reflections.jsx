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

function Reflections() {

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
    axios.get('http://localhost:8000/current-reflection/', { headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          console.log(res.data) 
          setReflection(res.data)
          if(!res.data[0]){
            alert('You have no new todo today! Would you like to add a new one?')
            setFormState({
              display: true,
              edit: false
            })
          }
        })
  }, [])

  return (
    <Container>
      <BackButton />
      <HeadingContainer>
      <PageHeading value={"Reflection"} headingSizeEm={"2.5em"}/>
      <PageHeading value={`${months[d.getMonth()]} ${d.getDate()}`} headingSizeEm={"2em"}/>
      </HeadingContainer>
      <Ul>
        {reflection[0] && 
        <Reflection
          reflection={reflection[0]}
          setReflection={setReflection}
          setFormState={setFormState}
          setValue={setValue}
        ></Reflection>
        }
      </Ul>
      <FormContainer>
      {formState.display &&
        <ReflectionForm 
      value={value} 
      setValue={setValue}
      setFormState={setFormState}
      formState={formState}
      reflection={reflection}
      setReflection={setReflection}
      />
    }
      </FormContainer>
    </Container>
  )
}

export default Reflections

const Container = styled.div`
  background-color: ${COLORS1.main};
  height: 100vh;
  display: flex;
  align-items: center;
  color: white;
  flex-direction: column;
`

const Ul = styled.ul`
  list-style-type: none;
  margin-top: 15%;
`

const HeadingContainer = styled.div`
  text-align: center;
`

const FormContainer = styled.div`
  width: 70%;
`