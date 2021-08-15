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
          // index: 1
        },
      },
    ],
  },
};

function Profile({loginState, needsLocalStrgUpdateProfile, setLocalStrgUpdateProfile, setLoading}) {
  const [allStats, setAll] = useState([])
  const [chartData, setChartData] = useState([])
  const [chartLabels, setChartLabels] = useState([])


  const data = {
  labels: chartLabels,
  datasets: [
    {
      label: 'Tasks Initialized in Past Week',
      data: chartData,
      fill: false,
      backgroundColor: 'rgba(84, 206, 177, 1)',
      borderColor: 'rgba(84, 206, 177, 1)',
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
    setChartLabels(daysArr)
    let result = []
    for (let i = 0; i < daysArr.length; i++){
      let count = 0
      tasksArr.forEach((task) => {
        if(task.dateCreated == daysArr[i]){
          count += 1
        }
      })
      result.push(count)
    }
    result.reverse()
    setChartData(result)
  }

  useEffect(() => {
    if(needsLocalStrgUpdateProfile === false) {
      let stats = JSON.parse(localStorage.getItem('stats'))
      setAll(JSON.parse(localStorage.getItem('stats')))

      // Set chart data from local storage here
      if(stats.last7DaysOfTasks != [] || stats.last7DaysOfTasks != undefined){
          populateChartData(stats.last7DaysOfTasks)
        }
      setLoading(false)
    } else if (needsLocalStrgUpdateProfile) {
      axios.get('http://localhost:8000/profile-info/',  {
      headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }})
      .then(res => {
        setAll(res.data)
        localStorage.setItem('stats', JSON.stringify(res.data))
        // setChartData()
        if(res.data.last7DaysOfTasks != [] || res.data.last7DaysOfTasks != undefined){
          populateChartData(res.data.last7DaysOfTasks)
        }
        setLocalStrgUpdateProfile(false)
      })
      .catch(e => alert(e))
    }
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

        <TextStatsContainer>
        {/* Chart js */}
        {
          chartData &&
          <Line data={data} options={options} />
        }
        </TextStatsContainer>

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
  background-color: ${COLORS1.off_white};
`

const NameDiv = styled.div`
  color: #0E886B;
  height: 100px;
  width: fit-content;
  margin: 0 auto;
  padding-top: 20px;
  text-align: center;
  font-size: 2.5em;

  @media (max-width: 600px) {
    padding-top: 100px;
  }
`
const Linebro = styled.hr`
  width: 100%;
  margin: 0 auto;
  border: 2px solid #7CF6CA;
  margin-top: 10px;
`

const Title = styled.h3`
  text-align: center;
  color: ${COLORS1.dark_grey};
  padding-bottom: 10px; 
  border-bottom: solid 1px #0E886B;
  width: 80%;
  height: fit-content;
`

const TextStatsContainer = styled.div`
  background: #F7F7F7;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.17);
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
  margin-bottom: 20px;
`

const ListItem = styled.div`
  color: black;
  padding-top: 10px;
  padding-bottom: 10px;
  white-space: pre-wrap;
  border-bottom: 1px solid ${COLORS1.secondary_accent};
`
const Span = styled.span`
  color: #0E886B;
`

const Checkmark = styled.span`
  padding-left: 10px;
`