import React from 'react';
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

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <Signin />
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
          <NavBar />
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