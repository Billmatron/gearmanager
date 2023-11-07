
import React, {useState, useContext, useEffect} from 'react'

import {useLocation} from 'react-router-dom'

import {SSidebar, SLogo, SLinkContainer, 
        SLinkIcon, SLinkLabel, SLink,
         SDivider,
        STheme, SThemeLabel, SThemeToggler, 
        SToggleThumb, SSidebarButton} from './styles'
import {logoSVG} from '../assets'
import {MdOutlineInventory2, MdOutlineRequestQuote, 
        MdGroups, MdOutlineSettings, MdAccountBox,
        MdOutlineChevronLeft} from 'react-icons/md'

import { ThemeContext } from '../App'


//https://www.youtube.com/watch?v=zok804VWo5c


export const Sidebar = (props) => {
   
    const {setTheme, theme} = useContext(ThemeContext)
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [smallScreen, setSmallScreen] = useState(props.width <=800 ? true:false)
    const {pathname} = useLocation()
    

    useEffect(()=>{
        
        if (props.screenWidth <= 800){
            setSmallScreen(true)
            setSidebarOpen(true)
            
        } else if (props.screenWidth <=1000){
            setSidebarOpen(false)

        } else { setSidebarOpen(true)}
    }, [props.screenWidth])


    
    let linksArray = [{label:'Inventory', icon:<MdOutlineInventory2/>, to:'/inventory'},
                    {label:'Quotes', icon:<MdOutlineRequestQuote/>, to:'#'},
                    {label: 'Clients', icon:<MdGroups/>, to:'#'},
                    {label: 'Invoices', icon:<MdOutlineRequestQuote/>, to:'#'}]

    let secondaryLinksArray = [{label:'Settings', icon:<MdOutlineSettings/>, to:'/'},
                    {label:'Account', icon:<MdAccountBox/>, to:'#'},
                         ]
    return (
        <SSidebar id={props.id} $isOpen={sidebarOpen}>
            {!smallScreen &&
               
                <SSidebarButton $isOpen={sidebarOpen} onClick={()=>setSidebarOpen(!sidebarOpen)}>
                    <MdOutlineChevronLeft/>
                </SSidebarButton>
            
            }
            
            
            

                {linksArray.map(({label, icon, to})=>(
                    <SLinkContainer key={label} $active={pathname === to }>
                        <SLink to={to} style={!sidebarOpen ? {width: `fit-content`}:{}}>
                            <SLinkIcon>{icon}</SLinkIcon>
                            
                            {sidebarOpen && 
                                <SLinkLabel>{label}</SLinkLabel>
                            }
                            
                            
                        </SLink>
                    </SLinkContainer>
                ))}

                         
                <SDivider/>


                {secondaryLinksArray.map(({label, icon, to})=>(
                    <SLinkContainer key={label} $active={pathname === to}>
                        <SLink to={to} style={!sidebarOpen ? {width: `fit-content`}:{}}>
                            <SLinkIcon>{icon}</SLinkIcon>
                            {sidebarOpen &&
                                <SLinkLabel>{label}</SLinkLabel>
                            }
                            
                        </SLink>
                    </SLinkContainer>
                ))}

                <SDivider/>
                <STheme>
                    {sidebarOpen && 
                        <SThemeLabel>{theme === 'light' ? 'Light Mode':'Dark Mode'}</SThemeLabel>
                    }
                    <SThemeToggler 
                        $isActive={theme === 'dark'}
                        onClick={()=>{theme === 'light' ? setTheme('dark'): setTheme('light')}}>
                        
                        <SToggleThumb style={theme === 'dark' ? {right: "1px"}:{}}/>
                    </SThemeToggler>
                </STheme>
        </SSidebar>
    )
}

