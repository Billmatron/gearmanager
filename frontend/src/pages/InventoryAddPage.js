import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import Body from '../components/Body'

const InventoryAddPage = () => {

    const [types, setTypes] = useState()
    const [subtypes, setSubtypes] = useState(['nothing'])
    

    useEffect(() => {
        async function fetchData(){
            let response = await fetch("/api/gear/types")
            let data = await response.json()
            if(response.status === 200){
            
                setTypes(data)
          
            }

        }
        fetchData();
        
    }, [])
    


    const chooseType = (type) => {
        console.log("type chosen")
        console.log(type)
        setSubtypes(type.subtypes)

        console.log(type.subtypes)
    }




    function CardComponent(){
        return(
            
             <>
             {types?.map((type) => (
                    <Link key={type.id} onClick={e => chooseType(type)} className='card'>
                   
                    <div>
                        <h3>{type?.name}</h3>
                        <p>{type?.subtypes[0]?.name}</p>
                    </div>
                  
                    </Link>  
                ))}
           
             </>
                
        )
    }





  return (
    <Body>
        <div>
            <h2 className='text-center'>What are we looking to add?</h2>
        </div>
        <div className="display-flex wrap">
        <CardComponent/>
        </div>
        
            
    </Body>
   
  )
}

export default InventoryAddPage