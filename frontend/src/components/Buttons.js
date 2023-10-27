import React from 'react'
// import {StyledButton} from './styles/Button.style'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
export const NextButton = ({onClick, title, classAdd}) =>{
    return(
        <div className="text-center mt1">
            <button className={`next-button ${classAdd}`} onClick={onClick}>
                {title}
            </button>
        </div>
        )
}



export const StyledButton = styled.button`
    height: 100%;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-radius: 5px;
    border: none;
    background-color: ${({theme})=>theme.colors.accent};
    color: ${({theme})=>theme.colors.base};
    /* box-shadow: 5px 5px 5px gray; */
`

export const ToolBarButton = ({link, label, id})=>{
    return (
        <div id={id}>
                <Link to={link}><StyledButton>{label}</StyledButton></Link>
        </div>
        
    )
    
}
