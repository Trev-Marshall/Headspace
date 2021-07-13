import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

function Reflection({ reflection }) {

  console.log(reflection)

  // const handleEdit = index => {
  //   console.log(index)
  //   const newTodo = [...todos];
  //   console.log(newTodo[index])
  //   setFormState({
  //   'display': true,
  //   'edit': true
  //   })
  //   setValue({
  //   'task': newTodo[index].task,
  //   'details': newTodo[index].details,
  //   'completed': newTodo[index].completed,
  //   'id': newTodo[index].id,
  //   'user': newTodo[index].user
  //   })
  //   const array = [...todos]
  //   array.splice(index, 1)
  //   setTodos(array)
  // }

  return (
    <Container>
      <Li>
        {reflection.reflection}
      </Li>
      <Span onClick={() => handleEdit()}><EditIcon /></Span>
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
