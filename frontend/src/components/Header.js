import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {StyledFlexDiv, StyledDiv} from './styles/Containers.style'
import AuthContext from '../context/AuthContext'


export const StyledMainHeader = styled.header`
  background-color: ${({theme})=>theme.colors.accent};
    color: ${({theme})=>theme.colors.base};
    /* position: fixed;
    top: 0;
    left: 0; */
 
    padding: 0.5rem;
    margin: auto;
    width: 100%;
    /* height: 60px; */  
    /* box-shadow: 5px 5px 10px gray; */
    z-index: 777;
   

  ${StyledFlexDiv}{
      flex-wrap: nowrap;

  }
    ul {
      display: flex;
      justify-content: end;
      padding-right: 1.5rem;
      list-style-type: none;
      overflow: hidden;
      background-color: ${({theme})=>theme.colors.accent};
    }

    ul > li {
      float: left;
    }
    ul > li > a{
      color: ${({theme})=>theme.colors.base};
      padding: 14px 16px;
      text-decoration: none;
    }





    /* x-small - cell phones */
    @media only screen and (max-width: 640px) {
        box-shadow: none;

      ${StyledFlexDiv}{
        flex-wrap: wrap;
        align-items: center;
      }
    }
`


export const StyledShadow = styled.div`
  width: 100vw;
  box-shadow: 5px 5px 10px gray;
`


export const Header = (props) => {
 
  //const user = useContext(UserContext);
  const {user, logoutUser }= useContext(AuthContext);
  
  return (
    <StyledShadow id={'styled-shadow'}>
      <StyledMainHeader id={props.id}>
        


        
          <StyledFlexDiv $justifyContent={'space-between'} id={'flex-container'}>

            <StyledDiv>
                {user? <h3>{user?.company}</h3>: <h3>GEAR MANAGER</h3>}
            </StyledDiv>

            <StyledDiv>
                <ul>
                    {user? 
                      <>
                    
                      <li><Link to={`/`}>Home</Link></li>
                      <li><Link to={`#`}>Account</Link></li>
                      <li><Link onClick={logoutUser}>Logout</Link></li>
                      </>:
                      
                      <>
                      <li><Link to={`/login`}>LogIn</Link></li>
                      <li><Link to={`#`}>Register</Link></li>
                      </>
                      
                  }
                  </ul>
              
            </StyledDiv>
    
            
          </StyledFlexDiv>
        
      </StyledMainHeader>
      </StyledShadow>
    
  )
}


export const StyledDataHeader = styled.header`

  background-color: ${({theme})=>theme.colors.body};
 



`
export const DataHeader = () =>{
  return(
    <StyledDataHeader/>)
}