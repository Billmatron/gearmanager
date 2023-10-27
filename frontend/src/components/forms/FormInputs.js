import React, { useState} from 'react'
import styled from 'styled-components'

let InputContainer = ({label, children, classAdd}) =>{
    return (
        <div className={`input-container ${classAdd}`}>
            <div>
                <label htmlFor={label}>{label}</label>
            </div>
            <div>
                {children}
            </div>      
        </div>
    )
}

let NumInput = ({label, defaultValue, onChange, front, back}) => {
return(
    <div className='display-flex align-baseline'>
        {front && <div className='align-bottom'>$</div>}
        <input type="number" name={label} id={label}
        onChange={onChange}
        defaultValue={defaultValue} />
        {back && <div>/day</div>}
    </div>
    
)
}

let TextInput = ({label, placeholder, onChange, setValue}) => {
    return (
        <input
        type="text" name={label} id={label} 
        defaultValue={setValue}
        onChange = {onChange}
        placeholder={placeholder} />
    )
    
}


export const StyledSearchBox = styled.div`
    border: 1px solid ${({theme})=>theme.colors.accent};
    background-color: ${({theme})=>theme.colors.base};
    display: flex;
    align-items: center;

    & input[type=search]{
        border: none;
        padding-left: 1rem;
        outline:0;
        background-color: ${({theme})=>theme.colors.base};
    }
`
export const SearchBox = (props) =>{
    return(
        <StyledSearchBox id={props.id}>
            <i className='material-icons'>{props.icon}</i>
            <input type="search" autoComplete='off' name={props.name} id="" 
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
            />
            
        </StyledSearchBox>
    )
}

let SearchField = ({label, searchElement, placeholder, setGlobalItem, finishFunction})=>{
    const [searchInput, setSearchInput] = useState("")
    const [searched, setSearched] = useState(false)
    const [cursor, setCursor] = useState(-1)
    

    const handleChange = (e)=>{
        
        e.preventDefault();
        setSearchInput(e.target.value);
        setCursor(-1)
        if (setGlobalItem){
            setGlobalItem(e.target.value)
        }
        if(e.target.value.length >=1){

            setSearched(true)

        }
        else{setSearched(false)}
        
    }

    const filteredData = searchElement.filter((element)=>{
        if (searchInput === ""){return element}
        else{
            return element.name.toLowerCase().includes(searchInput.toLowerCase())
        }
    })
    
    const handleKeyDown = (e)=>{
        const listLength = filteredData.length
        if (e.target.value.length >=1){
            if (e.keyCode === 40){
                //console.log("down")
                if(cursor < listLength -1){
                    setCursor(cursor + 1)
                }
            }
            if (e.keyCode === 38){
                //console.log("up")
                if(cursor > -1){
                    setCursor(cursor -1)
                }
                
            }
            if (e.keyCode === 9 || e.keyCode === 13){
                //console.log("tab, enter")
                if (e.target.parentNode.querySelector('.searchField-selected')){
                    keyboardClick(e.target.parentNode.querySelector('.searchField-selected'));
                }
                
            }
           
        }
       
     
    }
    function keyboardClick(element){
        setSearched(false)
        setSearchInput(element.dataset.name)
        finishFunction(element.value)
        
    }
    function buttonClick(e){
        // clear out the search list
       
        setSearched(false)
        // fill in the text input with what was selected
        setSearchInput(e.target.dataset.name)
        // call whatever prop was the finish function. pass ID, and name or written search
        
        finishFunction(e.target.value, e.target.innerHTML)

    }
    return(
        <div className="searchField-container">
            <input type="search" autoComplete='off' name={label} id={label} 
                className='input-search' 
                placeholder={placeholder} 
                onChange={handleChange}
                onKeyDown={handleKeyDown} 
                value={searchInput}/>
            {searched && 
                <div className="searchField-results">
                
                
                    {filteredData.map((item, index)=>{
                        
                        return(
                        
                        <option className={`searchField-results-item ${cursor === index? 'searchField-selected': null}` }
                            key={item.id}
                            onMouseEnter={()=>setCursor(-1)}
                            onClick={buttonClick}
                            value={item.id}
                            data-name={item.name}
                            >{item.name}</option>
                  
                    
                    )})}
                
              
                
            </div>
              }
        </div>
        
    )
}
let SelectInput = ({onChange, defaultValue, disabledText, iterableElement, label, endselector, startselector, classAdd}) => {
    
    return (
        <select onChange={onChange} name={label}id={label} defaultValue={defaultValue} className={classAdd}>
                                <option key='1' value="Choose" disabled={true}>{disabledText}</option>
                                {iterableElement && startselector}
                                
                                {iterableElement?.map((element) => (
                                <option key={element.id} value={element.id}>{element?.name}</option>
                                ))} 
                                {iterableElement && endselector}
                            </select>
    )
}

let TextArea = ({label, placeholder, onChange, defaultValue}) => {
    return (
        <div>
            <textarea name={label} id={label} rows="5"  defaultValue={defaultValue} placeholder={placeholder} onChange={onChange}></textarea>
        </div>
        
    )
}


export{TextArea, SelectInput, SearchField, TextInput, NumInput, InputContainer}