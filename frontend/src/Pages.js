import React from 'react'
import {Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

import UnitsListPage from './pages/UnitsListPage'
import UnitPage from './pages/UnitPage'
import InventoryListPage from './pages/InventoryListPage'
import InventoryItemPage from './pages/InventoryItemPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import InventoryAddFormPage from "./pages/InventoryAddFormPage";




const Pages = () => {
  return (
    

        <Routes>
            <Route exact path = "/login"  element={<LoginPage />}/>
            <Route exact path = "/"  element={<PrivateRoute />}>

              <Route exact path = "/"  element={<HomePage />}/>
              <Route exact path="/units"  element={<UnitsListPage/>}/>
              <Route exact path="/units/:id" element={<UnitPage/>}/>
              <Route exact path="/inventory"  element={<InventoryListPage/>}/>
              <Route exact path="/inventory/:id"  element={<InventoryItemPage/>}/>
              <Route exact path="/inventory/add"  element={<InventoryAddFormPage/>}/>
            
            </Route> 

    </Routes>

   


    

  )
}

export default Pages


