import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { COLORS1 } from '../Design/Constants'

function Footer() {
  return (
    <Container>
      <FooterLink to="/">
        Tasks
      </FooterLink>
      <FooterLink to="/goals">
        Goals
      </FooterLink>
      <FooterLink to="/reflections">
        Reflections
      </FooterLink>
    </Container>
  )
}

export default Footer

const Container = styled.div`
  color: black;
  width: 100%;
  height: auto;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${COLORS1.off_white};
`

const FooterLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: color 250ms; 
  padding: 0 14px;
  font-size: 1.4em;

  @media (max-width: 900px) {
    font-size: 1.2em;
  }
  &:hover {
    color: ${COLORS1.bright_color};
  }
`