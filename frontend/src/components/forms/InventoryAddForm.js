import React, { useState, useEffect, useContext, useRef, } from 'react'
import { useNavigate } from 'react-router-dom'
import {InputContainer, TextArea, TextInput, SearchField, SelectInput, NumInput} from './FormInputs'
import {NextButton} from '../Buttons'
import {FormCard, InstructionCard} from '../Cards'
import AuthContext from '../../context/AuthContext'


const InventoryAddForm = () => {
    const [step, setStep] = useState(0)
    const [step0Make, setStep0Make] = useState(null)
    const [step0Unit, setStep0Unit] = useState(null) 
    const [step0NewUnitName, setStep0NewUnitName] = useState(null)

    const {authTokens} = useContext(AuthContext)

    let navigate = useNavigate();
  

// //////////////////   COMPONENTS ////////////////////////////////



    let AttributeSelectors = ({onChange, attributes}) => {
        return (
            <div className='attribute-selector-container'>
                <h5>Select Attributes</h5>
                <p className='helper-text'>Hold down 'control' or 'command' on Mac to select more than one</p>
                <div className="display-flex wrap mt1">
                    
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
                </div>
        )
    }


    let Step0 = () => {
        const [makes, setMakes] = useState(null)
        const [units, setUnits] = useState(null)
        const [selectedMake, setSelectedMake] =useState(null)
        const [selectedUnit, setSelectedUnit] = useState(null)
        const [error, setError] = useState(null)

        // hold onto input from the Unit search bar
        let inputRef = useRef()

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
        function handleMakesSelect(id, name){
            const make_id = id;
            //const make_id = e.target.value;
            
            makes.forEach((make)=>{
                if (make.id === make_id){
                    // set selected make on the global inventory form state
                    setError(null)
                    setSelectedMake(make)
                }
            })
            
            const fetchUnits = async (make_id) =>{
                let response = await fetch(`/api/gear/units/make/${make_id}`)
                let data = await response.json()
                if(response.status === 200) {
                    // set all units of selected make on component state
                    
                    setUnits(data)
                    
                    }else {
                        console.log(`Failed to get ${make_id}`)
                    }
            }
            fetchUnits(make_id);
            
            
            
        }

        function handleUnitSelect(id, name){
            const unit_id = id;
            
            
            if (unit_id){
                // set global state to indicate new element is being added
                setError(null)
            
                // function to grab the unit from the database if the user selects one that already exists
                async function getUnit(unit_id) {
                    let response = await fetch(`/api/gear/units/${unit_id}`)
                    let data = await response.json()
                    if(response.status === 200){
                       
                        setError(null)
                        setSelectedUnit(data);
                    
                    } else{
                        alert("Something wrong with unit select, sorry")
                    }
                }
                getUnit(unit_id);
                
            }
        }
        function handleRef(value){
            inputRef.current = value;
            
        }
        function handleNext0(){
            if(!selectedMake){
                setError("Make Selection is Required")
                return
            }
            if (!inputRef.current && !selectedUnit){
                setError("Model Selection is Required")
                return
            }
            if (!selectedUnit && inputRef.current.length <8){
                console.log(inputRef.current)
                console.log(inputRef.current.length)
                setError ("Model name should be longer")
                return
            }
            
            if(inputRef.current && !selectedUnit){
                setStep0Make(selectedMake)
                setStep0NewUnitName(inputRef.current)
                setStep(1)

            }
            
             else {
             
                setStep0Make(selectedMake)
                setStep0Unit(selectedUnit)
                setStep(2)
            }
            
        }        
        
        return (
   
                <FormCard error={error}>
                    <InputContainer label="Make">
                    {makes &&
                        <SearchField
                            label='Make'
                            placeholder={'Search for manufacturers'}
                            searchElement={makes}
                            finishFunction={handleMakesSelect}
                            />
                    }
                    </InputContainer>
                    {units && 
                        <InputContainer label="Model">
                        
                        <SearchField
                                label='Model'
                                placeholder={'Search for a model'}
                                searchElement={units}
                                finishFunction={handleUnitSelect}
                                setGlobalItem={handleRef}
                                />
                            {/* <SelectInput
                                onChange={handleUnitSelect}
                                defaultValue={selectedUnit? selectedUnit.id:'Choose'}
                                disabledText={"Choose your model"}
                                iterableElement={units}
                                label = "Model" 
                                endselector={<><option value="new">Something New</option></>}/> */}
                        </InputContainer>
                    }
                    
                    <NextButton onClick={handleNext0} title={"Next"} classAdd={'next'}/>
                </FormCard>
    )}



    let Step1 = (props) => {

        const [error, setError] = useState(null)
        const [types, setTypes] = useState(null)
        const [selectedType, setSelectedType] = useState(null)
        const [subtypes, setSubtypes] = useState(null)
        const [selectedSubtype, setSelectedSubtype] = useState(null)
        const [attributes, setAttributes] = useState(null)
        const [weightUnit, setWeightUnit] = useState(453) //set for pounds to be first up
        const [newUnitName, setNewUnitName] = useState()
        const [value, setValue] = useState(0)
        const [manualLink, setManualLink] = useState('')
        const [weight, setWeight] =useState(0)
        
        
        const attributeRef = useRef()
        
        const weight_units = [{name:'lbs', id:453},
                            {name:'kgs', id:1000},
                            {name:'g', id:1},
                            {name:'oz', id:28}]

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
    
        }, [props.make.name])

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
                // add the created unit to the state of the top level component
                setStep0Unit(data);
            } else {
                alert("Problem uploading new model to database")
            }
            
        }


        function handleTypeSelect(e){
            
            types.forEach((type) => {
                if(type.id === e.target.value){
                    setSubtypes(type.subtypes);
                    setSelectedType(type);
                    setAttributes(type.attributeclass)
                    console.log(type)
                    // create attributeRef container for future updates
                    type.attributeclass.forEach((attribute)=>{
                        attributeRef[attribute.name] = []
                    })
                    attributeRef["current"] = []
                    
                    
                }
            })
        }
    
        function handleSubtypeSelect(e){
            subtypes.forEach((subtype) => {
                //console.log(subtype.name)
                if(subtype.id === e.target.value){
                    setSelectedSubtype(subtype)  
                }
            })
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
                if (newUnitName < 10){
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
            let newUnit = {name: newUnitName,
                            make: props.make.id,
                            value: value * 100,
                            weight_g: weight * weightUnit,
                            manual_link: manualLink,
                            attributes: attributeArray,
                            type: selectedType.id,
                            subtype: selectedSubtype.id}

            console.log(newUnit)
            postNewUnit(newUnit);
            setStep(2);    
        }
        
        return (
            <>
            <FormCard error={error} cardTitle={`New item from ${props.make.name}`}>
                <InputContainer label='New Model Name'>
                    <TextInput
                        label="New Model Name"
                        placeholder={"name of the model to add"}
                        setValue={props.newUnit}
                        onChange={(e)=>{setNewUnitName(e.target.value)}}
                    />
                </InputContainer>
                
                <InputContainer label='Category'>
                    <SelectInput
                        onChange={handleTypeSelect}
                        defaultValue={selectedType? selectedType.name:"Choose"}
                        disabledText="What is it?"
                        iterableElement={types}
                        label='Category'
                    />
                </InputContainer>
                <InputContainer label='Subtype'>
                    <SelectInput
                        onChange={handleSubtypeSelect}
                        defaultValue={selectedSubtype? selectedSubtype.name:"Choose"}
                        disabledText="What is it?"
                        iterableElement={subtypes}
                        label="Subtype"
                    />
                </InputContainer>

                <div className="input-container">
                    <div className="display-flex justify-around">
                        <InputContainer label='Value' classAdd={'col-4'}>
                            <NumInput
                                onChange={(e)=>setValue(e.target.value)}
                                label='Value'
                                defaultValue={value}/>
                        </InputContainer>
                        <InputContainer label='Weight' classAdd={'col-4'}>
                            <div className="display-flex">
                                <NumInput
                                    onChange={(e)=>setWeight(e.target.value)}
                                    label='Weight'
                                    defaultValue={weight}/>
                                <SelectInput
                                    onChange={(e)=>setWeightUnit(e.target.value)}
                                    iterableElement={weight_units}
                                    label='weight_unit'
                                />

                            </div>
                        
                        </InputContainer>
                    </div>
                    
                </div>

                <InputContainer label="Manual Link">
                    <TextInput
                        label='Manual Link'
                        placeholder='http://UserManual.com'
                        onChange={(e)=>setManualLink(e.target.value)}/>
                </InputContainer>

                {selectedType &&
                
                    <AttributeSelectors onChange={handleAttributeSelector} attributes={attributes}/>
                   
                }
                <div className='display-flex justify-center'>
                    <div className="me2">
                    <NextButton onClick={()=>setStep(0)} title={"Previous"} classAdd='previous' />
                    </div>
                
                    <NextButton onClick={handleNext1} title={"Add to Database"} classAdd='next'/>
                </div>
            </FormCard>
            
            
            
            </>
        )
    }



    let Step2 = (props) => {
        
        const [limitedAttributes, setLimitedAttributes] = useState()
        const [multiAttributes, setMultiAttributes] = useState()
        const [error, setError] = useState(null)
        const [serial, setSerial] = useState("")
        const [quantity, setQuantity] = useState(1)
        const [purchasePrice, setPurchasePrice] = useState(props.unit?.value / 100)
        const [rentalRate, setRentalRate] = useState((props.unit?.value / 100)/10)
        const [notes, setNotes]= useState("")
       
        let multiAttributeRef = useRef({current:[]})
        useEffect(()=>{
            alterAttributes(props.unit.attributes)
        }, [props.unit.attributes])

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
            
            let response = await fetch('/api/gear/newinventory',
                {method: 'POST',
                headers: {'Content-Type': 'application/json',
                        'Authorization':'Bearer ' + String(authTokens.access)},
                body: JSON.stringify(newInv)
            })
            if (response.status === 200){
                
                if (again){
                    setStep(0)
                } else{navigate('/inventory')}
                
            } else{
                setError(true)
                alert("something went wrong with addToInventory")
            }

            
            
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
                    purchase_price: purchasePrice * 100,
                    serial_numbers: serial.split(','),
                    rental_price: rentalRate * 100,
                    notes: notes,
                    quantity: quantity * 1,
                    attributes: attributeArray
                    
                    
                }
                
            addToInventory(data, again);
            console.log("submitInventory Run")
            
        }

    

        return (
            <>
            
            
                
                <FormCard error={error} cardTitle={`${props.make.name} ${props.unit?.name}`}>
                
                    
                        <div className="display-flex justify-around">
                            <InputContainer label='Quantity' classAdd='col-2'>
                                <NumInput
                                    label='Quantity'
                                    defaultValue={quantity}
                                    onChange={(e)=>setQuantity(e.target.value)}
                                    />
                            </InputContainer>
                            <InputContainer label='Purchase Price' classAdd='col-3'>
                                <NumInput
                                    label='Purchase Price'
                                    onChange={(e)=>setPurchasePrice(e.target.value)}
                                    defaultValue={purchasePrice}
                                    front='$'
                                />
                            </InputContainer>
                            <InputContainer label='Rental Rate' classAdd='col-3'>
                                <NumInput
                                    label='Rental Rate'
                                    onChange={(e)=>setRentalRate(e.target.value)}
                                    defaultValue={rentalRate}
                                    front='$'
                                    back='/day'
                                />
                            </InputContainer>
                            
                        </div>
                            
                        <InputContainer label='Serial #s' classAdd='col-11'>
                                <TextInput
                                    label="Serial"
                                    onChange={(e)=>setSerial(e.target.value)}
                                    placeholder={'enter serial #s separated by commas'}
                                    />
                        </InputContainer>
                      

                    <InputContainer label='Notes' classAdd='col-11'>
                        <TextArea
                            placeholder={'purchase location, order number, etc'}
                            label="Notes"
                            onChange={(e)=>setNotes(e.target.value)}
                            />
                    </InputContainer>
                    {props.unit && 
                        <AttributeSelectors onChange={handleAttributes} attributes={multiAttributes}/>
                    }
                    <NextButton onClick={()=>handleInventoryForm("done")} title={'Add to Inventory'} classAdd={'next'}/>
                <NextButton onClick={()=>handleInventoryForm("again")} title={'Add to Inventory and Add Another'} classAdd={'next'}/>
                </FormCard>
                
                
                
               
                </>
            
            
          
        )
    }





    return (
        
        <main className='display-flex justify-evenly'>
            
                {step === 0 && 
                <>
                    <InstructionCard
                    title="Lets Add a Toy!"
                    step1="Search for a brand"
                    step2="If you don't see the model, we can add a new one"/>
                    <div className="col-7">
                        <Step0 />
                    </div>
                    
                </>
                    
                }

                {step === 1 &&
                <>
                    <InstructionCard
                        title="Add a New Model"
                        step1="We have to add this one to the database first"
                        step2="Fill out as much as you can, it is very helpful later on"
                    />
                    <div className="col-7">
                        <Step1 make={step0Make} newUnit={step0NewUnitName}/>
                    </div>
                    
                </>
                
                
                }
                {step === 2 &&
                <>
                <InstructionCard
                    title="Inventory Specifics"
                    step1="Separate Serials by a comma"/>
                <div className="col-7">
                    <Step2 make={step0Make} unit={step0Unit} />
                </div>
                
                </>
                    
                }

         
        </main>
        
        
            
        
           
    )
        

    

}

export default InventoryAddForm