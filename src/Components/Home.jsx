import React, {useState} from 'react'
import styled from 'styled-components'
import Todo from './Todo'



function Home() {
  const [todos, setTodos] = useState([
    {text: 'this is the text of a todo'},
    {text: 'This is the second todo on the list'},
    {text: 'This is the third todo on the list'}
  ])

  return (
    <Container>
      <Ul>
        {todos && 
        todos.map((todo, index) => (
          <Li
          key={index}
          index={index}
          todo={todo}
          />
        ))}
      </Ul>
    </Container>
  )
}

export default Home

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
const Li = styled(Todo)`
  margin: 13px;
  font-size: 1.4em; 
`

const Ul = styled.ul`
  list-style-type: none;
`