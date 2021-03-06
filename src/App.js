import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
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
import LoadingSign from './Components/LoadingSign';
import SessionTimeout from './Components/SessionTimeout';


function App() {
  const [loginState, setLogin] = useState({
    logged_in: localStorage.getItem('token') ? true : false,
    username: ''
  })
  const [loading, setLoading] = useState(false)
  const [needsLocalStrgUpdateTasks, setLocalStrgUpdateTasks] = useState(true)
  const [needsLocalStrgUpdateGoals, setLocalStrgUpdateGoals] = useState(true)
  const [needsLocalStrgUpdateReflections, setLocalStrgUpdateReflections] = useState(true)
  const [needsLocalStrgUpdateProfile, setLocalStrgUpdateProfile] = useState(true)

  useEffect(() => {
    if (loginState.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setLogin({ username: json.username })
        })
    }

  }, [loginState.logged_in])

  const handleLogin = (e, data) => {
    e.preventDefault()
    setLoading(true)
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        if (json.non_field_errors) {
          let errors = ''
          json.non_field_errors.forEach((error) =>
            errors = errors + error + ' '
          )
          alert(errors)
        } else {
          localStorage.setItem('token', json.token);
          setLogin({
            logged_in: true,
            username: json.user.username
          })
        }

      })
  }

  const handleSignup = (e, data) => {
    setLoading(true)
    e.preventDefault()

    let pass = data.password
    if (isNaN(pass) && pass.length >= 8) {
      fetch('http://localhost:8000/core/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(json => {
          setLoading(false)
          if (json === undefined) {
            alert('Something went wrong please try again. An error occured when signing up.')
          } else if (json.username[0] === "A user with that username already exists.") {
            alert("A user with that username already exists.")
          } else if (json.username.isArray()) {
            let errorMessage = ''
            json.username.forEach((error) => {
              errorMessage = errorMessage + error + " "
            })
            alert(errorMessage)
          } else if (json) {
            localStorage.setItem('token', json.token)
            setLogin({
              logged_in: true,
              username: json.username
            })
          }
        })
    } else {
      alert('Password has the be longer than 8 characters and not totally numeric.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setLogin({ logged_in: false, username: '' })
  }

  return (
    <Router>
      <SessionTimeout isAuthenticated={loginState.logged_in} logOut={handleLogout} />
      {loginState.username ? (
        <Switch>
          <Route path="/profile">
            {loading &&
              <LoadingSign />
            }
            <NavBar handleLogout={handleLogout} />
            <Profile
              loginState={loginState}
              setLoading={setLoading}
              loading={loading}
              setLocalStrgUpdateProfile={setLocalStrgUpdateProfile}
              needsLocalStrgUpdateProfile={needsLocalStrgUpdateProfile}
            />
          </Route>
          <Route path="/goals">
            {loading &&
              <LoadingSign />
            }
            <NavBar handleLogout={handleLogout} />
            <Footer />
            <Goals
              setLoading={setLoading}
              setLocalStrgUpdateProfile={setLocalStrgUpdateProfile}
              setLocalStrgUpdateGoals={setLocalStrgUpdateGoals}
              needsLocalStrgUpdateGoals={needsLocalStrgUpdateGoals}
            />
          </Route>
          <Route path="/reflections">
            {loading &&
              <LoadingSign />
            }
            <NavBar handleLogout={handleLogout} />
            <Footer />
            <Reflections
              setLoading={setLoading}
              setLocalStrgUpdateProfile={setLocalStrgUpdateProfile}
              setLocalStrgUpdateReflections={setLocalStrgUpdateReflections}
              needsLocalStrgUpdateReflections={needsLocalStrgUpdateReflections}
            />
          </Route>
          <Route path="/">
            {loading &&
              <LoadingSign />
            }
            <NavBar handleLogout={handleLogout} />
            <Container>
              <Footer />
              <TodoList
                setLocalStrgUpdateTasks={setLocalStrgUpdateTasks}
                needsLocalStrgUpdateTasks={needsLocalStrgUpdateTasks}
                setLocalStrgUpdateProfile={setLocalStrgUpdateProfile}
                setLoading={setLoading} />
            </Container>
          </Route>
        </Switch>
      ) : (
        <Signin
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />
      )
      }
    </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  background-color: ${COLORS1.off_white};
`