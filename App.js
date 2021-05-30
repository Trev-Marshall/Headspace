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

function App() {
  return (
    <NavContainer>
      <Router>
        <NavBar />
      </Router>

      <Container className="App">
        <Home />
        <Footer />
      </Container>
    </NavContainer>
    
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`
const NavContainer = styled.div`
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`