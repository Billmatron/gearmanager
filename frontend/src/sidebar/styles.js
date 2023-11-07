import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {v, btnReset} from '../styles/variables'

export const SDivider = styled.div`
    height: 1px;
    width: 100%;
    margin: auto;
    margin-top: ${v.mdSpacing};
    margin-bottom: ${v.mdSpacing};
    background-color: ${({ theme })=> theme.base};
`
export const SSidebar = styled.div`
    width: ${({$isOpen})=> !$isOpen ? `auto`:v.sidebarWidth};
    background-color: ${({theme}) => theme.accent};
    height: 100vh;
    padding: ${v.lgSpacing};
    color: ${({theme})=> theme.base};
    box-shadow: 5px 5px 10px ${({theme})=>theme.boxShadow};
    position: relative;
    z-index: 888;
    border: none !important;

    @media only screen and (max-width: 800px){
        position: absolute;
        top: calc(${v.headerHeight} - 1px);
        left: 0;
        height:auto;
  }
    `

export const SSidebarButton = styled.button`
    ${btnReset};
    position: absolute;
    top: ${v.xxlSpacing};
    right: ${({ $isOpen })=> ($isOpen ? `-16px`:`-16px`)};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${({theme})=>theme.accent};
    box-shadow: 0 0 4px ${({theme})=>theme.boxShadow};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;

    transform: ${({$isOpen})=> !$isOpen ? `rotate(180deg)`: `initial`};

`
export const SLogo = styled.div`
    margin: auto;
    width: 35%;
    cursor: pointer;
    margin-bottom: ${v.lgSpacing};

    img {
        max-width: 100%;
        height: auto;
    }
    
   

`

export const SLinkContainer = styled.div`
    text-align: end;
    background: transparent;
    border-radius: ${v.borderRadius};
    margin: 8px 0;
    color: ${({$active}) => $active ? ({theme})=>theme.action : ({theme})=>theme.base};

    & :hover {
        a{
            box-shadow: inset 0 0 0 1px ${({ theme })=> theme.body}
        }
        span, div {
            color: ${({ theme })=>theme.action};
        }
    }


`


export const SLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 25px;
    padding: calc(${v.smSpacing} -2px) 0;

`

export const SLinkIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;

    svg {
        font-size: 25px;
    }
`

export const SLinkLabel = styled.span`
    display: block;
    flex: 1;
    
    margin-left: ${v.smSpacing};
`

export const SLinkNotification = styled.div`
    font-size: 14px;
    padding: calc(${v.smSpacing} /2) ${v.smSpacing};
    border-radius: calc(${v.borderRadius / 2});
    background-color: ${({ theme })=> theme.accent};
    color: white;
    
    margin-right: ${v.mdSpacing};
`



export const STheme = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
`

export const SThemeLabel = styled.span`
    flex: 1;
    display: block;
`

export const SThemeToggler = styled.button`
    ${btnReset}
    margin: 0 auto;
    cursor: pointer;
    width: 36px;
    height: 20px;
    border-radius: 10px;
    background-color: ${({theme, $isActive})=> !$isActive ? theme.base: 'black'};
    position: relative;

`

export const SToggleThumb = styled.div`
    height: 18px;
    width: 18px;
    position: absolute;
    top: 1px;
    bottom: 1px;
    transition: .2s ease right;
    right: cald(100% - 18px - 1px);
    border-radius: 50%;
    background-color: green;
    ;
`

