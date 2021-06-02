import React from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'

function Profile() {
  return (
    <Container>
      <NameDiv>
        Kingz's Space
        <Line />
      </NameDiv>

      <CompletedTaskContainer>
        <Title>
          Completed Tasks
        </Title>
      </CompletedTaskContainer>

      <ReflectionHistoryContainer>
        <Title>
          Reflection History
        </Title>
      </ReflectionHistoryContainer>

      <CompletedGoalsContainer>
        <Title>
          Goals Reached
        </Title>
      </CompletedGoalsContainer>

    </Container>
  )
}

export default Profile

const Container = styled.div`
  justify-content: center;
  align-items: center;
  height: 110vh;
  background-color: ${COLORS1.secondary_main};
`

const NameDiv = styled.div`
  color: ${COLORS1.secondary_accent};
  height: 100px;
  width: 100%;
  margin: 0;
  text-align: center;
  font-size: 2.5em;
`
const Line = styled.hr`
  display: flex;
  width: 25%;
  margin: 0 auto;
  border: 1px solid #4CC9F0;
`
const CompletedTaskContainer = styled.div`
  background-color: ${COLORS1.main};
  border-radius: 20px;
  width: 400px;
  height: 300px;  
  margin: 0px 0px 10px;
`

const CompletedGoalsContainer = styled.div`
  background-color: ${COLORS1.main};
  border-radius: 20px;
  width: 400px;
  height: 300px;
  margin: -43% 0px 0px 72%;
`

const Title = styled.h3`
  text-align: center;
  color: ${COLORS1.bright_color};
`

const ReflectionHistoryContainer = styled.div`
  background-color: ${COLORS1.main};
  border-radius: 20px;
  width: 400px;
  height: 300px;  
`