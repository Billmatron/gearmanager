import React from 'react'
import { Link } from 'react-router-dom'



const ListItem = ({item}) => {
  
  return (
    <Link to={`/units/${item.id}`}>
        <h3>{item.name}</h3>
    </Link>
  )
}

// export default ListItem


const InventoryListItem = ({item}) => {
  
  return (
    
    <div className="inventory-grid-container">
      <input className="inventory-grid-item" type="number" name="quantity" id={`quantity${item.id}`} defaultValue={item.quantity} />
      {/* <div className="inventory-grid-item">{item.quantity}</div> */}
      <div className="inventory-grid-item slide-left"><Link to={`/inventory/${item.id}`}>{`${item.make.name} ${item.unit.name}`}</Link></div>
      <input className="inventory-grid-item" type="text" name="label" id="label" defaultValue={item.label} />
      <div className="inventory-grid-item">{`$${item.purchase_price/100}`}</div>
      
      <div className="inventory-grid-item serial-number">{item.serial_number}</div>
      <div className="inventory-grid-item">{`${item.unit.weight_g}g`}</div>
    </div>
   
  )
}

export {ListItem, InventoryListItem};
