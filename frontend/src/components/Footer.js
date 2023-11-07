import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {StyledFlexDiv, StyledDiv} from './styles/Containers.style'

import AuthContext from '../context/AuthContext'

export const StyledFooter = styled.footer`
    background-color: ${({theme}) => theme.accent};
    color:${({theme}) => theme.base};
    grid-area: footer;
    min-height: 50px;
    max-height: 100px;
    text-align: center;
    padding: 1rem;
    z-index: 2;
`
export const StyledShadow = styled.div`
  width: 100vw;
  box-shadow: 1px -5px 10px gray;
`

export const Footer = (props)=>{

    const {user, logoutUser }= useContext(AuthContext);

return(
    <StyledShadow>
        <StyledFooter>
           <p>Email Goes here</p>
        </StyledFooter>

    </StyledShadow>


)}
    