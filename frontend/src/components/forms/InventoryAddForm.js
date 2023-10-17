import React, { useState, useEffect, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'


const InventoryAddForm = () => {
    const [step, setStep] = useState(0)
    const [step0Make, setStep0Make] = useState(null)
    const [step0Unit, setStep0Unit] = useState(null) 
    
    const [globalError, setGlobalError] = useState(null)

    let [success, setSuccess] = useState(false)
    const {authTokens} = useContext(AuthContext)
    let navigate = useNavigate();
    function handleNext(e){
        console.log('next tapped')
    }



// //////////////////   COMPONENTS ////////////////////////////////

    let NextButton = ({onClick, title}) =>{
        return(
            <div className="mt1">
            <button onClick={onClick}>
                {title}
            </button>
        </div>
        )
        
    }

    let AttributeSelectors = ({onChange, attributes}) => {
        return (
            <div className="display-flex">
                  
                    {attributes?.map((attributeclass) => (
                        <div key={attributeclass.name}className="input-container col-3">
                            <div>
                                <label htmlFor={attributeclass.name}>{attributeclass.name}</label>
                            </div>
                            <select name={attributeclass.name} id={attributeclass.name} multiple={true} onChange={onChange}>
                                {attributeclass?.attributes.map((attribute) =>(
                                    <option key={attribute.name} value={attribute.id}>{attribute.name}</option>
                                ))}
                        
                            </select>
                         </div>
                       
                        ))}
                </div>
        )
    }


    let Step0 = () => {
        const [makes, setMakes] = useState(null)
        const [units, setUnits] = useState(null)
        const [selectedMake, setSelectedMake] =useState(null)
        const [selectedUnit, setSelectedUnit] = useState(null)
        const [newElement, setNewElement] = useState(false)
        const [error, setError] = useState(null)
        
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
        function handleMakesSelect(e){
        
            const makeName = e.target.value;
            
            makes.forEach((make)=>{
                if (make.name == makeName){
                    // set selected make on the global inventory form state
                    setSelectedMake(make)
                }
            })
            
            const fetchUnits = async (makeName) =>{
                let response = await fetch(`/api/gear/units/make/${makeName}`)
                let data = await response.json()
                if(response.status === 200) {
                    // set all units of selected make on component state
                    
                    setUnits(data)
                    
                    }else {
                        console.log(`Failed to get ${makeName}`)
                    }
            }
            fetchUnits(makeName);
            
            
            
        }

        function handleUnitSelect(e){
            const unitID = e.target.value;
            
            if (unitID === 'new'){
                // set global state to indicate new element is being added
                setNewElement(true);
                return
            } else {
                // function to grab the unit from the database if the user selects one that already exists
                async function getUnit(unitID) {
                    let response = await fetch(`/api/gear/units/${unitID}`)
                    let data = await response.json()
                    if(response.status === 200){
                        // set global inventory form state item
                        setSelectedUnit(data);
                    
                    } else{
                        alert("Something wrong with unit select, sorry")
                    }
                }
                getUnit(unitID);
                
            }
        }

        function handleNext0(){
            if(!selectedMake){
                setError("Must choose a make")
                return
            }
            if (!newElement && !selectedUnit){
                setError("must choose a model")
                return
            }
            if(newElement){
                setStep0Make(selectedMake)
                
                setStep(1)
            } else {
                setStep0Make(selectedMake)
                setStep0Unit(selectedUnit)
                setStep(2)
            }
            
        }        

        return (
        <>
                <p>1.  Pick a brand, and tell us the name of the unit.</p>
                {error && <span className='error-message'>{error}</span>}

                <div className="display-flex">
                    <div className="input-container">
                        <div>
                            <label htmlFor="makes-select">Make</label>
                        </div>       
                        <div>
                            <select onChange={handleMakesSelect} name="makes-slect" id="makes-select" defaultValue={selectedMake? selectedMake.name:'Choose'}>
                                <option key='1' value="Choose" disabled={true}>Choose your Brand</option>
                                {makes?.map((make) => (
                                <option key={make.id} value={make.name}>{make?.name}</option>
                                ))} 
                            </select>
                        </div>

                    </div>    
                    

                    <div className="input-container">
                            <div>
                                <label htmlFor="unit-name">Model</label>
                            </div>
                            <div>
                                
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
                <NextButton onClick={handleNext0} title={"Next"}/>
            </>
               
    )}

    let Step1 = (props) => {

        const [error, setError] = useState(null)
        const [types, setTypes] = useState(null)
        let [selectedType, setSelectedType] = useState(null)
        const [subtypes, setSubtypes] = useState(null)
        let [selectedSubtype, setSelectedSubtype] = useState(null)
        let [attributes, setAttributes] = useState(null)
        let [weightUnit, setWeightUnit] = useState(453) //set for pounds to be first up

        const newUnitRef = useRef(undefined);
        const valueRef = useRef('0')
        const weightRef = useRef('0')
        const manualRef = useRef(undefined);
        const attributeRef = useRef()
        
        // get all the initial types to start the system off
        useEffect(()=>{
            // function to grab all the types and subtypes
            async function getTypes(){
                let response = await fetch(`/api/gear/types/${props.make.name}`)
                let data = await response.json()
                if(response.status === 200){
                    setTypes(data)
                    
                }else{
                    alert("issue with getTypes")
                }
            }
            getTypes()
    
        }, [])

        let postNewUnit = async(newUnit) => {
            let response = await fetch('/api/gear/newunit/create',
                            {method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization':'Bearer ' + String(authTokens.access)},
                            body: JSON.stringify(newUnit)
                            })
            
            if(response.status === 200){
                let data = await response.json()
                console.log(data)
                // add the created unit to the state of the top level component
                setStep0Unit(data);
            } else {
                alert("Problem uploading new model to database")
            }
            
        }


        function handleTypeSelect(e){
            
            types.forEach((type) => {
                if(type.name === e.target.value){
                    setSubtypes(type.subtypes);
                    setSelectedType(type);
                    setAttributes(type.attributeclass)
                    console.log(type)
                    // create attributeRef container for future updates
                    type.attributeclass.forEach((attribute)=>{
                        attributeRef[attribute.name] = new Array()
                    })
                    attributeRef["current"] = []
                    
                    
                }
            })
        }
    
        function handleSubtypeSelect(e){
            subtypes.forEach((subtype) => {
                //console.log(subtype.name)
                if(subtype.name === e.target.value){
                    setSelectedSubtype(subtype)  
                }
            })
        }

        function handleWeightUnit(e){
            setWeightUnit(e.target.value)
        }

        

        function handleAttributeSelector(e){
            // ref framework was created earlier with the type selector
           
            let attributeArray = Array.from(e.target.selectedOptions, option => option.value)
            attributeRef[e.target.name] = attributeArray
            
        }
    
        function handleNext1(){
           
            //do some simple validation on type and subtype, but more will be needed for this part of the form
                if(!selectedSubtype || !selectedType){
                    setError("must pick a type and subtype")
                    return
                }
                if (newUnitRef.current.value.length < 10){
                    setError('Unit name is too short to be real, bro.')
                    return
                }
            setError(null)

            // setup attribute array to parse through the mess that is attributeRef
            let attributeArray = []

            attributes?.forEach((attributeclass)=>{
                if (attributeRef[attributeclass.name].length > 0){
                        attributeRef[attributeclass.name].forEach((attribute)=>{
                        attributeArray.push(attribute)
                    })
                }
                
            })
        
            //setup data for a new unit to pass to the database 
            let newUnit = {name: newUnitRef.current.value,
                            make: props.make.id,
                            value: valueRef.current.value * 100,
                            weight_g: weightRef.current.value * weightUnit,
                            manual_link: manualRef.current.value,
                            attributes: attributeArray,
                            type: selectedType.id,
                            subtype: selectedSubtype.id}

            console.log(newUnit)
            postNewUnit(newUnit);
            setStep(2);    
        }

        return (
            <>
            <h4>New thing from {props.make.name}</h4>
            <p>Before we add it to your inventory, lets get some basic info first</p>
            {error? <p className='error-message'>{error}</p>: <></>}
            
            <div className="display-flex">
                <div className="input-container col-11 mt1 mb1">
                    <div>
                        <label  htmlFor="new-unit">Model Name</label>
                    </div>
                    <div>
                        <input
                        type="text" name="new-unit" id="new-unit" 
                        ref={newUnitRef}
                        placeholder='Type the model name of your new piece of gear' />
                    </div>
                    {error && <span className='error-message text-center'>{error}</span>}
                
                </div>
            </div>
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
                        <input type="number" ref={valueRef} name="value" id="value" defaultValue={0} />
                    </div>
                </div>

                <div className="input-container col-3">
                    <div>
                        <label htmlFor="weight">Weight</label>
                    </div>
                    <div className='display-flex'>
                        <input type="number" name="weight" id="weight" ref={weightRef} defaultValue={0} />
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
                <AttributeSelectors onChange={handleAttributeSelector} attributes={attributes}/>:<></>
            }
            <div className='display-flex justify-center'>
                <div className="me2">
                <NextButton onClick={()=>setStep(0)} title={"Previous"} />
                </div>
            
            <NextButton onClick={handleNext1} title={"Add to Database"} />
            </div>
            
            </>
        )
    }








    let Step2 = (props) => {
        const {user, logoutUser }= useContext(AuthContext);
        const [limitedAttributes, setLimitedAttributes] = useState()
        const [multiAttributes, setMultiAttributes] = useState()
        const serialRef = useRef(undefined);
        const quantityRef = useRef(1);
        const purchaseRef = useRef(0);
        const rentalRef = useRef(0);
        const notesRef = useRef(undefined);
        let multiAttributeRef = useRef({current:[]})
        useEffect(()=>{
            alterAttributes(props.unit.attributes)
        }, [])

        function alterAttributes(unitAttributes){
            //console.log(props.unit)
            const newObject = []
            unitAttributes.forEach((item, index)=>{
                const class_name = item.attribute_class.name
                const class_id = item.attribute_class.id
                const attribute_id = item.id
                const attribute_name = item.name
               if (!newObject[class_id]){
                    newObject[class_id] = {name: class_name, id: class_id,
                                    attributes: [{id: attribute_id, name:attribute_name}]}
               } else {
                newObject[class_id].attributes.push({id: attribute_id, name:attribute_name})
               }
            })
            //console.log(newObject)
            let multiObject = []
            let limitedObject = []
            newObject.forEach((entry)=>{
                if(entry.attributes.length > 1){
                    multiObject.push(entry)
                } else {
                    limitedObject.push(entry)
                }
            })
            setMultiAttributes(multiObject)
            setLimitedAttributes(limitedObject)
        }


        function handleAttributes(e){
            // ref framework was created earlier with the type selector
           
            let attributeArray = Array.from(e.target.selectedOptions, option => option.value)
            multiAttributeRef[e.target.name] = attributeArray
            console.log(multiAttributeRef)


        }


        let addToInventory = async(newInv, again) => {
            
            // let response = await fetch('/api/gear/newinventory',
            //     {method: 'POST',
            //     headers: {'Content-Type': 'application/json',
            //             'Authorization':'Bearer ' + String(authTokens.access)},
            //     body: JSON.stringify(newInv)
            // })
            // if (response.status === 200){
            //     let data = await response.json()
                
            //     navigate('/inventory')
                
            // }

            if (again){
                setStep(0)
            } else{navigate('/inventory')}
            
        }
    
        // send all the new inventory information to the database
        function handleInventoryForm(nextStep){
            let again = false
            if (nextStep === 'again'){
                again = true
            }
            let attributeArray = []

            multiAttributes?.forEach((attributeclass)=>{
                
                if (multiAttributeRef[attributeclass.name]){
                    if (multiAttributeRef[attributeclass.name].length > 0){
                        multiAttributeRef[attributeclass.name].forEach((attribute)=>{
                        attributeArray.push(parseInt(attribute))
                    })
                }
                }
                
                
            })
            if(limitedAttributes){
                limitedAttributes.forEach((item)=>{
                    item.attributes.forEach((attribute)=>{
                        attributeArray.push(attribute.id)
                    })
                })
            }
                let data = {
                    make_id: step0Make.id,
                    unit_id: step0Unit.id,
                    purchase_price: purchaseRef.current.value * 100,
                    serial_numbers: serialRef.current.value.split(','),
                    rental_price: rentalRef.current.value * 100,
                    notes: notesRef.current.value,
                    quantity: quantityRef.current.value * 1,
                    attributes: attributeArray
                    
                    
                }
                
            addToInventory(data, again);
            console.log("submitInventory Run")
            
        }

    

        return (
            <>
            <h4>{props.make.name} {props.unit?.name}</h4>
            
                
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
                            <input type="number" name="purchase-price" id="purchase-price" ref={purchaseRef} defaultValue={props.unit?.value / 100} />
                        </div>
                    </div>
                    <div className="input-container col-2">
                        <div>
                            <label htmlFor="rental-rate">Rental Rate</label>
                        </div>
                        <div>
                            <input type="number" name="rental-rate" id="rental-rate" ref={rentalRef} defaultValue={(props.unit?.value / 100)/10} />
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
                {props.unit? 
                    <AttributeSelectors onChange={handleAttributes} attributes={multiAttributes}/>:<></>
                }
                <NextButton onClick={()=>handleInventoryForm("done")} title={'Add to Inventory'} />
                <NextButton onClick={()=>handleInventoryForm("again")} title={'Add to Inventory and Add Another'} />
               
                </>
            
            
          
        )
    }
    return (
        
        
        <div className='form-container invadd'>
            <h2>Add an item</h2>
            {step === 0 && 
                <Step0 />
            }

            {step === 1 &&
            
               <Step1 make={step0Make}/>
             
            }
            {step === 2 &&
                <Step2 make={step0Make} unit={step0Unit} />
            }

        
            
            
            
            


        </div>
        
            
        
           
    )
        

    

}

export default InventoryAddForm