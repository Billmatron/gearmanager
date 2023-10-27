import React, {useState, useEffect, useContext} from 'react'
import {SpreadsheetHeader, SpreadSheetBody} from '../components/Spreadsheet'
import { StyledToolBar} from '../components/styles/ToolBar.style'
import {StyledDataHeader} from '../components/Header'
import {StyledSpreadsheetContainer} from '../components/Spreadsheet'
import {ToolBarButton} from '../components/Buttons'
import AuthContext from '../context/AuthContext';
import {SelectInput,  SearchBox} from '../components/forms/FormInputs'

import {cleanInventory, pullTypesFromInventory, capitalizeFirstLetter} from '../utils/helpers'




const InventoryListPage = () => {
    const [inventory, setInventory] = useState([]);
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState("all");
    const [searchInput, setSearchInput] = useState("")
    const [searched, setSearched] = useState(false)
    const {authTokens, logoutUser} = useContext(AuthContext)
    const [filteredData, setFilteredData] = useState([])
    const [quoteSwitch, setQuoteSwitch] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [sorted, setSorted] = useState({columnName: '', sortDirection:false}) // true means ascending, false means descending
   
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
         // put a name category into the inventory file.  Need to fix the need for this on the backend
          const cleanData = await cleanInventory(data);
          const cleanTypes = await pullTypesFromInventory(data);
          
          setTypes(cleanTypes)
          setFilteredData(cleanData)
          setInventory(cleanData)
          
          
        } else if(response.statusText === 'Unauthorized'){
          logoutUser()
        }
        
    }

    // function to create new inventory state by filtering on selected type
    let typeSort = async (type_id) => {
      console.log(type_id)
      if (type_id === 'all'){
        setFilteredData(inventory)
      } else {
        let response = await fetch(`/api/gear/inventory/${type_id}`)
        let data = await response.json()
        if (response.status === 200){
          setFilteredData(cleanInventory(data));
        }
        
      }
      setSelectedType(type_id);
    }


    const handleSearch = (e)=>{
        
      e.preventDefault();
      setSearchInput(e.target.value);
      
      
      if(e.target.value.length >=1){

          setSearched(true)
          setFilteredData(inventory?.filter((element)=>{
            if (searchInput === ""){return element}
            else{
                return element.name.toLowerCase().includes(searchInput.toLowerCase())
            }
        }))

      }
      else{setSearched(false)}
      
  }

  function columnClick(e){
      const columnName = e.target.dataset.name
      // set it to run ascending then decending based on click amount
      if(sorted.columnName === columnName){
          setFilteredData(columnSort(filteredData, columnName))
      } else {
          setFilteredData(columnSort(filteredData, columnName))
      }
      setSorted({columnName: columnName, sortDirection: !sorted.sortDirection})
     
  }

  function columnSort(data, column_name){
    if (sorted.sortDirection){
      data.sort(function (a,b) {
        if (b[`${column_name}`] < a[`${column_name}`]){return -1}
        if (b[`${column_name}`] > a[`${column_name}`]){return 1}
        return 0
        
      });
      return data
    }
    data.sort(function (a,b) {
      if (a[`${column_name}`] < b[`${column_name}`]){return -1}
      if (a[`${column_name}`] > b[`${column_name}`]){return 1}
      return 0
      
    });
    return data
  }
    
  return (
    
      <StyledSpreadsheetContainer id={'spreadsheet-container'}>
        <StyledDataHeader id={'data-header'}>
            <StyledToolBar id={'tool-bar'}>
            
                <ToolBarButton id={'tool-bar-btn'} label={'Add New'} link={'/inventory/add'} />
                <SearchBox
                  id={'search-box'}
                  name='inv-search'
                  icon='search'
                  placeholder="search by name"
                  onChange={handleSearch}
                  value={searchInput}
                />
                <SelectInput
                  onChange={e=>typeSort(e.target.value)}
                  defaultValue={'Choose'}
                  disabledText={'Category Filter'}
                  iterableElement={types}
                  label='category-select'
                  startselector={<option key='all' value="all">Full Inventory</option>}
                  />
          </StyledToolBar>
     
          <SpreadsheetHeader id={'spreadsheet-header'}
            onClick={columnClick} 
            active={sorted}/>

        </StyledDataHeader>

            <SpreadSheetBody data={filteredData}/>
        
          
     </StyledSpreadsheetContainer>
  
     
   
    
  )
}

export default InventoryListPage