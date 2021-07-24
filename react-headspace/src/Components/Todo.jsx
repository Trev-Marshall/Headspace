import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

function Todo({todo, index, todos, setTodos, setFormState, setValue}) {

  const completeTodo = index => {
    setLoading(true)
    const newTodo = [...todos];
    const completedTodo = newTodo[index]
    completedTodo.completed = true
    axios.post(`http://localhost:8000/edit-todo/${completedTodo.id}/`, completedTodo, {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
        .then(res => {
          setLoading(false)
          newTodo.splice(index, 1)
          setTodos([...newTodo,
            res.data
          ])
        })
        .catch(e => {
          console.log(e)
        })
  }

  const handleEdit = index => {
    console.log(index)
    const newTodo = [...todos];
    console.log(newTodo[index])
    setFormState({
    'display': true,
    'edit': true
    })
    setValue({
    'task': newTodo[index].task,
    'details': newTodo[index].details,
    'completed': newTodo[index].completed,
    'id': newTodo[index].id,
    'user': newTodo[index].user
    })
    const array = [...todos]
    array.splice(index, 1)
    setTodos(array)
  }

  return (
    <Container>
      <Li style={{ textDecoration: todo.completed ? "line-through" : "none" }} >
        {todo.task}
      </Li>
      <Span 
      onClick={() => completeTodo(index)}
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >x</Span>
      <Span onClick={() => handleEdit(index)}><EditIcon /></Span>
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