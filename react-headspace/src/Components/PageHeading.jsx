import React from 'react'
import styled from 'styled-components'
import { COLORS1 } from '../Design/Constants'

function PageHeading({value, headingSizeEm}) {
  return (
    <H1 style={{fontSize: headingSizeEm}}>
      {value}
    </H1>
  )
}

export default PageHeading

const H1 = styled.h1`
  position: relative;
  opacity: .8;
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-top: 6px solid ${COLORS1.bright_color};
    border-left: 6px solid ${COLORS1.bright_color};
  }
  &:after {
    content: '';
    position: absolute;
    right: -30px;
    bottom: -20px;
    width: 20px;
    height: 20px;
    background: transparent;
    border-bottom: 6px solid ${COLORS1.bright_color};
    border-right: 6px solid ${COLORS1.bright_color};
  }
`