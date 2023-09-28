import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ListItem from '../components/ListItem'

const ModelsListPage = () => {

    let [models, setModels] = useState([])
    
    useEffect(() => {
        getModels()
    }, [])

    let getModels = async () => {
        
        let response = await fetch("/api/inventory/models/")
        let data = await response.json()
        console.log(data)
        setModels(data)
    }



  return (
    <div>
     
        <div className="models-list">
            {models.map((model, index) => (
                <ListItem key={index} item={model}/>
            ))}
        </div>

    </div>
  )
}

export default ModelsListPage