import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { COLORS1 } from '../Design/Constants'

function Footer() {
  return (
    <Container>
      <FooterLink to="/reflections">
        Reflections
      </FooterLink>
      <FooterLink to="/goals">
        Goals
      </FooterLink>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  color: white;
  width: 100%;
  text-align: right;
  padding-bottom: 20px;
`

const FooterLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: color 250ms; 
  padding-right: 27px;
  font-size: 1.4em;


  &:hover {
    color: ${COLORS1.bright_color};
  }
`