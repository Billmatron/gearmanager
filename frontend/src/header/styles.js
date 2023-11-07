import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {v, btnReset} from '../styles/variables'


export const SMainHeader = styled.header`
    background-color: ${({theme})=>theme.accent};
    color: ${({theme})=>theme.base};
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: 
        "menu title notification";
    align-items: center;
    padding: 0.5rem;
    width: 100%;
    height: ${v.headerHeight} ;
    
    z-index: 777;
    border: none !important;
   

    

    /* md - tablets */
    @media only screen and (max-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        grid-template-areas: 
            "menu . notification"
            " title title title"
            ;

        height: calc(${v.headerHeight} *1);

        span {
            font-size: 22px;
        }
      
        
    }
    
    /* x-small - cell phones */
    @media only screen and (min-width: 300px) and (max-width: 799px) {
        height: calc(${v.headerHeight} *1);

        span {
            font-size: 18px;
        }
    }
`


export const SShadow = styled.div`
  width: 100vw;
  box-shadow: 5px 5px 10px gray;
`

export const SHeaderTitle = styled.span`
    text-align: center;
    font-size: 30px;
    grid-area: title;

    @media only screen and (max-width: 799px) {
        display: none;
    }
`

export const SSidebarButton = styled.div`
 ${btnReset}
    margin-left: ${v.lgSpacing};
    grid-area: menu;
    svg {
        font-size: 50px;
    }

   
`



export const SLinkContainer = styled.div`
    text-align: end;
    background: transparent;
    border-radius: ${v.borderRadius};
    margin-right: ${v.lgSpacing};
    color: ${({$active}) => $active ? ({theme})=>theme.action : ({theme})=>theme.base};
    grid-area: notification;

    & :hover {
        a{
            box-shadow: inset 0 0 0 1px ${({ theme })=> theme.body}
        }
        span, div {
            color: ${({ theme })=>theme.action};
        }
    }

     /* med -tablets */
     @media only screen and (max-width: 800px) {
        span {
            font-size: 24px;
        }
        div {
            font-size: 12px;
        } 
        
    }

    @media only screen and (max-width: 400px) {
        span {
            font-size: 18px;
        }
        div {
            font-size: 10px;
        } 
        
    }


`


export const SLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    font-size: 25px;
    padding: calc(${v.smSpacing} -2px) 0;

`

export const SLinkIcon = styled.div`
    padding: ${v.smSpacing} ${v.mdSpacing};
    display: flex;

    svg {
        font-size: 25px;
    }
`

export const SLinkLabel = styled.span`
    display: block;
    flex: 1;
    
    margin-left: ${v.smSpacing};
`

export const SLinkNotification = styled.div`
    font-size: 15px;
    padding: calc(${v.smSpacing} /2) ${v.smSpacing};
    border-radius: calc(${v.borderRadius} *2);
    background-color: ${({ theme })=> theme.base};
    color: ${({ theme })=> theme.accent};
    
    margin-left: ${v.mdSpacing};
`








// export const SMainHeader = styled.header`
//     background-color: ${({theme})=>theme.accent};
//     color: ${({theme})=>theme.base};
    
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0.5rem;
//     margin: auto;
//     width: 100%;
//     height: ${v.headerHeight} ;
//     /* box-shadow: 5px 5px 10px gray; */
//     z-index: 777;
//     border: none !important;
   

 
//     ul {
//       display: flex;
//       justify-content: end;
//       padding-right: 1.5rem;
//       list-style-type: none;
//       overflow: hidden;
//       background-color: ${({theme})=>theme.accent};
//     }

//     ul > li {
//       float: left;
//     }
//     ul > li > a{
//       color: ${({theme})=>theme.base};
//       padding: 14px 16px;
//       text-decoration: none;
//     }


//     /* x-small - cell phones */
//     @media only screen and (max-width: 640px) {
//         box-shadow: none;

     
//     }
// `