import React from 'react'
import {StyledCard, StyledCardTitle, StyledCardError} from './styles/Card.style'
let InstructionCard = (props) => {
    return (
        <div className="text-center col-5">
        <div className="mauto text-center">
            <h2>{props.title}</h2>
            <p>{props.step1}</p>
            <p>{props.step2}</p>
        </div>
    </div>
    )
    
}    

let FormCard = ({children, error, cardTitle}) =>{
    return (
        
        <StyledCard $ga='main'>
            <StyledCardTitle>{cardTitle}</StyledCardTitle>
            <StyledCardError>{error}</StyledCardError>
                
                {children}
                
        </StyledCard>
        
    )
}

export const CardTitle = () =>{
    return (
        <StyledCardTitle></StyledCardTitle>
    )
}

export {InstructionCard, FormCard}