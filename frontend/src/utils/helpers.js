function cleanInventory(inventory){

    inventory.map((item)=>{
        const make = item.make.name
        const unit = item.unit.name
        item['name'] = `${make} ${unit}`

       
    })
    return inventory
}

function unixConvert(ux_time){
    const date = new Date(ux_time *1000)
    const formatted_time = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
    
    return formatted_time;
}


export {cleanInventory, unixConvert}


