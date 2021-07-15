import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

function Reflection({ reflection, setFormState, setValue, setReflection }) {

  const handleEdit = index => {
    setFormState({
      display: true,
      edit: true
    })
    setValue(reflection)
    setReflection({})
  }

  return (
    <Container>
      <Li>
        {reflection.reflection}
      </Li>
      <Span onClick={handleEdit}><EditIcon /></Span>
    </Container>
  )
}

export default Reflection

const Li = styled.p`
  margin: 13px;
  font-size: 1.4em; 
`

const Span = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  opacity: .5;
  transition: opacity 250ms;
  margin-right: 10px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    ${Span} {
      opacity: 1;
    }
  }
`
