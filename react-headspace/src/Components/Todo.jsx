import React from 'react'
import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { COLORS1 } from '../Design/Constants';
import Checkbox from '../assets/images/checkbox.png'
import Checkmark from '../assets/images/checkmark.png'
import { refreshToken } from '../utils/refreshCall';

function Todo({todo, index, todos, setTodos, setFormState, setValue, setLoading, setLocalStrgUpdateProfile}) {

  const completeTodo = index => {
    refreshToken()
    setLoading(true)
    const newTodo = [...todos];
    const completedTodo = newTodo[index]
    completedTodo.completed = !completedTodo.completed
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
          localStorage.setItem('tasks', JSON.stringify([...todos, res.data]))
          setLocalStrgUpdateProfile(true)
        })
        .catch(e => {
          alert(e)
        })
  }

  const handleEdit = index => {
    const newTodo = [...todos];
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
      {todo.completed ? (
        <CheckboxDiv onClick={() => completeTodo(index)}>
          <CheckboxImg src={Checkbox} />
          <CheckmarkImg src={Checkmark} />
        </CheckboxDiv>
      ) : (
        <CheckboxDiv onClick={() => completeTodo(index)}>
          <CheckboxImg src={Checkbox} />
        </CheckboxDiv>
      )}
      <Li>
        {todo.task}
      </Li>
      <Span onClick={() => handleEdit(index)}>
        <EditIcon
        style={{fill: COLORS1.main}}
        />
      </Span>
    </Container>
  )
}

export default Todo

const Li = styled.li`
  margin: 7px;
  font-size: 1.4em; 
`

const Span = styled.span`
  cursor: pointer;
  font-size: 1.5em;
  opacity: .65;
  transition: opacity 250ms;
  margin-right: 10px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  background: rgba(196, 196, 196, 0.1);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.14);
  margin: 5px 15px 5px 15px;

  width: fit-content;

border-radius: 25px;
  &:hover {
    ${Span} {
      opacity: 1;
    }
  }
`

const CheckboxDiv = styled.div`
  cursor: pointer;
`

const CheckmarkImg = styled.img`
  position: absolute;
  margin-left: -27px;
  margin-top: -15px;
`

const CheckboxImg = styled.img`
`