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
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      label: 'Tasks Initialized in Past Week',
      data: chartData,
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

  function Last7Days () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
    }
    return(result);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  Last7Days()

  const populateChartData = (tasksArr) => {
    const daysArr = Last7Days()
    console.log(daysArr)
    let result = []
    tasksArr.forEach((task) => {
      let tasksCompletedInADay = 0
      daysArr.forEach((day) => {
        if(task.dateCreated === day) {
          tasksCompletedInADay += 1
        }
      })
      result.push(tasksCompletedInADay)
    })
    setChartData(result)
  }

  useEffect(() => {
    axios.get('http://localhost:8000/profile-info/',  {
    headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }})
    .then(res => {
      setAll(res.data)
      // setChartData()
      console.log(res.data)
      // To populate the chart data the entire array of all the tasks are passed into the function below, this will get slower exponentially the more tasks a person adds. A fix for this is only passing in the tasks that have happened the last seven days which there is a function above that gets the last seven days that I'm not sure how to implement for it to be faster. Another way to fix this is to get the backend to get the last seven days which would be the easiest way, then pass another object in to then pass that object in to the function below.
      if(res.data.tasks != [] || res.data.tasks != undefined){
        populateChartData(res.data.tasks)
      }
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
              allStats.tasks.slice(0).reverse().map((task) => (
              <ListItem
              key={task.id}
              >
              {task.task} | <Span>{task.dateCreated}</Span>
            </ListItem>
              ))}
          </ScrollContainer>
        </TextStatsContainer>

        {/* Chart js */}
        {
          chartData &&
          <Line data={data} options={options} />
        }

        <TextStatsContainer>
          <Title>
            All Reflections
          </Title>
          <ScrollContainer>
            { allStats.reflections &&
              allStats.reflections.slice(0).reverse().map((reflection) => (
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
              allStats.goals.slice(0).reverse().map((goal) => (
              <ListItem
              key={goal.id}
              >
              {goal.goal} | <Span>{goal.dateCreated}</Span>
              {goal.completed && (
                <Checkmark>&#10003;</Checkmark>
              )}
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

  @media (max-width: 600px) {
    padding-top: 100px;
  }
`
const Linebro = styled.hr`
  width: 25%;
  margin: 0 auto;
  border: 1px solid #4CC9F0;
  margin-top: 10px;
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

const Checkmark = styled.span`
  padding-left: 10px;
`