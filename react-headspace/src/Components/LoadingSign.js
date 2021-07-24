import React from 'react'
import styled from 'styled-components'
import loading from '../assets/images/loading-buffering.gif'

function LoadingSign() {
  return (
    <Container>
      <Img src={loading} alt="loading" />
    </Container>
  )
}

export default LoadingSign

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`
const Img = styled.img`
  height: 20px;
  width: 20px;
  padding-top: 5px;
  padding-left: calc(100% - 25px)
`