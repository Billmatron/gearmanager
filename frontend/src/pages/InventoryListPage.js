import React, {useState, useEffect, useContext} from 'react'
import Body from '../components/Body'
import {InventoryListItem} from '../components/ListItem'
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';




const InventoryListPage = () => {
    let [inventory, setInventory] = useState([]);
    let [types, setTypes] = useState(new Set())
    let [selectedType, setSelectedType] = useState("all");
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=>{ getInventory()}, []);

    let getInventory = async () => {
        let response = await fetch("/api/gear/inventory", {
                        method:'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + String(authTokens.access)
                        }})
        let data = await response.json()
        if(response.status === 200){
         
          setInventory(data)
        } else if(response.statusText === 'Unauthorized'){
          logoutUser()
        }
       
        


        //create set of types that are in inventory
        let tSet = new Set()
        data.forEach((item) => {
          tSet.add(item.unit.types[0].name)
        })

        setTypes(tSet)
    }


      
    
    // function to create new inventory state by filtering on selected type
    let typeSort = async (type) => {
     
      if (type === 'all'){
        getInventory()
      } else {
        let response = await fetch(`/api/gear/inventory/${type}`)
        let data = await response.json()
        
        setInventory(data);
      }
      setSelectedType(type);
    }



    
  return (
    <Body>
      {/* create a nav bar with buttons for type of inventory unit */}
      <div className="lower-header">
        <div className='form-grid'>
            <div><i className="fa fa-solid fa-baskeball"></i></div> 
            <input type="text" name="search-text" id="search-text" placeholder='Search' />
        </div>

        <div>
          <select name="types" id="types" onChange={e => typeSort(e.target.value)}>
            <option value="all">All</option>
            {Array.from(types).map((type, index) => (
              <option key={type} value={type} >{type}</option>
            ))}
          </select>
        </div>

        <div>
         <Link to="/inventory/add"><button>+</button></Link>
        </div>

      </div>
      
      {/* <div className="navflex">
        <button className={selectedType === 'all' ? "selected" : "unselected"} value='all' onClick={e => typeSort(e.target.value)}>All</button>
        {Array.from(types).map((type, index) => (
          <button className={selectedType === type ? "selected" : "unselected"} key={type} value={type} onClick={e => typeSort(e.target.value)}>{type}</button>
        ))}
      </div> */}

      {/* display a list of inventory units */}
      <div>
           {inventory.map((item, index) => (
            <InventoryListItem key={item.id} item={item}/>
           ))}
       
      </div>
      
    </Body>
    
  )
}

export default InventoryListPage