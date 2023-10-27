import React, {useState} from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'


export const StyledSidebar = styled.ol`
    flex: 0 0 10%;
    background-color: ${({theme})=>theme.colors.accent};
    box-shadow: 5px 0px 10px gray;
    padding-top: 2rem;

 
    
`


export const StyledSidebarItem = styled.li`
    display: flex;
    
    margin-top: 0.5rem;
    border-bottom: 1px solid ${({theme})=>theme.colors.base};
    padding: 1rem;
    align-items: center;
    justify-content: space-between;

    &:hover{
        
        label, i{
            color: ${({theme})=>theme.colors.action};
        }
    }
  
    & label {
        color: ${({$active}) => $active ? ({theme})=>theme.colors.action : ({theme})=>theme.colors.base};
        width: 100%;
        font-size: larger;
        font-weight: 600;
    }

    & i {
        color:${({$active}) => $active ? ({theme})=>theme.colors.action : ({theme})=>theme.colors.base};
    }

    
`



export const SideBarLabel = (props)=>{
    
    return (
       
            <Link to={props.href} onClick={props.onClick}>
            <StyledSidebarItem $active={props.$active}>
                
                <div>
                    <i className='material-icons'>{props.icon}</i>
                </div>
                <div>
                    <label>{props.text}</label>
                </div>
            
        </StyledSidebarItem>
        </Link>
    )



}
export const Sidebar = (props)=>{
   const [active, setActive] = useState()
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