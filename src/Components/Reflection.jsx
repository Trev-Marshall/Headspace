import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';

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
  white-space: pre-wrap;
  width: 100%;
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
  margin: 5px 15px 5px 15px;


  @media (max-width: 900px) {
    min-height: 0;
  }
  &:hover {
    ${Span} {
      opacity: 1;
    }
  }
`
