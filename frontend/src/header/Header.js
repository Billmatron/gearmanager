import React from 'react'
import { useContext, useEffect, useState } from "react";
import {useWindowSize} from '../hooks/WindowSize'
import AuthContext from '../context/AuthContext'
import styled from 'styled-components'
import {MdOutlineMenu, MdClear} from 'react-icons/md'
import {StyledFlexDiv, StyledDiv} from '../components/styles/Containers.style'
import {SMainHeader, SHeaderTitle, SSidebarButton, SLinkContainer,
        SLink, SLinkLabel, SShadow, SLinkNotification} from './styles'







export const Header = (props) => {
  
  const {user, logoutUser} = useContext(AuthContext)

  const linkArray = [{label:'Login', icon:"", to:"/login"},
                    {label:'Register', icon:"", to:"/register"}]

  return(
    <SShadow>
      <SMainHeader id={'main-header'}>
    
        <SSidebarButton onClick={props.sidebarFunction}>
          {props.sidebarActive ? <MdClear/>:<MdOutlineMenu/>}
        </SSidebarButton>

        <SHeaderTitle>{user?.company}</SHeaderTitle>

        <SLinkContainer>
          <SLink onClick={logoutUser}>
            <SLinkLabel>Quote</SLinkLabel>
            <SLinkNotification>5</SLinkNotification>
          </SLink>
        </SLinkContainer>

      </SMainHeader>
    </SShadow>
    
  )
}

// export const Header = (props) => {
 
//   //const user = useContext(UserContext);
//   const {user, logoutUser }= useContext(AuthContext);
  
//   return (
//     <StyledShadow id={'styled-shadow'}>
//       <StyledMainHeader id={props.id}>
        
//           <StyledFlexDiv $justifyContent={'space-between'} id={'flex-container'}>

//             <StyledDiv>
//                 {user? <h3>{user?.company}</h3>: <h3>GEAR MANAGER</h3>}
//             </StyledDiv>

//             <StyledDiv>
//                 <ul>
//                     {user? 
//                       <>
                    
//                       <li><Link to={`/`}>Home</Link></li>
//                       <li><Link to={`#`}>Account</Link></li>
//                       <li><Link onClick={logoutUser}>Logout</Link></li>
//                       </>:
                      
//                       <>
//                       <li><Link to={`/login`}>LogIn</Link></li>
//                       <li><Link to={`#`}>Register</Link></li>
//                       </>
                      
//                   }
//                   </ul>
              
//             </StyledDiv>
    
            
//           </StyledFlexDiv>
        
//       </StyledMainHeader>
//       </StyledShadow>
    
//   )
// }


export const StyledDataHeader = styled.header`

  background-color: ${({theme})=>theme.body};
 



`
export const DataHeader = () =>{
  return(
    <StyledDataHeader/>)
}