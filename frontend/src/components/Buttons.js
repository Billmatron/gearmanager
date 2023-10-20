import React from 'react'

let NextButton = ({onClick, title, classAdd}) =>{
    return(
        <div className="text-center mt1">
            <button className={`next-button ${classAdd}`} onClick={onClick}>
                {title}
            </button>
        </div>
        )
}






export {NextButton}