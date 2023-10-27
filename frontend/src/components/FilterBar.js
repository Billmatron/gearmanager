import React from 'react'
import styled from 'styled-components'
// import {StyledFilterBar} from './styles/FilterBar.style'


export const StyledFilterBar = styled.div`
    display: flex;
    grid-area: ${props=>props.$gridArea};
    

`

export const FilterBar = ({gridArea, children})=>{
    return( 
        
         <StyledFilterBar $gridArea={gridArea}>
        {children}
        </StyledFilterBar>
        
   
    )
    
}