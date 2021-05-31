import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import styled from 'styled-components'
import Signin from './Components/Signin';
import { COLORS1 } from './Design/Constants'

function App() {
  return (
    <Router>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/">
        <NavBar />
        <Container>
          <Home />
          <Footer />
        </Container>
      </Route>
    </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 55px);
  background-color: ${COLORS1.secondary_main};
`