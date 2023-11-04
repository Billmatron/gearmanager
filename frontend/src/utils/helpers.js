function sortInventory(data){
    data.sort((a,b)=>a.unit.types[0].name.localeCompare(b.unit.types[0].name) || a.name.localeCompare(b.name))
    return data
}


function cleanInventory(inventory){

    inventory.map((item)=>{
        const make = item.make.name
        const unit = item.unit.name
        const subtype = item.unit.subtypes[0].name
        const type = item.unit.types[0].name
        
        item = cleanAttributes(item)
        item['name'] = `${make} ${unit}`
        item['category'] = `${capitalizeFirstLetter(type)}, ${capitalizeFirstLetter(subtype)}`
        
       
    })
    return sortInventory(inventory)
}

function cleanAttributes(unit){
    
    let classNames = new Set();
    let attributeArray = []
    
    
    // setep 1, fill out a class name set with unique names
    unit.attributes.map((item)=>{
        classNames.add(item.attribute_class.name)
    })

    // step2: use the set to create a unique item in array
    classNames.forEach((name)=>{
        attributeArray.push({name: name, attributes:[]})
    })

    // step3: put the attributes in the array
    unit.attributes.map((item)=>{
        attributeArray.forEach((arrayItem)=>{
        
            if(arrayItem.name === item.attribute_class.name){
              
                arrayItem.id = item.attribute_class.id
                arrayItem.attributes.push({id: item.id, name: item.name})
            }
        })
    })
    
    unit.cleanAttributes = attributeArray;
    
    return unit
}


function pullTypesFromInventory(inventory){
    let typesArray = []
    let nameSet = new Set()
    
    inventory.forEach((item)=>{
        nameSet.add(`${item.unit.types[0].name}, ${item.unit.types[0].id}`)
       
    })
    nameSet.forEach((item)=>{
        let split = item.split(',')
        typesArray.push({name:capitalizeFirstLetter(split[0]), id:parseInt(split[1])})
    })


    typesArray.sort((a,b)=> a.name.localeCompare(b.name))
   
    return typesArray
}




function unixConvert(ux_time){
    const date = new Date(ux_time *1000)
    const formatted_time = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
    
    return formatted_time;
}

function capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}



export {cleanInventory, cleanAttributes, unixConvert, pullTypesFromInventory, capitalizeFirstLetter, sortInventory}


