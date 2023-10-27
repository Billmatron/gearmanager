function cleanInventory(inventory){

    inventory.map((item)=>{
        const make = item.make.name
        const unit = item.unit.name
        const subtype = item.unit.subtypes[0].name
        const type = item.unit.types[0].name
        item['name'] = `${make} ${unit}`
        item['category'] = `${capitalizeFirstLetter(type)}, ${capitalizeFirstLetter(subtype)}`
        
       
    })
    return inventory
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



export {cleanInventory, unixConvert, pullTypesFromInventory, capitalizeFirstLetter}


