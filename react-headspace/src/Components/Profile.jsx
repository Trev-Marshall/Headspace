import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {COLORS1} from '../Design/Constants'
import BackButton from './BackButton'
import axios from 'axios'
import {Line} from 'react-chartjs-2'



const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function Profile({loginState}) {
  const [allStats, setAll] = useState([])
  const [chartData, setChartData] = useState([])

  const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Tasks Initialized in Past Week',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

  useEffect(() => {
    axios.get('http://localhost:8000/profile-info/',  {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then(res => {
      setAll(res.data)
      // setChartData()
      console.log(res.data)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <Container>
      <BackButton />
      <NameDiv>
        {loginState.username}'s Space
        <Linebro />
      </NameDiv>

      <MainWrapper>
        <TextStatsContainer>
          <Title>
            All Tasks
          </Title>
          <ScrollContainer>
            { allStats.tasks &&
              allStats.tasks.map((task) => (
              <ListItem
              key={task.id}
              >
              {task.task} | <Span>{task.dateCreated}</Span>
            </ListItem>
              ))}
          </ScrollContainer>
        </TextStatsContainer>

        {/* Chart js */}
        <Line data={data} options={options} />

        <TextStatsContainer>
          <Title>
            All Reflections
          </Title>
          <ScrollContainer>
            { allStats.reflections &&
              allStats.reflections.map((reflection) => (
              <ListItem
              key={reflection.id}
              >
              {reflection.reflection} | <Span>{reflection.dateCreated}</Span>
            </ListItem>
              ))}
          </ScrollContainer>
        </TextStatsContainer>

        <TextStatsContainer>
          <Title>
            All Goals
          </Title>
          <ScrollContainer>
            { allStats.goals &&
              allStats.goals.map((goal) => (
              <ListItem
              key={goal.id}
              >
              {goal.goal} | <Span>{goal.dateCreated}</Span>
            </ListItem>
              ))}
          </ScrollContainer>
        </TextStatsContainer>
      </MainWrapper>

    </Container>
  )
}

export default Profile

const Container = styled.div`
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${COLORS1.secondary_main};
`

const NameDiv = styled.div`
  color: ${COLORS1.secondary_accent};
  height: 100px;
  width: 100%;
  margin: 0;
  padding-top: 20px;
  text-align: center;
  font-size: 2.5em;
`
const Linebro = styled.hr`
  width: 25%;
  margin: 0 auto;
  border: 1px solid #4CC9F0;
`

const Title = styled.h3`
  text-align: center;
  color: ${COLORS1.bright_color};
  padding-bottom: 10px; 
  border-bottom: solid 1px #4CC9F0;
  width: 80%;
  height: fit-content;
`

const TextStatsContainer = styled.div`
  background-color: ${COLORS1.main};
  box-sizing: border-box;
  width: 100%;
  min-height: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
`

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: 0 auto;
`

const ScrollContainer = styled.div`
  overflow-y: auto;
  position: relative; 
  max-height: 300px;
  width: 80%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ListItem = styled.div`
  color: white;
  padding-bottom: 10px;
`
const Span = styled.span`
  color: ${COLORS1.bright_color};
`