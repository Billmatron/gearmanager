import React, {useState, useEffect, useContext} from 'react'
import {SpreadsheetHeader, SpreadSheetBody} from '../components/Spreadsheet'
import { StyledToolBar} from '../components/styles/ToolBar.style'
import {StyledDataHeader} from '../components/Header'
import {StyledSpreadsheetContainer} from '../components/Spreadsheet'
import {ToolBarButton} from '../components/Buttons'
import AuthContext from '../context/AuthContext';
import {SelectInput,  SearchBox} from '../components/forms/FormInputs'
import {InventoryAddForm, InvAddForm} from '../components/forms/InventoryAddForm'
import {cleanInventory, pullTypesFromInventory, sortInventory} from '../utils/helpers'




const InventoryListPage = () => {
    const [inventory, setInventory] = useState([]);
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState("all");
    const [searchInput, setSearchInput] = useState("")
    const [searched, setSearched] = useState(false)
    const {authTokens, logoutUser} = useContext(AuthContext)
    const [filteredData, setFilteredData] = useState([])
    const [updated, setUpdated] = useState(false)
    const [add, setAdd] = useState(false)
    const [sorted, setSorted] = useState({columnName: '', sortDirection:false}) // true means ascending, false means descending
   
   
    const columns = [{id:'quantity', name:'qty', column:'qty'},
                {id:'name', name:'Name', column:'name'},
                {id:'create_ux', name:'Date Added', column:'date'},
                {id:'weight_g', name:'Weight', column:'weight'},
                {id:'purchase_price', name:'Purchase Price', column:'price'},
                {id:'serial_number', name:'Serial', column:'serial'},
                {id:'rate', name:'Rate', column:'rate'},
                {id:'category', name:'Category', column:'category'}]



    // get inventory anytime the spreadsheet has been updated
   useEffect(()=>{ 
       getInventory()
       typeSort(selectedType)
    }, [updated])

    // use effect to fill up filteredData with 'all' selectedType
    // also keeps selected type the same between data edits
    useEffect(()=>{
      if (inventory){
        typeSort(selectedType)
      }
    }, [inventory])


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
          setInventory(cleanData)
          
          
        
          
        } else if(response.statusText === 'Unauthorized'){
          logoutUser()
        }
        
    }

 


    const handleSearch = (e)=>{
        
      e.preventDefault();
      setSearchInput(e.target.value);
      
      
      if(e.target.value.length >=1){

          setSearched(true)
          setFilteredData(filteredData?.filter((element)=>{
            if (searchInput === ""){return element}
            else{
                return element.name.toLowerCase().includes(searchInput.toLowerCase())
            }
        }))

      }else{
        setSearched(false)
        typeSort(selectedType)
      }
      
  }

 // sort data using the select dropdown
  function typeSort(type_id){
    
    let data = inventory
   
    let newData = []
    if(type_id === 'all'){
      setFilteredData(sortInventory(inventory))
      setSelectedType(type_id)
      return
    }
    data.forEach(item =>{
      if(item.unit.types[0].id === parseInt(type_id)){
        newData.push(item)
      }
    })
    setFilteredData(newData)
    setSelectedType(type_id)
  }

  function columnClick(e){
    setAdd(false)
    const columnName = e.target.dataset.name
    // set it to run ascending then decending based on click amount
    if(sorted.columnName === columnName){
        setFilteredData(columnSort(filteredData, columnName))
    } else {
        setFilteredData(columnSort(filteredData, columnName))
    }
    setSorted({columnName: columnName, sortDirection: !sorted.sortDirection})
   
}

  function columnChange(e){
    setAdd(false)
    const columnName = e.target.value
    

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
  
  function updateBody(){
   
    setUpdated(!updated)
  }

  
  function addNew(){
    
    setAdd(!add)
  }
  function closeForm(){
    setAdd(false)
    setUpdated(!updated)
  }
  return (
    <>
    
    <StyledSpreadsheetContainer id={'spreadsheet-container'}>
        
        <StyledDataHeader id={'data-header'}>
            <StyledToolBar id={'tool-bar'}>
            
                <ToolBarButton id={'tool-bar-btn'} label={add ? 'Cancel':'Add New'} onClick={addNew} //link={'/inventory/add'} 
                />
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
                  defaultValue={'all'}
                  disabledText={'Category Filter'}
                  iterableElement={types}
                  label='category-select'
                  startselector={<option key='all' value="all">Full Inventory</option>}
                  />
                  <SelectInput
                  onChange={columnChange}
                  defaultValue={'all'}
                  disabledText={'Category Filter'}
                  iterableElement={columns}
                  label='filter'
                  startselector={<option key='all' value="all">Sort By</option>}
                  />
            </StyledToolBar>
     
          <SpreadsheetHeader id={'spreadsheet-header'}
            onClick={columnClick} 
            active={sorted}/>

        </StyledDataHeader>
            {add &&
              <InvAddForm closeForm={closeForm} selectedType={selectedType}/>
            }

            <SpreadSheetBody data={filteredData} onUpdate={updateBody}/>
        
          
     </StyledSpreadsheetContainer>
    </>
      
  
     
   
    
  )
}

export default InventoryListPage