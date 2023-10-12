import React, { useState, useEffect, useMemo, useRef} from 'react'

const InventoryAddForm = () => {
    let [step, setStep] = useState(0)
    const [makes, setMakes] = useState(null)
    let [selectedMake, setSelectedMake] = useState(null)
    let [units, setUnits] = useState([])
    let [selectedUnit, setSelectedUnit] = useState(null)
    let [newElement, setNewElement] = useState(false)
    let [searchTerm, setSearchTerm] = useState('')
    let [error, setError] = useState(null)

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

    const inputRef = useRef(null);
  

  // when a user selects a make, setUnits to fill in the datalist of units
    function handleMakes(e){
        
        const makeName = e.target.value;
        
        console.log(makeName)
        const fetchUnits = async (makeName) =>{
            let response = await fetch(`/api/gear/units/make/${makeName}`)
            let data = await response.json()
            if(response.status === 200) {
                setSelectedMake(makeName)
                setUnits(data)
                
                console.log(data)
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

    



    function handleNext(e){
        if(newElement){
            if(inputRef.current.value === ""){
                setError("A model name must be given");
                return
            }
            if (inputRef.current.value.length < 5){
                setError("Model name is too short")
                return
            }
            setSelectedUnit(inputRef.current.value)
            setError(null);
        } else{
            console.log(selectedUnit);
        }
        let nextStep = step + 1;
        setStep(nextStep)
        
        
    }
    // function to grab the unit from the database if the user selects one that already exists
    let getUnit = async (unitID) => {
        let response = await fetch(`/api/gear/units/${unitID}`)
            let data = await response.json()
            if(response.status === 200){
                setSelectedUnit(data);
            } else{
                alert("Something wrong with unit select, sorry")
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
    function handleInventoryForm(e){
        e.preventDefault();
        console.log("submitInventory Run")
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
                            <select onChange={handleMakes} name="makes-slect" id="makes-select" defaultValue={selectedMake? selectedMake:'Choose'}>
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
                    ref={inputRef}
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
            <h4>{selectedMake} {selectedUnit?.name}</h4>
            {newElement?
                <><p>2. Looks like we have something new. Tell us about it</p></>
                :
                <>
                <p>Great, we have that on file and can do a lot of the work for you!</p>
                <p>Tell us a few things about this item and you're all set.</p>

                <div className="display-flex">
                    <div className="input-container col-2">
                        <div>
                            <label htmlFor="quantity">How Many?</label>
                        </div>
                        <div>
                            <input type="number" name="quantity" id="quantity" defaultValue='1' />
                        </div>
                    </div>
                    <div className="input-container col-5">
                        <div>
                            <label htmlFor="serials">Serial #</label>
                        </div>
                        <div>
                            <input type="text" name="serials" id="serials" placeholder="enter serial #'s separated by ','" />
                        </div>
                    </div>

                    <div className="input-container col-3">
                        <div>
                            <label htmlFor="purchase-price">How much was it?</label>
                        </div>
                        <div>
                            <input type="number" name="purchase-price" id="purchase-price" defaultValue='300' />
                        </div>
                    </div>
                </div>

                <div className="display-flex">
                    <div className="input-container">
                        <div>
                            <label htmlFor=""></label>
                        </div>
                    </div>
                </div>
                </>
            }
            </>
        )
    }
    return (
        
        
        <div className='form-container invadd'>
            <h2>Add an item</h2>
            {step === 0 && 
                <Step0/>
            }

            {step ===1 &&
               <Step1 />
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