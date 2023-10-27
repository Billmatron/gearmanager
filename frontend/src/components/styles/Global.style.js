import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: whitesmoke;
}
    
a {
    text-decoration: none !important;
    cursor: pointer !important;
}   
`