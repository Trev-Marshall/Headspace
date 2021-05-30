import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    return (
    <Nav>
      <NavLink to="/">
        <h1>Logo</h1>
      </NavLink>

      <NavMenu>
        <NavLink to="/profile" activeStyle>
          Profile
        </NavLink>
        <NavLink to="/logo" activeStyle>
          Logo
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/signin">Sign In</NavBtnLink>
      </NavBtn>
    </Nav>
  )
}

export default Navbar;

const Nav = styled.nav`
  background: #000;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
`

const NavLink = styled(Link)`
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
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

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
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
