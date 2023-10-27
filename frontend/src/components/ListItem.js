import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {unixConvert} from '../utils/helpers'
import styled from 'styled-components'



const ListItem = ({item}) => {
  
  return (
    <Link to={`/units/${item.id}`}>
        <h3>{item.name}</h3>
    </Link>
  )
}

// export default ListItem

export const StyledGridRow = styled.div`
    display: grid;
    /* padding: 0.2rem; */
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-left: 1px solid black;
    grid-template-columns: repeat(12, 8%);
    grid-template-areas: 
        "qty name name name category category date label price serial serial rate";
  

`

export const StyledGridRowItem = styled.div`
   
    background-color: ${({$active}) => $active ? ({theme})=>theme.colors.accent : ({theme})=>theme.colors.base};
    color: ${({$active}) => $active ? ({theme})=>theme.colors.base : ({theme})=>theme.colors.accent};
    border: 1px solid black;
    border-left: none;
    text-align: ${({$number})=> $number? 'center': 'left' };
    overflow-y: hidden;
    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    font-size: small;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem; 
    padding-left:${({$number})=> $number? '0rem': '0.3rem' };
    grid-area: ${props=>props.$gridArea};
`




const InventoryListItem = ({inventory, quote}) => {
  
 const [clicked, setClicked] = useState(false)
 const [sorted, setSorted] = useState({columnName: '', sortDirection:true}) // true means ascending, false means descending

 const columns = [{name:'quantity', label:'qty', column:'qty'},
                {name:'name', label:'Name', column:'name'},
                {name:'create_ux', label:'Date Added', column:'date'},
                {name:'label', label:'Label', column:'label'},
                {name:'purchase_price', label:'Purchase Price', column:'price'},
                {name:'serial_number', label:'Serial', column:'serial'},
                {name:'rate', label:'Rate', column:'rate'},
                {name:'category', label:'Category', column:'category'}]
  
  function handleGridClick(e){
    // set it to run ascending then decending based on click amount
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
     {/* make top navigation row for spreadsheet look */}
      <StyledGridRow>
        {columns.map((item, index)=>{
          let active = false;
          {item.name === sorted.columnName ? active=true:active=false}
          
          return (
              <StyledGridRowItem
                    key={index}
                    $number={'true'}
                    onClick={handleGridClick}
                    data-name={item.name}
                    $gridArea={item.column}
                    $active={active}>
                      {item.label}
              </StyledGridRowItem>
            
            )})}
      </StyledGridRow>
          
          
            
   

        {inventory?.map((item, index)=>(

          <StyledGridRow key={item.id}>
            <StyledGridRowItem $gridArea={'qty'} $number={'true'}>{item.quantity}</StyledGridRowItem>
            <StyledGridRowItem $gridArea={'name'}>{item.name}</StyledGridRowItem>
            <StyledGridRowItem $gridArea={'category'}>{item.category}</StyledGridRowItem>
            <StyledGridRowItem $gridArea={'date'} $number={'true'}>{unixConvert(item.create_ux)}</StyledGridRowItem>
            <StyledGridRowItem $gridArea={'label'}>{item.label}</StyledGridRowItem>
            <StyledGridRowItem $gridArea={'price'} $number={'true'}>{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</StyledGridRowItem>
            <StyledGridRowItem $gridArea={'serial'}>{item.serial_number}</StyledGridRowItem>
            <StyledGridRowItem $gridArea={'rate'} $number={'true'}>{`$${(item.rate/100).toLocaleString('en-US')}/day`}</StyledGridRowItem>
          </StyledGridRow>
          // <div key={item.id} className="inventory-grid-container">
            
          //   <div className="inventory-grid-item inv-grid-date">{unixConvert(item.create_ux)}</div>
          //   <input className="inventory-grid-item inv-grid-label" type="text" name="label" id="label" defaultValue={item.label} />
          //   <div className="inventory-grid-item inv-grid-value">{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</div>
          //   <input className="inventory-grid-item inv-grid-qty" type="number" name="quantity" id={`quantity${item.id}`} defaultValue={item.quantity} />
          //   <div className="inventory-grid-item serial-number inv-grid-serial">{item.serial_number}</div>
          //   <div className="inventory-grid-item inv-grid-rate">{`$${(item.rate/100).toLocaleString('en-US')}/day`}</div>
          //   <div className="inventory-grid-item slide-left inv-grid-name"><Link to={`/inventory/${item.id}`} state={{ unit: item }}>{item.name}</Link></div>
          //   <div className="inventory-grid-item slide-left inv-grid-category">{item.category}</div>
            
          // </div>
        ))}
      </>
    
    )
 
  
}

export {ListItem, InventoryListItem};
