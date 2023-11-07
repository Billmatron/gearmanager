import React from 'react'
import styled from 'styled-components'


export const StyledButton = styled.button`
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-radius: 5px;
    border: none;
    background-color: ${({theme})=>theme.accent};
    color: ${({theme})=>theme.base};
    /* box-shadow: 5px 5px 5px gray; */
`