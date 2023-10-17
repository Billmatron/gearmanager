import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Body from '../components/Body'
import InventoryAddForm from '../components/forms/InventoryAddForm'

const InventoryAddFormPage = () => {

    
  return (
    <Body>
        <InventoryAddForm/>
    </Body>
    
  )
}

export default InventoryAddFormPage