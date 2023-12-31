import React from 'react'
import styled from 'styled-components'

export const StyledCard = styled.div`
    background-color: ${({theme})=>theme.base};
    
    color: ${({theme})=>theme.accent};
    margin-top: 1rem;
    padding: 1rem;
    height: 100%;
    display: block;
    text-align: center;
    border-radius: 1rem;
    box-shadow: 5px 10px 20px gray;
    border: 1px solid ${({theme})=>theme.accent};
    grid-area: ${props=>props.$ga};
    position: relative;
    
`


export const StyledFormContainer = styled.div`
    background-color: ${({theme})=>theme.body};
    margin: 50px 100px; 
`


export const StyledCardTitle = styled.h4`
    margin-bottom: 1rem;
    color: ${({theme})=>theme.accent};
`

export const StyledCardError = styled.span`
    color: red;
`