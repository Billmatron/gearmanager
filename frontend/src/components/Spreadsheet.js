import React, {useState, useContext, useEffect} from 'react'
import {unixConvert, capitalizeFirstLetter} from '../utils/helpers'
import {TextArea, InputContainer, SelectInput} from './forms/FormInputs'
import {StyledSaveButton, StyledDiscardButton} from './Buttons'
import {SBody, SColumn, SRow, SExpandedRow, 
         SHeaderColumn, SHeaderRow, SWrapper} from '../components/styles/Spreadsheet.style'
import AuthContext from '../context/AuthContext'
import DisplayContext from '../context/DisplayContext'








export const SpreadsheetHeader = ({onClick, active})=> {
   
    let columns;
    
  
   

        columns = [{name:'quantity', label:'qty', column:'qty'},
                {name:'name', label:'Name', column:'name'},
                {name:'create_ux', label:'Date Added', column:'date'},
                {name:'unit.weight_g', label:'Weight', column:'weight'},
                {name:'purchase_price', label:'Purchase Price', column:'price'},
                {name:'serial_number', label:'Serial', column:'serial'},
                {name:'rate', label:'Rate', column:'rate'},
                {name:'category', label:'Category', column:'category'}]
    
        
    
        
    return (
        <SHeaderRow>
            {columns.map((item, index)=>{
                
                let activeSetting = false;
                {item.name === active.columnName ? activeSetting=true:activeSetting=false}
                return(
                    <SHeaderColumn
                        key={index}
                        $number={'true'}
                        onClick={onClick}
                        data-name={item.name}
                        $gridArea={item.column}
                        $active={activeSetting}>
                        {item.label}
                    </SHeaderColumn>
                )
                
            
            })}
        </SHeaderRow>
    )
}



export const SpreadSheetBody = ({data, onUpdate})=>{
    const {width, height} = useContext(DisplayContext)
    const {authTokens} = useContext(AuthContext)
    const [active, setActive] = useState(-1)
    const [activeUnit, setActiveUnit] = useState(null)
    const [tablet, setTablet] = useState(width<=1000 ? true: false)
    
    useEffect(()=>{
        if (width<=1000){
            setTablet(true)
        } else{setTablet(false)}
    },[width])
   

    function rowClick(item){
        
        if (active === item.id){
            // means that the open item has been closed
            setActive(-1)
            setActiveUnit(null)
        } else{
            setActive(item.id)
            setActiveUnit(item)
        } 
        
   }

   function discardChanges(e){
    setActive(-1)
    setActiveUnit(null)
   }
   async function saveRow(e){
        let updatedUnit = activeUnit
        delete updatedUnit.name
        delete updatedUnit.category
        
        let response = await fetch(`/api/gear/inventory/edit/${updatedUnit.id}`, 
                {method: 'PUT',
                headers: {'Content-Type': 'application/json',
                        'Authorization':'Bearer ' + String(authTokens.access)},
                body: JSON.stringify(updatedUnit)
                })
                if (response.status === 200){
                setActive(-1)
                setActiveUnit(null)
                onUpdate()
                
                } else{
                alert('something went wrong in handleSubmit')
                }
   }
 

    return(
        <SBody id={'ss-body'}>
        {data?.map((item, index)=>{
            
            let activeStatus=false;
            active===item.id? activeStatus=true:activeStatus=false
            const serials = item.serial_number.join(', ')

            if(activeStatus){
                
                return(
                    <SExpandedRow
                        key={item.id}
                        id={item.id}
                        >
                        
                        <SRow 
                            key={item.id}
                            id={item.id}
                            $active={false}
                            >
                            <SColumn $gridArea={'qty'} $number={'true'}>
                                
                                <input type="number" name="num" id="num" 
                                defaultValue={activeUnit.quantity} 
                                onChange={(e)=>setActiveUnit({...activeUnit, quantity:e.target.value})}
                                />
                                
                                
                            </SColumn>
                            <SColumn $gridArea={'category'}onClick={(e)=>rowClick(e)}>{item.category}</SColumn>
                            <SColumn $gridArea={'name'}onClick={(e)=>rowClick(e)}>
                                
                                {item.name}
                            
                            </SColumn>
                            <SColumn $gridArea={'date'} $number={'true'}onClick={(e)=>rowClick(e)}>{unixConvert(item.create_ux)}</SColumn>
                            <SColumn $gridArea={'weight'} $number={'true'}onClick={(e)=>rowClick(e)}>{item.weight_g}</SColumn>
                            <SColumn $gridArea={'price'} $number={'true'}onClick={(e)=>rowClick(e)}>{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</SColumn>
                            <SColumn $gridArea={'serial'}>
                                <input type="text" name="serial" id="serial"
                                defaultValue={serials} 
                                onChange={(e)=>setActiveUnit({...activeUnit, serial_number:e.target.value.split(',')})} /> 
                            </SColumn>
                            <SColumn $gridArea={'rate'} $number={'true'}>
                                <input type="number" name="rate" id="rate"
                                defaultValue={(item.rate/100).toLocaleString('en-US')}
                                onChange={(e)=>setActiveUnit({...activeUnit, rate:e.target.value * 100})}  />
                
                            </SColumn>





                        </SRow>
                        <InputContainer label={'Notes'}>
                            <TextArea
                                label={'Notes'}
                                placeholder={'add any notes'}
                                defaultValue={item.notes}
                                onChange={(e)=>setActiveUnit({...activeUnit, notes:e.target.value})}/>
                        </InputContainer>
                    <StyledDiscardButton onClick={discardChanges}>Discard Changes</StyledDiscardButton>
                    <StyledSaveButton onClick={saveRow}>Save</StyledSaveButton>
                    </SExpandedRow>
                )
            } else

            return(
            
            
            <SRow 
                key={item.id}
                id={item.id}
                $active={activeStatus}
                onClick={(e)=>rowClick(item)}>

                <SColumn $gridArea={'qty'} $number={'true'}>{item.quantity}</SColumn>
                <SColumn $gridArea={'category'}>
                    <>{capitalizeFirstLetter(item.unit.types[0].name)}
                        <span>{`, ${capitalizeFirstLetter(item.unit.subtypes[0].name)}`}</span>
                    </>
                </SColumn>
                <SColumn $gridArea={'name'}>
                    
                        {item.name}
   
                
                </SColumn>
               
                
                <SColumn $gridArea={'price'} $number={'true'}>{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</SColumn>
               
                <SColumn $gridArea={'rate'} $number={'true'}>
                    <>
                    {`$${(item.rate/100).toLocaleString('en-US')}`}
                    <span>/day</span>
                    </>
                </SColumn>
                
               
                <SColumn $gridArea={'weight'} $number={true}>{item.unit.weight_g}g</SColumn>
                <SColumn $gridArea={'serial'}>{serials}</SColumn>
                <SColumn $gridArea={'date'} $number={'true'}>{unixConvert(item.create_ux)}</SColumn>
                
                
                
           
            </SRow>
               
                
           
            
          
          )})}
        </SBody>
    )
    
}