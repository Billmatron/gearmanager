import React, { useState, useEffect, useContext, useRef, } from 'react'
import { useNavigate } from 'react-router-dom'
import {InputContainer, TextArea, TextInput, SearchField, SelectInput, NumInput, StyledTextArea, StyledTextInput, StyledInputContainer} from './FormInputs'
import {NextButton, StyledSaveButton, StyledDiscardButton} from '../Buttons'
import {FormCard, InstructionCard} from '../Cards'
import {AttributeSelectors, 
    AttributeSelectorsSingle, StyledAttributeCard} from '../AttributeSelector'
import AuthContext from '../../context/AuthContext'
import {StyledExpandedRow, StyledColumn, StyledRow} from '../Spreadsheet'
import {StyledFlexDiv, StyledDiv, StyledLineBreak} from '../styles/Containers.style'
import {cleanAttributes} from '../../utils/helpers'


export const InventoryAddForm = ({closeForm}) => {
    const [step, setStep] = useState(0)
    const [step0Make, setStep0Make] = useState(null)
    const [step0Unit, setStep0Unit] = useState(null) 
    const [step0NewUnitName, setStep0NewUnitName] = useState(null)

    const {authTokens} = useContext(AuthContext)

    let navigate = useNavigate();
  



// //////////////////   COMPONENTS ////////////////////////////////






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
            const make_id = parseInt(id);
            
            
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
   
                <FormCard cardTitle={'Pick a maker'} error={error} closeCard={closeForm}>
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
                if(type.id === parseInt(e.target.value)){
                    setSubtypes(type.subtypes);
                    setSelectedType(type);
                    setAttributes(type.attributeclass)
                    
                    // create attributeRef container for future updates
                    type.attributeclass.forEach((className)=>{
                        attributeRef[className.name] = []
                    })
                    attributeRef["current"] = []
                    
                    
                }
            })
        }
    
        function handleSubtypeSelect(e){
            subtypes.forEach((subtype) => {
              
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

            
            postNewUnit(newUnit);
            setStep(2);    
        }
        
        return (
            <>
            <FormCard error={error} cardTitle={`New item from ${props.make.name}`} closeCard={closeForm}>
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
            
            
                
                <FormCard error={error} cardTitle={`${props.make.name} ${props.unit?.name}`} closeCard={closeForm}>
                
                    
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
        <>
            
                {step === 0 && 
                    
                    <Step0 />

                }

                {step === 1 &&
                    
                    <Step1 make={step0Make} newUnit={step0NewUnitName}/>
      
                }

                {step === 2 &&

                    <Step2 make={step0Make} unit={step0Unit} />
 
                }
        </>
       
    )

}


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// ADD FORM INSIDE OF SPREADSHEET //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


export const InvAddForm = (props)=>{
    const date = new Date();

    const [selectedAtts, setSelectedAtts] = useState(null)
    const [newItem, setNewItem] = useState(false)
    const [newInv, setNewInv] = useState({quantity:1, name:"",create_ux:parseInt((date.getTime())/1000), 
                                            weight:0, weight_unit:453, value:0, rate:0,
                                            serial_number:"", notes:"", manual_link:""})
    const [makes, setMakes] = useState(null)
    const [units, setUnits] = useState(null)
    const [selectedMake, setSelectedMake] = useState(null)
    const [selectedUnit, setSelectedUnit] = useState(null)
    const [error, setError] = useState(null)
    const [reset, setReset] = useState(false)
    const [types, setTypes] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [subtypes, setSubtypes] = useState(null)
    const [selectedSubtype, setSelectedSubtype] = useState(null)
    const [attributes, setAttributes] = useState(null)
    const [attributeClasses, setAttributeClasses] = useState(new Set())
    const {authTokens} = useContext(AuthContext)

    let navigate = useNavigate();
    // hold onto input from the Unit search bar
    let inputRef = useRef()


    const weight_units = [{name:'lbs', id:453},
                            {name:'kgs', id:1000},
                            {name:'g', id:1},
                            {name:'oz', id:28}]

    // start the component off by grabing all the makes from the database
   
    
    // get all the initial types to start the system off
    
    useEffect(()=>{
        // function to grab all the types and subtypes
        async function getTypes(){
            let response = await fetch('/api/gear/types')
            let data = await response.json()
            if(response.status === 200){
                setTypes(data)
                
            }else{
                alert("issue with getTypes")
            }
        }
            getTypes()

           

    }, [])

    useEffect(()=>{
        if(types){
            
            if(props.selectedType != 'all'){
                console.log(props.selectedType)
                const x = {target:{value:props.selectedType}}
                handleTypeSelect(x)
            }
        }
    },[types])

    useEffect(() => {
        
        async function fetchMakes(){
            let response = await fetch(`/api/gear/makes/${selectedType.id}`)
            let data = await response.json()
            if(response.status === 200){
                setMakes(data)
            }
        }
        if (selectedSubtype){
            fetchMakes();
        }
    
    }, [selectedSubtype])



    function handleTypeSelect(e){
        // reset things if selecting this a second time
        console.log(e.target.value)
        setNewItem(false)
        setSelectedUnit(null)
        setSelectedMake(null)
        setReset(true)
        types.forEach((type) => {
            if(type.id === parseInt(e.target.value)){
                setSelectedType(type);
                setSubtypes(type.subtypes);
                
                
                // create attributeRef container for future updates
            }
        })
    }

    function handleSubtypeSelect(e){
        subtypes.forEach((subtype) => {
            
            if(subtype.id === parseInt(e.target.value)){
                setSelectedSubtype(subtype)  
                setReset(false)
            }
        })
    }
    
    // when a user selects a make, setUnits to fill in the datalist of units
    function handleMakesSelect(e){
        
        const make_id = parseInt(e.target.value);
        //reset elements if starting again
        setSelectedUnit(null)
        setNewItem(false)

        makes.forEach((make)=>{
            
            if (make.id === make_id){
                // set selected make on the global inventory form state
                setError(null)
                make = cleanAttributes(make)
                setSelectedMake(make)
                
            }
        })

        const fetchUnits = async (make_id) =>{
            let response = await fetch(`/api/gear/units/maketypesubtype/${make_id}/${selectedType.id}/${selectedSubtype.id}`)
            let data = await response.json()
            if(response.status === 200) {
                // set all units of selected make on component state
                
                setUnits(data)
                
                }else {
                    console.log(`Failed to get ${make_id}`)
                }
        }

        const fetchAttributes = async (make_id, type_id)=>{
            let response = await fetch(`api/gear/attributes/filter/${make_id}/${type_id}`)
            let data = await response.json()
            if(response.status === 200){
                console.log("success")
                const newData = {attributes:data}
                const cleanedData = cleanAttributes(newData)
                setAttributes(cleanedData.cleanAttributes)
            } else {
                alert("something wrong w/ fetch attributes")
            }
        }
        fetchUnits(make_id);
        fetchAttributes(make_id, selectedType.id)

    }



    function handleUnitSelect(e){
        const unit_id = e.target.value;
        if (unit_id === 'new'){
            setNewItem(true)
            setSelectedUnit(null)
            return
        } else{
            setError(null)
            setNewItem(false)
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
            getUnit(unit_id)
        }
      
    }
   

    function handleDateChange(e){
        
        const dateArray = e.target.value.split("-");
        const year = dateArray[0];
        const month = parseInt(dateArray[1], 10) - 1;
        const day = dateArray[2];
        const _entryDate = new Date(year, month, day);
        setNewInv({...newInv, create_ux:parseInt((_entryDate.getTime())/1000)})
        
    }

    function handleAttributeSelector(e){
        let attributeArray = Array.from(e.target.selectedOptions, option => parseInt(option.value))
        setSelectedAtts(attributeArray)
        
    }

  
    function handleSave(){
        let unit_id;
        
       
        if (newItem){
            unit_id = null
            if(newInv.name.length < 8){
                setError("New unit name is too short")
                return
            }
            if(newInv.name.length === 0){
                setError("Must give the thing a name")
                return
            }
            // if(newInv.weight <= 0){
            //     setError("Take the time to set a weight. It's worth it")
            //     return
            // }
            // if(newInv.value <=0){
            //     setError("Was it free?")
            //     return
            // }
        
        } else{
            unit_id = selectedUnit.id
        }
        
        const data = {unit_id: unit_id, quantity:parseInt(newInv.quantity),make_id: selectedMake.id, type_id:selectedType.id,
            subtype_id:selectedSubtype.id, name:newInv.name, create_ux:newInv.create_ux,
            weight: newInv.weight*1, weight_unit:newInv.weight_unit*1,
            value:newInv.value *100, rate:newInv.rate*100, serial_number:newInv.serial_number.split(','),
            notes:newInv.notes, manual_link:newInv.manual_link,
            attributes:selectedAtts}
       console.log(data)
        addToDatabase(data)
    }

    async function addToDatabase(data){
        let response = await fetch('/api/gear/newinventory2',
                            {method: 'POST',
                            headers: {'Content-Type': 'application/json',
                                    'Authorization': "Bearer " + String(authTokens.access)},
                            body: JSON.stringify(data)})
        if(response.status === 200){
            console.log('success')
            setError(null)
            props.closeForm()
        }else{
            alert('something went wrong with addToDatabase')
        }
    }

    return(
        <StyledExpandedRow id={props.id} $height={'auto'}>
            <StyledRow $active={false} id={'styled-row1'}>
                <StyledColumn $gridArea={'qty'} $number={true}>
                    <input type="number" name="qty" id="qty" 
                        defaultValue={1} 
                        onChange={(e)=>setNewInv({...newInv, quantity:e.target.value})} />
                </StyledColumn>

                <StyledColumn $gridArea={'category'} id={'category-column'} >
                    <StyledFlexDiv id={'category-flex'} $flexWrap={'nowrap'}>
                            {types && 
                            <>
                            <SelectInput
                                onChange={handleTypeSelect}
                                defaultValue={props.selectedType !='all'? props.selectedType:"Choose"}
                                disabledText="What is it?"
                                iterableElement={types}
                                label='Category'/>

                        <SelectInput
                                onChange={handleSubtypeSelect}
                                defaultValue={selectedSubtype? selectedSubtype.id:"Choose"}
                                disabledText="Sub-category"
                                iterableElement={subtypes}
                                label="Subtype"/>
                            </>
                                
                        } 

                    </StyledFlexDiv>
                   
                
                </StyledColumn>    

                <StyledColumn $gridArea={'name'}  $selectWidth={'50'}>
                    {(makes && !reset) &&
                        
                        <SelectInput label={'make'}
                            iterableElement={makes}
                            defaultValue={selectedMake? selectedMake.id: 'Choose'}
                            disabledText={'Choose a make'}
                            onChange={handleMakesSelect}
                            $width={'50'}
                            />
                    }
                    {(units && !reset) &&
                       
                        <SelectInput label={'unit'}
                            iterableElement={units}
                            defaultValue={selectedUnit? selectedUnit.id: 'Choose'}
                            disabledText={'Choose a model'}
                            onChange={handleUnitSelect}
                            endselector={<option key='new' value={'new'}>New Unit</option>}
                            $width={'50'}
                            />
                    }
                    {newItem &&
                        <TextInput label={'new-unit-name'}
                            placeholder = {'New unit name'}
                            onChange={(e)=>setNewInv({...newInv, name:e.target.value})}
                        />
                    }
                </StyledColumn>


                

                <StyledColumn $gridArea={'date'} $number={'true'}>
                    <input type="date" name="date" id="date"
                        defaultValue={date.toLocaleDateString('en-CA')} 
                        onChange={handleDateChange}
                    />
                </StyledColumn>



                {newItem && 
                    <StyledColumn $gridArea={'weight'}>
                    
                    <input type='number' label={'weight'}
                        onChange={(e)=>setNewInv({...newInv, weight:e.target.value})}
                        defaultValue={'0'}/>
                    
                
                    <SelectInput iterableElement={weight_units} label={'weight-units'}
                        onChange={(e)=>setNewInv({...newInv, weight_unit:e.target.value})}
                        />
                   
                </StyledColumn>
                }


                {selectedUnit &&
                    <StyledColumn $gridArea={'weight'} $number={true}>
                        {selectedUnit.weight_g}g

                    </StyledColumn>
                }
                
                    
                {(selectedUnit || newItem) &&       
                    <>
                        <StyledColumn $gridArea={'price'} $number={'true'}>
                    {/* {`$${(item.purchase_price/100).toLocaleString("en-US")}`} */}
                    
                        <input type="number" name="price" id="price"
                        defaultValue={selectedUnit? selectedUnit.value/100:'0'}
                        onChange={(e)=>setNewInv({...newInv, value:e.target.value})}  />
                       
                    
                </StyledColumn>

                <StyledColumn $gridArea={'serial'}>
                        <input type="text" name="serial" id="serial"
                        defaultValue={''} 
                        onChange={(e)=>setNewInv({...newInv, serial_number:e.target.value})} /> 
                        <p>add serials separated by a comma</p>
                </StyledColumn>

                
                <StyledColumn $gridArea={'rate'} $number={'true'}>
                        <input type="number" name="rate" id="rate"
                        defaultValue={selectedUnit? (selectedUnit.value/20)/100:'0'}
                        onChange={(e)=>setNewInv({...newInv, rate:e.target.value})}  />
                        <p>per day</p>
                </StyledColumn>
                    </>
                
                }


            </StyledRow>
           
            
            {(newItem || selectedUnit) &&
           
           <>    
            
               <StyledLineBreak
                    $width={'85%'}
                    $marginTop={'2rem'}
                    $marginBottom={'2rem'}/>
                    
                <div className='grid-test' id={'attribute-helper-container'}
                               >
                    
                        <AttributeSelectorsSingle 
                                onChange={handleAttributeSelector} 
                                attributes={attributes}/>
                    
                    
                    <StyledAttributeCard id={'helper-text-card'} $width={'80%'}>
                        <h5>Helper Items</h5>
                        <p>Not required, but helpful</p>
                        
                     
                            <StyledInputContainer $childHeight={'30px'} $textAreaHeight={newItem? '50px':'80px'}>
                                {newItem &&
                                    <StyledDiv>
                                    <label htmlFor="manual">Manual URL</label>
                                    <input type="text" name="manual" id="manual" 
                                            placeholder='https://www.MyManual.com' 
                                            defaultValue={selectedUnit? selectedUnit.manual_link: ''}
                                            onChange={(e)=>setNewInv({...newInv, manual_link:e.target.value})}
                                            />
                                </StyledDiv>
                                }
                                
                                
                                <StyledDiv>
                                    <label htmlFor="notes">Notes</label>
                                    <textarea name="notes" id="notes" 
                                                placeholder='order #, issues, etc...'
                                                onChange={(e)=>setNewInv({...newInv, notes:e.target.value})}></textarea>
                                </StyledDiv>
                                
                            </StyledInputContainer>

                        
                    </StyledAttributeCard>

                </div>



</>
            }
            
           
            
            
         {error &&
            <StyledDiv $textAlign={'center'}>{error}</StyledDiv>
         }
            <StyledSaveButton onClick={handleSave}>Save</StyledSaveButton>
        </StyledExpandedRow>
    )
}