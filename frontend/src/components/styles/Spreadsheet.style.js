import styled from 'styled-components'
import {v, btnRest} from '../../styles/variables'


export const SBody = styled.div`
    
    flex: auto;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
   
    & ::-webkit-scrollbar {display:none;}
    
`


export const SHeaderColumn = styled.div`
    background-color: ${({$active}) => $active ? ({theme})=>theme.accent : ({theme})=>theme.base};
    color: ${({$active}) => $active ? ({theme})=>theme.activeText : ({theme})=>theme.text};
    border: 1px solid black;
    border-left: none;
    text-align: ${({$number})=> $number? 'center': 'left' };
    overflow-y: hidden;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    font-size: 12px;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem; 
    padding-left:${({$number})=> $number? '0rem': '0.3rem' };
    grid-area: ${props=>props.$gridArea};

    @media screen and (max-width:800px){
        font-size: 10px;
        
    }
`



export const SHeaderRow = styled.div`
    
    display: grid;
    /* padding: 0.2rem; */
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-left: 1px solid black;
    grid-template-columns: repeat(24, 1fr);
    grid-template-areas: 
        "qty category category category category name name name name name name name date date weight weight price price serial serial serial serial rate rate";
    
     
     
`



export const SColumn = styled.div`

    /* border:1px solid black; */
    border-bottom: 1px solid ${({theme})=>theme.text};
    border-left:none;
    color: ${({theme})=>theme.text};
    text-align: ${({$number})=> $number? 'center': 'left' };
    overflow-y: hidden;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    font-size: 12px;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem; 
    padding-left:${({$number})=> $number? '0rem': '0.3rem' };
    grid-area: ${props=>props.$gridArea};
    


    input[type=number]{
        width: 100%;
        border: 1px solid black;
        font-size: 12px;
        text-align: center;
        height: 30px;
    }

    input[type=text]{
        width: 100%;
        height: 30px;
    }
    select{
        width:  ${({$selectWidth})=> $selectWidth? `${$selectWidth}%`: '100%' };
        height: 30px;
        font-size: 12px;
    }
    
    input[type=date]{
        width: 100%;
        height: 30px;
        font-size: 12px;
    }


    
`

export const SLabel = styled.div`
    display: flex;
    flex-wrap: wrap;
`



export const SWrapper = styled.div`
background: transparent;
    :hover{
        background-color: blue;
    }
`
export const SRow = styled.div`
    display: grid;
    /* padding: 0.2rem; */
    margin-top: 0.2rem;
    margin-bottom: 1rem;
    
    /* border-left: 1px solid black; */
    grid-template-columns: repeat(24, 1fr);
    grid-template-areas: 
    "qty category category category category name name name name name name name date date weight weight price price serial serial serial serial rate rate";
    
    &:hover{
        background-color: ${ ({theme})=>theme.base};
        color: ${({theme})=>theme.accent};
    }

    
   
`

export const SExpandedRow = styled.div`
    
    height: ${({$height}) => $height ? $height : '200px'};
    border: 1px solid black;
    background-color:${({theme})=>theme.base};
    position: relative;
    margin-bottom: 2rem;
    
    
    & ${SRow}{
        border-left: none;
    }
    & ${SColumn}{
        border: ${({$active}) => $active ? '1px solid black' : 'none'};
        /* border-left: none; */
        
    }
    
`



export const SSpreadsheetContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 50px; 
    overflow: scroll;
    height: 80vh;
    position: relative;
    
    /* medium */
    @media only screen and (min-width: 721px) and (max-width: 1060px) {
        margin: 20px 20px; 

       ${SHeaderRow}, ${SRow}{
        grid-template-columns: repeat(21, 1fr);
        grid-template-areas: 
        "qty category category category  name name name name name name date date weight weight price price serial serial serial rate rate";
       }
    }

    /* small */
    @media only screen and (min-width: 641px) and (max-width: 720px) {
        margin: 20px 10px; 

        ${SHeaderRow}, ${SRow}{
        grid-template-columns: repeat(19, 1fr);
        grid-template-areas: 
        "qty category category name name name name name date date weight weight price price serial serial rate rate";
       }
        span {
            display: none;
        }
    }

    /* small */
    @media only screen and (min-width: 451px) and (max-width: 640px) {
        margin: 20px 5px; 

        ${SHeaderRow}, ${SRow}{
        grid-template-columns: repeat(17, 1fr);
        grid-template-areas: 
        "qty category category  name name name name date date weight weight price price serial serial  rate rate";
       }
        span {
            display: none;
        }
    }
    /* x-small */
    @media only screen and (max-width: 450px) {
        margin: 20px 10px; 

        
        span {
            display: none;
        }
    }
`



