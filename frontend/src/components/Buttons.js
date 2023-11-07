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


export const StyledSaveButton = styled.button`
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: ${({theme})=>theme.action};
    color: ${({theme})=>theme.base};
    box-shadow: 2px 2px 5px gray;
    border: none;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 0.5rem;
    margin-bottom: 0.2rem;

    &:hover{
        cursor: pointer;
        transform: scale(1.2);
    }
`

export const StyledDiscardButton = styled.button`
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: ${({theme})=>theme.body};
    
    box-shadow: 2px 2px 5px gray;
    border: ${({theme})=>theme.accent};
    position: absolute;
    bottom: 0;
    right: 1;
    margin-right: 0.5rem;
    margin-bottom: 0.2rem;

    &:hover{
        cursor: pointer;
        transform: scale(1.2);
    }
`
export const StyledToolBarButton = styled.button`
    height: 100%;
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

export const ToolBarButton = ({link, label, id, onClick})=>{
    return (
        <div id={id} onClick={onClick}>
                <Link to={link}><StyledToolBarButton>{label}</StyledToolBarButton></Link>
        </div>
        
    )
    
}
