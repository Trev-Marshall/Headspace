import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {COLORS1} from '../Design/Constants'
import PageHeading from './PageHeading'
import BackButton from './BackButton'
import Reflection from './Reflection'
import axios from 'axios'

function Reflections() {

  const [reflection, setReflection] = useState({})
  const [value, setValue] = useState({
    'reflection': '',
  })
  const [formState, setFormState] = useState(false)

  const d = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    axios.get('http://localhost:8000/current-reflection/', { headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => setReflection(res.data))
  }, [])

  return (
    <Container>
      <BackButton />
      <HeadingContainer>
      <PageHeading value={"Reflection"} headingSizeEm={"4em"}/>
      <PageHeading value={`${months[d.getMonth()]} ${d.getDate()}`} headingSizeEm={"2em"}/>
      </HeadingContainer>
      <Ul>
        {reflection[0] && 
        <Reflection
          reflection={reflection[0]}
          setFormState={setFormState}
        ></Reflection>
        }
      </Ul>
      {formState ? 
      (
        <TodoForm 
      value={value} 
      setValue={setValue}
      setTodos={setTodos}
      todos={todos}
      setFormState={setFormState}
      />
      ) : (
        <Span
        onClick={() => setFormState(true)}
        >+</Span>
      )
    }
    </Container>
  )
}

export default Reflections

const Container = styled.div`
  background-color: ${COLORS1.main};
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  flex-direction: column;
`

const Ul = styled.ul`
  list-style-type: none;
`

const Span = styled.span`
  font-size: 2.5em;
  transition: all 250ms;
  cursor: pointer;
  &:hover {
    color: ${COLORS1.secondary_accent};
    transform: rotate(90deg);
  }
`

const HeadingContainer = styled.div`
  text-align: center;
`