import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import {unixConvert, capitalizeFirstLetter} from '../utils/helpers'
import styled from 'styled-components'
import {inventorySort} from '../utils/helpers'
import {TextArea, InputContainer, SelectInput} from './forms/FormInputs'
import {StyledSaveButton, StyledDiscardButton} from './Buttons'
import {AttributeSelectors} from './AttributeSelector'
import {StyledFlexDiv, StyledDiv} from '../components/styles/Containers.style'
import AuthContext from '../context/AuthContext'
import {useWindowSize} from '../hooks/WindowSize'



export const StyledBody = styled.div`
    
    flex: auto;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
   
    & ::-webkit-scrollbar {display:none;}
    
`


export const StyledHeaderColumn = styled.div`
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



export const StyledHeaderRow = styled.div`
    
    display: grid;
    /* padding: 0.2rem; */
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-left: 1px solid black;
    grid-template-columns: repeat(24, 1fr);
    grid-template-areas: 
        "qty category category category category name name name name name name name date date weight weight price price serial serial serial serial rate rate";
    
     
     
`



export const StyledColumn = styled.div`

    border:1px solid black;
    border-left:none;
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


    input[type=number]{
        width: 100%;
        border: 1px solid black;
        
        text-align: center;
        height: 30px;
    }

    input[type=text]{
        width: 100%;
        height: 30px;
    }
    select{
        width:  ${({$selectWidth})=> $selectWidth? `${$selectWidth}%`: '100%' };
        height: 30px;
    }
    
    input[type=date]{
        width: 100%;
        height: 30px;
    }


    
`




export const StyledRow = styled.div`
    display: grid;
    /* padding: 0.2rem; */
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-left: 1px solid black;
    grid-template-columns: repeat(24, 1fr);
    grid-template-areas: 
    "qty category category category category name name name name name name name date date weight weight price price serial serial serial serial rate rate";
    
    &:hover{
        background-color: ${ ({theme})=>theme.colors.base};
        color: ${({theme})=>theme.colors.accent};
    }

    
   
`

export const StyledExpandedRow = styled.div`
    
    height: ${({$height}) => $height ? $height : '200px'};
    border: 1px solid black;
    background-color:${({theme})=>theme.colors.base};
    position: relative;
    margin-bottom: 2rem;
    
    
    & ${StyledRow}{
        border-left: none;
    }
    & ${StyledColumn}{
        border: ${({$active}) => $active ? '1px solid black' : 'none'};
        /* border-left: none; */
        
    }
    
`



export const StyledSpreadsheetContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 50px; 
    overflow: scroll;
    height: 80vh;
    position: relative;
    
    /* medium */
    @media only screen and (min-width: 641px) and (max-width: 1060px) {
        margin: 20px 20px; 

        ${StyledHeaderRow}, ${StyledRow}{
            grid-template-columns: repeat(18, 1fr);
            grid-template-areas: 
            "qty category category category category name name name name name name name date date price price rate rate";
        }
    }

    /* small */
    @media only screen and (min-width: 451px) and (max-width: 640px) {
        margin: 20px 10px; 

        ${StyledHeaderRow}, ${StyledRow}{
            grid-template-columns: repeat(16, 1fr);
            grid-template-areas: 
            "qty category category category category name name name name name name name  price price rate rate";
        }
        span {
            display: none;
        }
    }

    /* x-small */
    @media only screen and (max-width: 450px) {
        margin: 20px 10px; 

        ${StyledHeaderRow}, ${StyledRow}{
            grid-template-columns: repeat(14, 1fr);
            grid-template-areas: 
            "qty category category category name name  name name name name  price price rate rate";
        }

        ${StyledHeaderColumn}, ${StyledColumn}{
            font-size: x-small;
        }
        span {
            display: none;
        }
    }
`







export const SpreadsheetHeader = ({onClick, active})=> {
    const [width, height] = useWindowSize();
    let columns;
    
  
    if(width > 1060){

        columns = [{name:'quantity', label:'qty', column:'qty'},
                {name:'name', label:'Name', column:'name'},
                {name:'create_ux', label:'Date Added', column:'date'},
                {name:'weight_g', label:'Weight', column:'weight'},
                {name:'purchase_price', label:'Purchase Price', column:'price'},
                {name:'serial_number', label:'Serial', column:'serial'},
                {name:'rate', label:'Rate', column:'rate'},
                {name:'category', label:'Category', column:'category'}]
    } else if (width < 641){
        columns = [{name:'quantity', label:'qty', column:'qty'},
                {name:'name', label:'Name', column:'name'},
                {name:'purchase_price', label:'Purchase Price', column:'price'},
               
                {name:'rate', label:'Rate', column:'rate'},
                {name:'category', label:'Category', column:'category'}]
    }
    
    else {
        columns = [{name:'quantity', label:'qty', column:'qty'},
                {name:'name', label:'Name', column:'name'},
                {name:'create_ux', label:'Date Added', column:'date'},
                
                {name:'purchase_price', label:'Purchase Price', column:'price'},
               
                {name:'rate', label:'Rate', column:'rate'},
                {name:'category', label:'Category', column:'category'}]
    }
   
    return (
        <StyledHeaderRow>
            {columns.map((item, index)=>{
                let activeSetting = false;
                {item.name === active.columnName ? activeSetting=true:activeSetting=false}
                return(
                    <StyledHeaderColumn
                        key={index}
                        $number={'true'}
                        onClick={onClick}
                        data-name={item.name}
                        $gridArea={item.column}
                        $active={activeSetting}>
                        {item.label}
                    </StyledHeaderColumn>
                )
                
            
            })}
        </StyledHeaderRow>
    )
}



