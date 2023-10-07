import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Body from '../components/Body'


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
        <Body>
            <div>
                <p>{unit?.make[0].name} {unit?.name} {unit?.weight_g}</p>
            </div>
        </Body>
   
  )
}

export default UnitPage