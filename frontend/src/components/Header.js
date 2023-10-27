import React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
    box-shadow: 5px 5px 10px gray;
    z-index: 999;
   ;
`
export const Header = (props) => {
 
  //const user = useContext(UserContext);
  const {user, logoutUser }= useContext(AuthContext);
  
  return (
    
      <StyledMainHeader id={props.id}>
  
          <div className="navflex">
            <div>
              {user? <p>{user?.company}</p>: <h3>GEAR MANAGER</h3>}
              
            </div>
            <div>
              <ul className='navbar-links'>
                {user? 
                <>
                <li><Link to={`/inventory`}>Inventory</Link></li>
                <li><Link to={`/units`}>All Gear</Link></li>
                <li><Link to={`/`}>Home</Link></li>
                </>:<li></li>
              }
                
                
                {user ? <li><Link onClick={logoutUser}>Logout</Link></li>: <li><Link to={`/login`}>LogIn</Link></li>}
              </ul>
            </div>
          </div>

      </StyledMainHeader>
    
  )
}


export const StyledDataHeader = styled.header`
  background-color: ${({theme})=>theme.colors.body};
 
`
export const DataHeader = () =>{
  return(
    <StyledDataHeader/>)
}