export const SpreadSheetBody = ({data, onUpdate})=>{
   const [active, setActive] = useState(-1)
    const [activeUnit, setActiveUnit] = useState(null)
    const [width, height] = useWindowSize();
    const {authTokens} = useContext(AuthContext)
   
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
        <StyledBody id={'ss-body'}>
        {data?.map((item, index)=>{
            
            let activeStatus=false;
            active===item.id? activeStatus=true:activeStatus=false
            const serials = item.serial_number.join(', ')

            if(activeStatus){
                
                return(
                    <StyledExpandedRow
                        key={item.id}
                        id={item.id}
                        >
                        
                        <StyledRow 
                            key={item.id}
                            id={item.id}
                            $active={false}
                            >
                            <StyledColumn $gridArea={'qty'} $number={'true'}>
                                
                                <input type="number" name="num" id="num" 
                                defaultValue={activeUnit.quantity} 
                                onChange={(e)=>setActiveUnit({...activeUnit, quantity:e.target.value})}
                                />
                                
                                
                            </StyledColumn>
                            <StyledColumn $gridArea={'category'}onClick={(e)=>rowClick(e)}>{item.category}</StyledColumn>
                            <StyledColumn $gridArea={'name'}onClick={(e)=>rowClick(e)}>{item.name}</StyledColumn>
                            <StyledColumn $gridArea={'date'} $number={'true'}onClick={(e)=>rowClick(e)}>{unixConvert(item.create_ux)}</StyledColumn>
                            <StyledColumn $gridArea={'weight'} $number={'true'}onClick={(e)=>rowClick(e)}>{item.weight_g}</StyledColumn>
                            <StyledColumn $gridArea={'price'} $number={'true'}onClick={(e)=>rowClick(e)}>{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</StyledColumn>
                            <StyledColumn $gridArea={'serial'}>
                                <input type="text" name="serial" id="serial"
                                defaultValue={serials} 
                                onChange={(e)=>setActiveUnit({...activeUnit, serial_number:e.target.value.split(',')})} /> 
                            </StyledColumn>
                            <StyledColumn $gridArea={'rate'} $number={'true'}>
                                <input type="number" name="rate" id="rate"
                                defaultValue={(item.rate/100).toLocaleString('en-US')}
                                onChange={(e)=>setActiveUnit({...activeUnit, rate:e.target.value * 100})}  />
                
                            </StyledColumn>





                        </StyledRow>
                        <InputContainer label={'Notes'}>
                            <TextArea
                                label={'Notes'}
                                placeholder={'add any notes'}
                                defaultValue={item.notes}
                                onChange={(e)=>setActiveUnit({...activeUnit, notes:e.target.value})}/>
                        </InputContainer>
                    <StyledDiscardButton onClick={discardChanges}>Discard Changes</StyledDiscardButton>
                    <StyledSaveButton onClick={saveRow}>Save</StyledSaveButton>
                    </StyledExpandedRow>
                )
            } else

            return(
            
            
            <StyledRow 
                key={item.id}
                id={item.id}
                $active={activeStatus}
                onClick={(e)=>rowClick(item)}>

                <StyledColumn $gridArea={'qty'} $number={'true'}>{item.quantity}</StyledColumn>
                <StyledColumn $gridArea={'category'}>
                    <>{capitalizeFirstLetter(item.unit.types[0].name)}
                        <span>{`, ${capitalizeFirstLetter(item.unit.subtypes[0].name)}`}</span>
                    </>
                </StyledColumn>
                <StyledColumn $gridArea={'name'}>{item.name}</StyledColumn>
               
                
                <StyledColumn $gridArea={'price'} $number={'true'}>{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</StyledColumn>
               
                <StyledColumn $gridArea={'rate'} $number={'true'}>
                    <>
                    {`$${(item.rate/100).toLocaleString('en-US')}`}
                    <span>/day</span>
                    </>
                </StyledColumn>
                
                {width > 1060 &&
                <>
                        <StyledColumn $gridArea={'weight'} $number={true}>{item.unit.weight_g}g</StyledColumn>
                        <StyledColumn $gridArea={'serial'}>{serials}</StyledColumn>
                </>
                    
                }
                {width > 641 &&
                         <StyledColumn $gridArea={'date'} $number={'true'}>{unixConvert(item.create_ux)}</StyledColumn>
                }
                
                
           
            </StyledRow>
               
                
           
            
          
          )})}
        </StyledBody>
    )
    
}