import React  from 'react'

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
        <div className="formCard-container invadd">
            <h4 className='card-title'>{cardTitle}</h4>
        <span className="error-message">{error}</span>
                {children}
                
        </div>
        
    )
}

export {InstructionCard, FormCard}