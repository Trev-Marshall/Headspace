import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS1 } from '../Design/Constants';
import PersonIcon from '@material-ui/icons/Person';
import Ellipse from '../assets/images/Ellipse 2.png'

const Navbar = ({handleLogout}) => {
    return (
      <>
    <Nav>
      <NavLink to="/">
        <h1
        style={{fontWeight: 400}}
        >Headspace</h1>
      </NavLink>

      {/* <NavBtn>
        <NavBtnLink onClick={handleLogout}>Logout</NavBtnLink> */}
      <NavMenu>
        <NavLink to="/profile" >
          <PersonIcon
          style={{fill: COLORS1.off_white}}
          />
        </NavLink>
      </NavMenu>
      {/* </NavBtn> */}
    </Nav>
      <NavImage
      src={Ellipse}
      />
      </>
  )
}

export default Navbar;

const Nav = styled.nav`
  background: ${COLORS1.main};
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  position: relative;
  z-index: 100;
`

const NavLink = styled(Link)`
  color: #014139;
  font-size: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`

const NavBtnLink = styled.button`
  border-radius: 4px;
  background: ${COLORS1.secondary_accent};
  padding: 10px 22px;
  font-weight: bold;
  font-size: 1.1em;
  color: white;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`

const NavImage = styled.img`
  position: absolute; 
  z-index: 0;
  right: 0;
  top: 0;
  height: 70px;
`