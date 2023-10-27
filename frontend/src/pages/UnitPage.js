import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";


const UnitPage = () => {
    
    let { id } = useParams()
    let [unit, setUnit] = useState(null)
    
    

    let getUnit = async () => {
        let response = await fetch(`/api/gear/units/${id}`)
        let data = await response.json()
        console.log(data)
        setUnit(data)
    }

    useEffect(() => {
        getUnit()
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[])

    return (
       
            <div>
                <p>{unit?.make[0].name} {unit?.name} {unit?.weight_g}</p>
            </div>
        
   
  )
}

export default UnitPage