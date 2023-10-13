import React, { useState, useEffect, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'


const InventoryAddForm = () => {
    let [step, setStep] = useState(0)
    const [makes, setMakes] = useState(null)
    let [types, setTypes] = useState(null)
    let [selectedType, setSelectedType] = useState(null)
    let [subtypes, setSubtypes] = useState(null)
    let [selectedSubtype, setSelectedSubtype] = useState(null)
    let [selectedMake, setSelectedMake] = useState(null)
    let [units, setUnits] = useState([])
    let [selectedUnit, setSelectedUnit] = useState(null)
    let [newUnitName, setNewUnitName] = useState(null)
    let [attributes, setAttributes] = useState(null)
    let [selectedAttributes, setSelectedAttributes] = useState([])
    let [newElement, setNewElement] = useState(false)
    let [weight, setWeight] = useState(0)
    let [weightUnit, setWeightUnit] = useState(453) //set for pounds to be first up
    let [manualLink, setManualLink]= useState(null)
    let [newUnitValue, setNewUnitValue] = useState(0)
    let [success, setSuccess] = useState(false)
   
    
    let [error, setError] = useState(null)

    // setting up everything to be uploaded
   
    const newUnitRef = useRef(undefined);
    const serialRef = useRef(undefined);
    const quantityRef = useRef(1);
    const purchaseRef = useRef(0);
    const rentalRef = useRef(0);
    const notesRef = useRef(undefined);
    const valueRef = useRef('0')
    const weightRef = useRef('0')
    const manualRef = useRef(undefined);
    // start the component off by grabing all the makes from the database
    useEffect(() => {
        async function fetchMakes(){
            let response = await fetch("/api/gear/makes")
            let data = await response.json()
            if(response.status === 200){
                setMakes(data)
            }
        }
        fetchMakes();
    }, [])

    
  

  // when a user selects a make, setUnits to fill in the datalist of units
    function handleMakes(e){
        
        const makeName = e.target.value;
        console.log(makeName)
        makes.forEach((make)=>{
            if (make.name == makeName){
                setSelectedMake(make)
            }
        })
        const fetchUnits = async (makeName) =>{
            let response = await fetch(`/api/gear/units/make/${makeName}`)
            let data = await response.json()
            if(response.status === 200) {
                
                setUnits(data)
                
                
            } else {
                console.log(`Failed to get ${makeName}`)
            }
        }
        fetchUnits(makeName);
        
    }



    function handleUnitSelect(e){
        const unitID = e.target.value;
        
        if (unitID === 'new'){
            setNewElement(true);
            return
        } else {
            getUnit(unitID);
          
        }
    }

    
    function handleTypeSelect(e){
        console.log(e.target.value)
        types.forEach((type) => {
            if(type.name === e.target.value){
                setSubtypes(type.subtypes);
                setSelectedType(type);
                setAttributes(type.attributeclass)
                //console.log(type.attributeclass)
            }
        })
    }

    function handleSubtypeSelect(e){
        console.log(e.target.value)
        subtypes.forEach((subtype) => {
            console.log(subtype.name)
            if(subtype.name === e.target.value){
                setSelectedSubtype(subtype)
            }
        })
    }

    function handleAttributeSelector(e){
        let attributeId = e.target.value;
        let attributeArray = selectedAttributes
        if (attributeArray.includes(attributeId)){
            attributeArray.pop(attributeId)
        } else {
            attributeArray.push(attributeId)
        }
        setSelectedAttributes(attributeArray);
        console.log(attributeArray);
        
    }

    function handleWeightUnit(e){
        setWeightUnit(e.target.value)
    }




    function handleNext(e){
        if(newElement){
           
            if(step === 0){
                 // do some simple validation on the user input model name
                if(newUnitRef.current.value === ""){
                    setError("A model name must be given");
                    return
                }
                if (newUnitRef.current.value.length < 5){
                    setError("Model name is too short");
                    return
                }
                setNewUnitName(newUnitRef.current.value);
                getTypes();
                setError(null);
                setStep(1);
            }
            
            if(step === 1){
                // do some simple validation on type and subtype, but more will be needed for this part of the form
                if(!selectedSubtype || !selectedType){
                    setError("must pick a type and subtype")
                }
                setError(null)
                setNewUnitValue = valueRef.current.value * 100
                setWeight = weightRef.current.value * weightUnit
                setManualLink = manualRef.current.value;
                //attributes should be auto set 
                let newUnit = {name: newUnitName,
                                make: selectedMake.id,
                                value: valueRef.current.value * 100,
                                weight_g: weightRef.current.value * weightUnit,
                                manual_link: manualRef.current.value,
                                attributes: selectedAttributes,
                                type: selectedType.id,
                                subtype: selectedSubtype.id}
                postNewUnit(newUnit);
                setStep(2);    

            } 
            
        } else{
            setSelectedAttributes(selectedUnit.attributes)
            setStep(2);
          
        }
        
    }
    let postNewUnit = async(newUnit) => {
        let response = await fetch('/api/gear/newunit/create',
                        {method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(newUnit)
                        })
        
        if(response.status === 200){
            let data = await response.json()
            console.log(data)
            setSelectedUnit(data);
        } else {
            alert("Problem uploading new model to database")
        }
        
    }
    // function to grab all the types and subtypes
    let getTypes = async() => {
        let response = await fetch(`/api/gear/types/${selectedMake.name}`)
        let data = await response.json()
        if(response.status === 200){
            setTypes(data)
            console.log(data)
        }else{
            alert("issue with getTypes")
        }
    }
    // function to grab the unit from the database if the user selects one that already exists
    let getUnit = async (unitID) => {
        let response = await fetch(`/api/gear/units/${unitID}`)
            let data = await response.json()
            if(response.status === 200){
                // separate attributes to be able to display them cleanly later.  Maybe not needed
                // let attObject = new Object();
                // data.attributes.forEach((attribute)=>{
                //     let attributeClass = attribute.attribute_class.name;
                //     let fixedAttribute = {id:attribute.id, name:attribute.name}
                //     if (attributeClass in attObject){
                //         attObject[attributeClass].push(fixedAttribute)
                //     } else {
                //         attObject[attributeClass]= [fixedAttribute]
                //     }
                    
                 
                // })
                // set state for the unit as well as the attributes of that unit
                setSelectedUnit(data);
                console.log(data)
                //setAttributes(attObject);
                
            } else{
                alert("Something wrong with unit select, sorry")
            }
    }




    let addToInventory = async(newInv) => {
        
        let response = await fetch('/api/gear/newinventory',
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newInv)
        })
        if (response.status === 200){
            let data = await response.json()
            console.log(data)
            setSuccess(true)
            
            

        }
    }
    // function to handle the searching of makes if using a datalist.  Currently not 100%
    // function handleMake(){
    //     let timeoutId;
    //     return (e) => {
    //         const searchTerm = e.target.value;
    //         setSearchTerm(searchTerm);
    //         clearTimeout(timeoutId);
    //         timeoutId = setTimeout(()=> {
    //             console.log(searchTerm);
    //         }, 2000)

    //     }
    // }
    // // debounce and useMemo to go with handleMake above.  Delays the querying of the database
    // const debounceMakeSearch = useMemo(() => handleMake(), [])
    
    


    // send all the new inventory information to the database
    function handleInventoryForm(user){
        
            let data = {
                make_id: selectedMake.id,
                unit_id: selectedUnit.id,
                purchase_price: purchaseRef.current.value * 100,
                serial_numbers: serialRef.current.value.split(','),
                rental_price: rentalRef.current.value * 100,
                notes: notesRef.current.value,
                quantity: quantityRef.current.value * 1,
                attributes: selectedAttributes,
                username: user.username
            }
            console.log(data)
            addToInventory(data);
        console.log("submitInventory Run")
        
    }
