import React from 'react'
import styled from 'styled-components'

export const StyledBody = styled.div`
    background-color: ${({theme})=>theme.colors.body};
    margin-top: 40px;
    padding: 0.5rem;
    padding-top: 2rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr 70% 1fr 1fr;
    grid-template-rows: 1fr auto minmax(100px, 200px) 1fr;
    grid-template-areas: 
        " left left main right right "
        " left left main right right"
        " left left space right right"
        " footer footer footer footer footer";
    
    
  `

  export const StyledContainer = styled.div`
    background-color: green;
    width: 100%;
    height: 100%;
    border: 2px solid red;
    /* display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 20px auto 20px;
    grid-template-rows: minmax(50px, 100px);
    grid-template-areas: 
        "left top left"
        "left main left"; */
    grid-area: main;
  `