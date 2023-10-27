import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {unixConvert} from '../utils/helpers'
import styled from 'styled-components'
import {inventorySort} from '../utils/helpers'
import {StyledDataHeader} from './Header'


export const StyledSpreadsheetContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 50px; 
    overflow: hidden;
    height: 80vh;
    
    
    
`

export const StyledSSRow = styled.div`
    display: grid;
    /* padding: 0.2rem; */
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-left: 1px solid black;
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas: 
        "qty name name name category category date label price serial serial rate";
  

`

export const StyledSSColumn = styled.div`
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


export const SpreadsheetHeader = ({onClick, active})=> {
   
    
    const columns = [{name:'quantity', label:'qty', column:'qty'},
                {name:'name', label:'Name', column:'name'},
                {name:'create_ux', label:'Date Added', column:'date'},
                {name:'label', label:'Label', column:'label'},
                {name:'purchase_price', label:'Purchase Price', column:'price'},
                {name:'serial_number', label:'Serial', column:'serial'},
                {name:'rate', label:'Rate', column:'rate'},
                {name:'category', label:'Category', column:'category'}]
  

   
    return (
        <StyledSSRow>
            {columns.map((item, index)=>{
                let activeSetting = false;
                {item.name === active.columnName ? activeSetting=true:activeSetting=false}
                return(
                    <StyledSSColumn
                        key={index}
                        $number={'true'}
                        onClick={onClick}
                        data-name={item.name}
                        $gridArea={item.column}
                        $active={activeSetting}>
                        {item.label}
                    </StyledSSColumn>
                )
                
            
            })}
        </StyledSSRow>
    )
}

export const StyledSSBody = styled.div`
    flex: auto;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
   & ::-webkit-scrollbar {
    display:none;
}
    
    

`

export const SpreadSheetBody = ({data})=>{
    return(
        <StyledSSBody id={'ss-body'}>
        {data?.map((item, index)=>(

            <StyledSSRow key={item.id}>
              <StyledSSColumn $gridArea={'qty'} $number={'true'}>{item.quantity}</StyledSSColumn>
              <StyledSSColumn $gridArea={'name'}>{item.name}</StyledSSColumn>
              <StyledSSColumn $gridArea={'category'}>{item.category}</StyledSSColumn>
              <StyledSSColumn $gridArea={'date'} $number={'true'}>{unixConvert(item.create_ux)}</StyledSSColumn>
              <StyledSSColumn $gridArea={'label'}>{item.label}</StyledSSColumn>
              <StyledSSColumn $gridArea={'price'} $number={'true'}>{`$${(item.purchase_price/100).toLocaleString("en-US")}`}</StyledSSColumn>
              <StyledSSColumn $gridArea={'serial'}>{item.serial_number}</StyledSSColumn>
              <StyledSSColumn $gridArea={'rate'} $number={'true'}>{`$${(item.rate/100).toLocaleString('en-US')}/day`}</StyledSSColumn>
            </StyledSSRow>
          
          ))}
        </StyledSSBody>
    )
    
}