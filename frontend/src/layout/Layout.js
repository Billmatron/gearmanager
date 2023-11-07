import React from 'react'
import { useContext, useState, useEffect} from "react";
import DisplayContext from '../context/DisplayContext'
import {SLayoutFixedHeader, SLayoutSidebarBody, SMain} from './styles'
import {Header} from '../header/Header'
import {Sidebar} from '../sidebar/Sidebar'
import {Footer} from '../components/Footer'


const Layout = ({children}) => {
  
  const {width, height} = useContext(DisplayContext)
  const [sidebarActive, setSidebarActive] = useState(width>801? true:false)
  const [toggled, setToggled] = useState(false)

  useEffect(()=>{
    if (width <=800){
      setSidebarActive(false)
    } 
    if (!toggled && width>801){
      setSidebarActive(true)
    }
    
  }, [width])


  function toggleSidebar(){
    setSidebarActive(!sidebarActive)
    setToggled(!toggled)
   
  }

  

  return (
   
    <SLayoutFixedHeader>
        <Header id={'header'} sidebarFunction={toggleSidebar} sidebarActive={sidebarActive}/>
        <SLayoutSidebarBody id={'body-sidebar'}>
          
          {sidebarActive && <Sidebar screenWidth={width} id={'sidebar'}/>}
          <SMain id={'main'}>{children}</SMain>

        </SLayoutSidebarBody>
        <Footer />
    </SLayoutFixedHeader>

 
    
  )
}

export default Layout