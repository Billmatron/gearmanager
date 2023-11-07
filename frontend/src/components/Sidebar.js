import React, {useState} from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {useWindowSize} from '../hooks/WindowSize'


export const StyledSidebarItem = styled.li`
    display: flex;
    
    margin-top: 0.5rem;
    border-bottom: 1px solid ${({theme})=>theme.base};
    padding: 1rem;
    align-items: center;
    justify-content: space-between;

    &:hover{
        
        label, i{
            color: ${({theme})=>theme.action};
        }
    }
  
    & label {
        color: ${({$active}) => $active ? ({theme})=>theme.action : ({theme})=>theme.base};
        width: 100%;
        font-size: larger;
        font-weight: 600;
    }

    & i {
        color:${({$active}) => $active ? ({theme})=>theme.action : ({theme})=>theme.base};
    }

    
`
export const StyledSidebar = styled.ol`
    /* flex: 0 0 10%; */
    background-color: ${({theme})=>theme.accent};
    box-shadow: 5px 0px 10px gray;
    padding-top: 2rem;
    width: 200px;
    z-index: 888;


     /* x-small - cell phones */
     @media only screen and (max-width: 640px) {
        width:100%;
        height: auto;
        position: relative;
        display: flex;
        justify-content: space-evenly;
        padding-top: 0;
        box-shadow: 5px 5px 10px gray;
        
        ${StyledSidebarItem}{
           
            float:left;
            margin-top: 0px;
            padding: 1rem;
            border-bottom: none;
            
        }
    }


    /* small devices - large phones */
    @media only screen and (min-width: 641px) and (max-width: 768px) {
       width: 10%;

       label {
        display: none;
       }

    }

    /* Medium - tablets */
    @media only screen and (min-width: 769px) and (max-width: 1060px) {
        width: 10%;
        
        ${StyledSidebarItem}{
            display: block;
            text-align: center;
            justify-content: space-evenly;
            

            label {
            font-size: normal;
            font-weight: 400;
        }
        }
       
    }

    /* Large - laptons */
    @media only screen and (min-width: 1061px) {
        
       width: 200px
    }

  
 
`






export const SideBarLabel = (props)=>{
    
    return (
       
            <Link to={props.href} onClick={props.onClick}>
            <StyledSidebarItem $active={props.$active}>
                
                <div>
                    <i className='material-icons'>{props.icon}</i>
                </div>
                {props.$screenWidth > 640 &&
                    <div>
                    <label>{props.text}</label>
                </div>
                }
                
            
        </StyledSidebarItem>
        </Link>
    )



}
function ShowWindowDimensions(props) {
    const [width, height] = useWindowSize();
    return <span>Window size: {width} x {height}</span>;
  }

export const Sidebar = (props)=>{
   const [active, setActive] = useState()
   const [width, height] = useWindowSize();
   const navigate = useNavigate()

   
    
   function sidebarClick(href, name){
        setActive(name)
        navigate(href)
    }

    let categories = [{name:'Inventory', icon:'inventory_2', href:'/inventory'},
                    {name:'Quotes', icon:'request_quote', href:'#'},
                    {name: 'Clients', icon:'group', href:'#'},
                    {name: 'Invoices', icon:'payments', href:'#'}]
    
    
    
    return(
        
        <StyledSidebar id={props.id}>

            {categories.map((item)=>{
                let activeSetting = false;
                {item.name === active ? activeSetting=true: activeSetting=false}
                return(
                <SideBarLabel
                    $screenWidth={width}
                    onClick={()=>sidebarClick(item.href, item.name)}
                    $active={activeSetting}
                    key={item.name}
                    icon={item.icon}
                    text={item.name}
                    href={item.href}/>
                
            )})}
        </StyledSidebar>
    )
}