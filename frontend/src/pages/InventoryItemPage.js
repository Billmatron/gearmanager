import React, {useState, useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {FormCard} from '../components/Cards'
import {InputContainer, TextInput, TextArea, NumInput} from '../components/forms/FormInputs'
import {NextButton} from '../components/Buttons'
import AuthContext from '../context/AuthContext'



const InventoryItemPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [unit, setUnit] = useState(location.state.unit);
  const {authTokens} = useContext(AuthContext)

  async function handleSubmit(){
    let updatedUnit = unit
    delete updatedUnit.name
    console.log(updatedUnit)
    let response = await fetch(`/api/gear/inventory/edit/${updatedUnit.id}`, 
            {method: 'PUT',
            headers: {'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)},
            body: JSON.stringify(updatedUnit)
            })
            if (response.status === 200){
              navigate('/inventory')
              
            } else{
              alert('something went wrong in handleSubmit')
            }
  }

  function goBack(){
    navigate('/inventory')
  }
  return (
        <FormCard cardTitle={unit.name}>
          <InputContainer label='Label'>
            <TextInput
              label='Label'
              setValue={unit?.label}
              onChange={(e)=>{setUnit((unit)=>({...unit, label:e.target.value}))}}
            />
          </InputContainer>
          <InputContainer label="Rental">
            <NumInput
              label='Rental'
              defaultValue={unit?.rate / 100}
              onChange={(e)=>{setUnit((unit)=>({...unit, rate:e.target.value *100}))}}
              front="$"
              back={'/day'}
            />

            
          </InputContainer>
          <InputContainer label='Serials'>
              <TextInput 
                lable='Serials'
                setValue={unit?.serial_number}
                onChange={(e)=>{setUnit((unit)=>{return({...unit, serial_number:e.target.value})})}}
              >

              </TextInput>
          </InputContainer>

          <InputContainer label='Notes'>
            <TextArea
              label='Notes'
              placeholder={'Add any notes'}
              defaultValue={unit?.notes}
              onChange={(e)=>{setUnit((unit)=>({...unit, notes:e.target.value}))}}
            />
          </InputContainer>
          <div className="display-flex justify-center">
          <NextButton onClick={goBack} title={'Back'} classAdd={'previous me2'}/>
          <NextButton onClick={handleSubmit} title={'Save'} classAdd={'next'}/>
          </div>
          
        </FormCard>
    
  )
}

export default InventoryItemPage