import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'
import NavBar from './Components/NavBar'
import TodoList from './Components/TodoList'
import Footer from './Components/Footer'
import styled from 'styled-components'
import Signin from './Components/Signin';
import { COLORS1 } from './Design/Constants'
import Profile from './Components/Profile';
import Goals from './Components/Goals'
import Reflections from './Components/Reflections'
import Signup from './Components/Signup'

function App() {
  const [loginState, setLogin] = useState({
    displayedForm: '',
    logged_in: localStorage.getItem('token') ? true : false,
    username: ''
  })

  useEffect(() => {
    if (loginState.logged_in) {
      fetch('http://localhost8000/core/current_user/', {
        headers: {
          Authoriization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setLogin({ username: json.username })
        })
    }
  }, [])

  const handleLogin = (e, data) => {
    e.preventDefault()
    fetch('http://localhost8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json)
      .then(json => {
        localStorage.setItem('token', json.token);
        setLogin({
          logged_in: true,
          displayedForm: '',
          username: json.user.username
        })
      })
  }

  const handleSignup = (e, data) => {
    e.preventDefault()
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token)
        setLogin({
          logged_in: true,
          displayedForm: '',
          username: json.username
        })
      })
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLogin({ logged_in: false, username: '' })
  }

  const displayForm = form => {
    setLogin({
      displayedForm: form
    })
  }

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin handleLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <Signup handleLogout={handleSignup} />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/goals">
          <Goals />
        </Route>
        <Route path="/reflections">
          <Reflections />
        </Route>
        <Route path="/">
          <NavBar handleLogout={handleLogout} />
          <Container>
            <TodoList />
            <Footer />
          </Container>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  background-color: ${COLORS1.secondary_main};
`