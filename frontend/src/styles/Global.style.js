import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
* , *::before, *::after{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: ${({theme})=>theme.body};
    letter-spacing: .6px;
}
    
a {
    text-decoration: none !important;
    cursor: pointer !important;
}

::-webkit-scrollbar {display:none;}

p, menu, ol, hr, figure, dl, blockquote, ul, h1, h2, h3, h4, h5, h6 {
    margin-top: 0
}
`