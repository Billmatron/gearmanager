import React from 'react'
import {Routes, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import InventoryPage from './pages/InventoryPage'
import KitPage from './pages/KitPage'
import QuotePage from './pages/QuotePage'
import ClientPage from './pages/ClientPage'
import InvoicePage from './pages/InvoicePage'
import SettingsPage from './pages/SettingsPage'
import AccountPage from './pages/AccountPage'





const Pages = () => {
  return (
    

        <Routes>
            <Route exact path = "/login"  element={<LoginPage />}/>
            <Route exact path = "/register"  element={<RegisterPage />}/>
            <Route exact path = "/"  element={<PrivateRoute />}>

              <Route exact path = "/"  element={<HomePage />}/>
              
             
              <Route exact path="/inventory"  element={<InventoryPage/>}/>
              <Route exact path="/kits"  element={<KitPage/>}/>
              <Route exact path="/quotes"  element={<QuotePage/>}/>
              <Route exact path="/clients"  element={<ClientPage/>}/>
              <Route exact path="/invoices"  element={<InvoicePage/>}/>
              <Route exact path="/settings"  element={<SettingsPage/>}/>
              <Route exact path="/account"  element={<AccountPage/>}/>
             
             
            
            </Route> 

    </Routes>

   


    

  )
}

export default Pages


