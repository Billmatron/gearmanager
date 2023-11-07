import styled from "styled-components"
import {v, btnReset} from '../styles/variables'

export const SFooter = styled.footer`
    background-color: ${({theme}) => theme.accent};
    color:${({theme}) => theme.text};
    grid-area: footer;
    height: ${v.headerHeight};
    text-align: center;
    padding: 1rem;
    z-index: 2;
`
export const SShadow = styled.div`
   width: 100vw;
  box-shadow: 1px -5px 10px ${({theme})=>theme.boxShadow};
`


