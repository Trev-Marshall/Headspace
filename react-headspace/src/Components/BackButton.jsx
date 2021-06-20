import React from 'react'
import styled from 'styled-components'
import { COLORS1 } from '../Design/Constants'
import {useHistory} from 'react-router-dom'

function BackButton() {
  const history = useHistory()

  return (
    <Button onClick={() => history.push('/')}>
      {'<'}
    </Button>
  )
}

export default BackButton

const Button = styled.button`
  position: absolute;
  top: 40px;
  left: 40px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 2.5em;
  cursor: pointer;
  transition: color 250ms ease;
  &:hover {
    color: ${COLORS1.secondary_accent};
  }
`