import React from 'react'
import styled from 'styled-components'

function Todo({todo, index, todos, setTodos}) {

  const completeTodo = index => {
    const newTodo = [...todos];
    newTodo[index].isCompleted = true;
    setTodos(newTodo)
  }

  return (
    <Container>
      <Li style={{ display: todo.isCompleted ? "none" : "block" }} >
        {todo.text}
      </Li>
      <Span 
      onClick={() => completeTodo(index)}
      style={{ display: todo.isCompleted ? "none" : "block" }}
      >x</Span>
    </Container>
  )
}

export default Todo

const Li = styled.li`
  margin: 13px;
  font-size: 1.4em; 
`

const Span = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  opacity: .5;
  transition: opacity 250ms;
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