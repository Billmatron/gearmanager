import React, {useState, useContext} from 'react'
import styled from 'styled-components'



export const StyledAttributeCard = styled.div`
    margin: 0;
    text-align: center;
    margin-bottom: 2rem;
    width: ${({$width})=> $width? `${$width}`: 'auto' };

    h5 {
        color:${({theme})=>theme.accent};
    }
    p {
        font-size: xx-small;
        color: #626262;
        margin-bottom: 1rem;
    }
`


export const StyledAttributeFlex = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 700px;
    justify-content: space-evenly;
`

export const StyledAttributeItem = styled.div`
    width: 200px;
    
    text-align: start;
    margin-bottom: 0rem;
    margin-left: 0.5rem;

    label {
        color: ${({theme})=>theme.accent};
        font-variant: small-caps;
        font-size: smaller;
    }
    select {
        text-align: center;
        width: 75%;
        
        height: 150px;
        padding: 2px;
        border:none;
        border-top: 1px solid ${({theme})=>theme.accent};
        
        box-shadow: inset 0px 0px 10px gray;

        option:disabled:not(:first-child){
            margin-top: 1rem;

        }
        option:disabled {
            font-variant: small-caps;
        }
       
    }

`
export const AttributeSelectors = ({onChange, attributes}) => {
   
    
         

    return (
        <StyledAttributeCard id={'attribute-card'}>
            <h5>Select Attributes</h5>
            <p>Hold down 'control' or 'command' on Mac to select more than one</p>
            
            <StyledAttributeFlex id={'attribute-flex'}>
                
                    {attributes?.map((attributeclass) => (
                        <StyledAttributeItem id={`attribute-item-${attributeclass.name}`} key={attributeclass.name}>
                            <div>
                                <label htmlFor={attributeclass.name}>{attributeclass.name}</label>
                            </div>
                            <select name={attributeclass.name} id={attributeclass.name} 
                                    multiple={true} 
                                    onChange={onChange}
                                    >
                                {attributeclass?.attributes.map((attribute) =>(
                                    <option key={attribute.name} selected={attributeclass.selected} value={attribute.id}>{attribute.name}</option>
                                ))}
                        
                            </select>
                        </StyledAttributeItem>
                    
                        ))}
                </StyledAttributeFlex>
            </StyledAttributeCard>
    )
}


export const AttributeSelectorsSingle = ({onChange, attributes}) => {
   
    return (
        <StyledAttributeCard id={'attribute-card'}>
            <h5>Select Attributes</h5>
            <p>Hold down 'control' or 'command' on Mac to select more than one</p>
            
            <StyledAttributeFlex id={'attribute-flex'}>
                <StyledAttributeItem>
                <select name='attributes'
                        multiple={true}
                        onChange={onChange}>
                    {attributes?.map((attributeClass)=>(
                        <>
                        <option key={attributeClass.id} value="" disabled={true}>{attributeClass.name}</option>
                        {attributeClass?.attributes.map((attribute)=>(
                                <option key={attribute.name} value={attribute.id}>{attribute.name}</option>
                        ))}
                        </>
                        
                    ))}

                </select>

                </StyledAttributeItem>
                
                    
                </StyledAttributeFlex>
            </StyledAttributeCard>
    )
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////  V2.0 for inner speadsheet form  ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const SyledUL = styled.ul`
    list-style-type: none;

    li {
        float: left;
    }

`
export const AttributeCheckTag = ({onClick, attributes})=>{
    console.log(attributes)
    return (

       
     
       
        <SyledUL>
             {attributes?.map((classes, index) => (
                <li key={index} className='display-flex wrap'> 

                    <div>
                        <span>{classes.name}</span>
                    </div>
                   
                    {classes?.attributes.map((attribute, index) =>(
                        
                        <button key={index} onClick={onClick}>{attribute.name}</button>
                    
                    ))}
                </li>
                ))}
     
        </SyledUL>
        
    )
}

