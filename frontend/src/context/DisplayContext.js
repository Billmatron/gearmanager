import React from 'react'
import { createContext, useState, useEffect } from 'react';
import {useWindowSize} from '../hooks/WindowSize'


const DisplayContext = createContext()

export default DisplayContext


export const DisplayProvider = ({children}) =>{
    const [width, height] = useWindowSize()

    let contextData = {
        width: width,
        height: height,
    }

    return(
        <DisplayContext.Provider value={contextData}>
            {children}
        </DisplayContext.Provider>
    )
}