// //////////////////   COMPONENTS ////////////////////////////////
   let AttributeSelector = () => {
    
    return(
        <>
        {attributes?.map((attributeclass) => (
          
            
             <div key={attributeclass.name}className="input-container col-3">
             <div>
                 <label htmlFor="lens-mount">{attributeclass.name}</label>
             </div>
             <select name="lens-mount" id="lens-mount" multiple={true} onClick={handleAttributeSelector}>
                {attributeclass?.attributes.map((attribute) =>(
                    <option key={attribute.name} value={attribute.id}>{attribute.name}</option>
                ))}
                
             </select>
         </div>
        
            
        ))}
       
        </>
    )
   }

    let Step0 = () => {
        return (
        <>
                <p>1.  Pick a brand, and tell us the name of the unit.</p>

                <div className="display-flex">
                    <div className="input-container">
                        <div>
                            <label htmlFor="makes-select">Make</label>
                        </div>       
                        <div>
                            <select onChange={handleMakes} name="makes-slect" id="makes-select" defaultValue={selectedMake? selectedMake.name:'Choose'}>
                                <option key='1' value="Choose" disabled={true}>Choose your Brand</option>
                                {makes?.map((make) => (
                                <option key={make.id} object={make} value={make.name}>{make?.name}</option>
                                ))} 
                            </select>
                        </div>

                    </div>    
                    

                    <div className="input-container">
                            <div>
                                <label htmlFor="unit-name">Model</label>
                            </div>
                            <div>
                                {/* <input type="text" list='units-list' name="unit-name" id="unit-name" />
                                <datalist id='units-list'> 
                                    {units?.map((unit) => (
                                    <option key={unit.id} value={unit.name}>{unit?.name}</option>
                                    ))}
                                </datalist> */}
                                <select onChange={handleUnitSelect}name="unit-name" id="unit-name" defaultValue={selectedUnit? selectedUnit: 'Choose'}>
                                    <option value="Choose" disabled={true}>Choose a Model</option>
                                    {units?.map((unit) => (
                                        <option key={unit.id} value={unit.id}>{unit?.name}</option>
                                    ))}
                                    {selectedMake?  <><option value='new'>Something Else</option></>:   <></> }
                                </select>
                                
                            </div>
                    </div>
                    

            </div>
            {newElement?
                <div className="input-container mt1">
                <div>
                    <label  htmlFor="new-unit">Model Name</label>
                </div>
                <div>
                    <input
                    type="text" name="new-unit" id="new-unit" 
                    ref={newUnitRef}
                    placeholder='Type the model name of your new piece of gear' />
                </div>
                {error?
                <p className='error-message text-center'>{error}</p>
                :
                <></>
                }
                
            </div>:<></>
            }
            
                    
                </>
    )}

    let Step1 = () => {
        return (
            <>
            <h4>{selectedMake.name} {newUnitName}</h4>
            <p>Ok, never heard of that one before, I'm going to need some info first.</p>
            <p>This info helps with carnet creation and other things</p>
            {error? <p className='error-message'>{error}</p>: <></>}
            <div className="display-flex">
                <div className="input-container col-5">
                    <div>
                        <label htmlFor="type">Type</label>
                    </div>
                    <div>
                        <select name="type" id="type" defaultValue={selectedType? selectedType.name:'Choose'} onChange={handleTypeSelect}>
                            <option key='typekey' value="Choose" disabled={true}>What is it?</option>
                                {types?.map((type) => (
                                <option key={type.name} value={type.name}>{type?.name}</option>
                                ))} 
                        </select>
                    </div>
                </div>

                <div className="input-container col-5">
                    <div>
                        <label htmlFor="subtype">Subtype</label>
                    </div>
                    <div>
                        <select name="subtype" id="subtype" defaultValue={selectedSubtype? selectedSubtype: 'Choose'} onChange={handleSubtypeSelect}>
                        <option key='subtypekey' value="Choose" disabled={true}>What kind?</option>
                                {subtypes?.map((subtype) => (
                                <option key={subtype.name} value={subtype.name}>{subtype?.name}</option>
                                ))} 
                        </select>
                    </div>
                </div>
            </div>
            <div className="display-flex">
                <div className="input-container col-1">
                    <div>
                        <label htmlFor="value">Value</label>
                    </div>
                    <div>
                        <input type="number" ref={valueRef} name="value" id="value" defaultValue={valueRef.current.value} />
                    </div>
                </div>

                <div className="input-container col-3">
                    <div>
                        <label htmlFor="weight">Weight</label>
                    </div>
                    <div className='display-flex'>
                        <input type="number" name="weight" id="weight" ref={weightRef} defaultValue={weightRef.current.value} />
                        <select name="weight_unit" id="weight_unit" onChange={handleWeightUnit}>
                            <option value="453">lbs</option>
                            <option value="1000">kg</option>
                            <option value="1">g</option>
                            <option value="28">oz</option>
                        </select>
                    </div>
                </div>

                
            </div>

            <div className="display-flex">
                <div className="input-container col-10">
                    <div>
                        <label htmlFor="manual-link">Manual Link</label>
                    </div>
                    <div>
                    <input type="text" name="manual-link" id="manual-link" ref={manualRef} placeholder='http://mymanual.com' />
                </div>
                </div>
                
            </div>
            {selectedType? 
            <div className="display-flex">
            <AttributeSelector/>
            </div>:<></>
            }
            
            </>
        )
    }
    let Step2 = () => {
        const {user, logoutUser }= useContext(AuthContext);
        return (
            <>
            <h4>{selectedMake.name} {selectedUnit?.name}</h4>
            
                
                <p>Tell us a few things about this item and you're all set.</p>
                
                <div className="display-flex">
                    <div className="input-container col-1">
                        <div>
                            <label htmlFor="quantity">QTY?</label>
                        </div>
                        <div>
                            <input type="number" name="quantity" id="quantity" ref={quantityRef} defaultValue='1' />
                        </div>
                    </div>
                    <div className="input-container col-5">
                        <div>
                            <label htmlFor="serials">Serial #</label>
                        </div>
                        <div>
                            <input type="text" name="serials" id="serials" ref={serialRef}  placeholder="enter serial #'s separated by ','" />
                        </div>
                    </div>

                    <div className="input-container col-2">
                        <div>
                            <label htmlFor="purchase-price">OG Cost?</label>
                        </div>
                        <div>
                            <input type="number" name="purchase-price" id="purchase-price" ref={purchaseRef} defaultValue={selectedUnit?.value / 100} />
                        </div>
                    </div>
                    <div className="input-container col-2">
                        <div>
                            <label htmlFor="rental-rate">Rental Rate</label>
                        </div>
                        <div>
                            <input type="number" name="rental-rate" id="rental-rate" ref={rentalRef} defaultValue={(selectedUnit?.value / 100)/10} />
                        </div>
                    </div>
                </div>

                <div className="display-flex">
                    <div className="input-container col-9">
                        <div>
                            <label htmlFor="notes">Notes</label>
                        </div>
                        <div>
                            <textarea name="notes" id="notes" cols="50" rows="5" ref={notesRef} placeholder='puchase location, order number, etc...'></textarea>
                        </div>
                    </div>
                </div>
                <div className="mt1">
                <button onClick={()=>handleInventoryForm(user)} type="submit">Submit</button>
            </div>
               
                </>
            
            
          
        )
    }
    return (
        
        
        <div className='form-container invadd'>
            <h2>Add an item</h2>
            {step === 0 && 
                <Step0/>
            }

            {step === 1 &&
               <Step1 />
            }
            {step === 2 &&
                <Step2 />
            }

            <div className="mt1">
            {step > 0 &&
                <><button onClick={()=>setStep(step-1)}className='me2'>previous</button></>
            }
               
                <button onClick={handleNext}>next</button>
           
             
                   
                </div>

            
            
            
            


        </div>
        
            
        
           
    )
        

    

}

export default InventoryAddForm