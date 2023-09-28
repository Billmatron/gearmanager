import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

const ModelPage = () => {
    
    let { id } = useParams()
    let [model, setModel] = useState(null)
    
    useEffect(() => {
        getModel()
        
    }, [])

    let getModel = async () => {
        let response = await fetch(`/api/inventory/models/${id}`)
        let data = await response.json()
        console.log(data)
        setModel(data)
    }

    return (
    <div>
        
        <p>{model?.make[0].name} {model?.name} {model?.weight_g}</p>
    </div>
  )
}

export default ModelPage