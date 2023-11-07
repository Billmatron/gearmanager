import React from 'react'
import { useContext } from "react";
import styled from 'styled-components'

import {SFooter, SShadow} from './styles'
import AuthContext from '../context/AuthContext'


export const Footer = (props)=>{
const {user, logoutUser }= useContext(AuthContext);

return(
    <SShadow>
        <SFooter>
           <p>Email Goes here</p>
        </SFooter>

    </SShadow>


)}
    