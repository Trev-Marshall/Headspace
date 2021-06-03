import React from 'react'
import styled from 'styled-components'

function PageHeading({value}) {
  return (
    <H1>
      {value}
    </H1>
  )
}

export default PageHeading

const H1 = styled.h1`
  opacity: .8;
  font-size: 4em;
`