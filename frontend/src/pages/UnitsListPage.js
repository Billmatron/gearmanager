import React, {useState, useEffect} from 'react'
import {ListItem} from '../components/ListItem'



const UnitsListPage = () => {

    let [units, setUnits] = useState([])
    
    useEffect(() => {
        getUnits()
    }, [])

    let getUnits = async () => {
        
        let response = await fetch("/api/gear/units/")
        let data = await response.json()
        console.log(data)
        setUnits(data)
    }



  return (

         <div>
       
       <div className="units-list">
           {units.map((unit, index) => (
          
               <ListItem key={index} item={unit}/>
           ))}
       </div>


   </div>
    
   
  )
}

export default UnitsListPage