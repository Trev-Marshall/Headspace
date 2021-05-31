import React from 'react'
import styled from 'styled-components'

function Home() {
  return (
    <Container>
      <Ul>
        <Li>Static list item</Li>
        <Li>Static list item</Li>
        <Li>Static list item</Li>
        <Li>Static list item</Li>
        <Li>Static list item</Li>
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
const Li = styled.li`
  margin: 13px;
  font-size: 1.4em; 
`

const Ul = styled.ul`
  list-style-type: none;
`