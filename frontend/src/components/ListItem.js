import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {unixConvert} from '../utils/helpers'



const ListItem = ({item}) => {
  
  return (
    <Link to={`/units/${item.id}`}>
        <h3>{item.name}</h3>
    </Link>
  )
}

// export default ListItem


const InventoryListItem = ({inventory}) => {
  console.log(inventory)
 const [clicked, setClicked] = useState(false)
 const [sorted, setSorted] = useState({columnName: '', sortDirection:true}) // true means ascending, false means descending

 const columns = [{name:'quantity', label:'qty'},
                {name:'name', label:'Name'},
                {name:'create_ux', label:'Date Added'},
                {name:'label', label:'Label'},
                {name:'purchase_price', label:'Purchase Price'},
                {name:'serial_number', label:'Serial'},
                {name:'rate', label:'Rate'}]
  
  function handleGridClick(e){
      if(sorted.columnName === e.target.dataset.name){
        inventory = inventorySort(inventory, e.target.dataset.name)
      } else {
        inventory = inventorySort(inventory, e.target.dataset.name)
      }
      // have to change some state to get a re-render
      setSorted({columnName: e.target.dataset.name, sortDirection: !sorted.sortDirection})
      setClicked(!clicked)
      
    }

  function inventorySort(inventory, column_name){
    if (sorted.sortDirection){
      inventory.sort(function (a,b) {
        if (b[`${column_name}`] < a[`${column_name}`]){return -1}
        if (b[`${column_name}`] > a[`${column_name}`]){return 1}
        return 0
        
      });
      return inventory
    }
    inventory.sort(function (a,b) {
      if (a[`${column_name}`] < b[`${column_name}`]){return -1}
      if (a[`${column_name}`] > b[`${column_name}`]){return 1}
      return 0
      
    });
    return inventory
  }
    return (
      <>
      <div  className="inventory-grid-container">
          {columns.map((item, index)=>(
            <div key={index} onClick={handleGridClick} className={`inventory-grid-item ${item.name===sorted.columnName? 'selected':''}`} data-name={item.name}>{item.label}</div>
          ))}
          
            
      </div>

        {inventory?.map((item, index)=>(
          <div key={item.id} className="inventory-grid-container">
            <input className="inventory-grid-item" type="number" name="quantity" id={`quantity${item.id}`} defaultValue={item.quantity} />
            <div className="inventory-grid-item slide-left"><Link to={`/inventory/${item.id}`}>{item.name}</Link></div>
            <div className="inventory-grid-item">{unixConvert(item.create_ux)}</div>
            <input className="inventory-grid-item" type="text" name="label" id="label" defaultValue={item.label} />
            <div className="inventory-grid-item">{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</div>
            
            <div className="inventory-grid-item serial-number">{item.serial_number}</div>
            <div className="inventory-grid-item">{`$${(item.rate/100).toLocaleString('en-US')}/day`}</div>
          </div>
        ))}
      </>
    
    )
 
  
}

export {ListItem, InventoryListItem};
