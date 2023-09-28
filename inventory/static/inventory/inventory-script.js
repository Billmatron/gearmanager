let inv_data;

let inventory_query_run = false;
async function inventoryQuery(page){
    // URL found on base.html
    const URL = inventory_query_url;
    const fetchPromise = await fetch(URL).then(res => res.json()).then(data => {
        inv_data = data;
        // put all current inventory data on the page
        populate_inventory_units(data, page);
        
        inventory_query_run = true;
    });
}



function populate_inventory_units(user_data, page){
    // grab all the tables on the page - they are created by jinja
    const tables = document.querySelectorAll(".inventoryTable");

    tables.forEach(table => {
        // grab tbody for the table
        const tbody = table.querySelector("tbody");
        tbody.setAttribute("page", page);
        // clear it out
        tbody.innerHTML = "";
        //sort user data by subtype
        
        var new_array = user_data[table.id].sort((a,b) => {
            if (a["model"]["subtype"] < b["model"]["subtype"]){
                return -1;
            }
            if (a["model"]["subtype"] > b["model"]["subtype"]){
                return 1;
            }
            
            return 0;
            
        });
        // create new rows of data
        new_array.forEach(unit => {
        
            
            // setup row for each unit in the list
            const row = document.createElement("tr");
            row.setAttribute("product", unit.id);
            row.setAttribute("inv_qty", unit.quantity);
            row.setAttribute("pack_qty", 0);
            row.setAttribute("quote_qty", 0)
            if (page == "inventory" || page == "quote"){
                row.setAttribute("page", "quote")
            }
            if (page == "package"){
                row.setAttribute("page", "package")
            }

            // set up table data for quantity
            const qty = document.createElement("td");
            qty.innerHTML = unit.quantity;
            // set up table data for make model
            const model = document.createElement("td");
            const model_url = inventory_unit_page.replace("UNITNUM", unit.id);
            model.innerHTML =  `<div>
                                    <a class="text-decoration-none" href="${model_url}">
                                    <span class="desktop">${titleFix(unit.model.make)}</span> ${titleFix(unit.model.model)}
                                    </a>
                                </div>
                                <div class="mobile"><small class="text-secondary">Mount: ${titleFix(unit.model.mount)}</small></div>`
            
            
            // setup table data for subtype
            const type = document.createElement("td");
            type.setAttribute("class", "desktop");
            type.innerHTML = titleFix(unit.model.subtype);
            //setup table data for mount
            const mount = document.createElement("td");
            mount.setAttribute("class", "desktop");
            mount.innerHTML = titleFix(unit.model.mount);

            //setup table data for rate
            const rate = document.createElement("td");
            if (!unit.rate){
                rate.innerHTML = `<a href="${model_url}">TBD</a>`
            } else {
                rate.innerHTML = formatter.format(unit.rate / 100);
                
            }
            // set removal button for inventory item
            const remove_btn = document.createElement("td");
            remove_btn.setAttribute("class", "desktop");
            remove_btn.innerHTML = `<button onclick="removeInv(${unit.id})" class="btn btn-danger">-</button>`

            // setup table data for buttons
            const pack_quote_quantity = document.createElement("td");
            const button_holder = document.createElement("td");
            pack_quote_quantity.setAttribute("class", "package-quantity text-end");
            button_holder.setAttribute("class", "inventory-button-column");
            

            // add TDs to the row
            row.appendChild(qty);
            row.appendChild(model);
            row.appendChild(type);
            row.appendChild(mount);
            if (page == "inventory" || page == "quote"){
                row.appendChild(rate)
            }
            if (page == "package" || page == "quote"){
                row.appendChild(pack_quote_quantity);
                row.appendChild(button_holder);
            }
            if (page == "inventory"){
                row.appendChild(remove_btn);
            }
            // add row to the tbody
            tbody.appendChild(row);
        });
    });
}


async function removeInv(unitNum){
    // function to remove item from users inventory
    // url found on base.html
    if (confirm("Are you sure you want to remove this from your inventory?")){
        const URL = remove_inventory.replace("UNITNUM", unitNum);
        const fetchPromise = await fetch(URL).then(res => res.json()).then(data => {
            
            if (data["status"] == "worked"){
                inventoryQuery("inventory")
            }
            
        });
        
    }

}
function inventory_select_change(){
    // initialize a variable or all selectors on the page
    const selectors = document.querySelectorAll(".unit-selector");
    // create copy of inventory data in order to change it
    let new_data = JSON.parse(JSON.stringify(inv_data));
    // grab page info from the tbody element
    const page = selectors[0].parentNode.parentNode.parentNode.querySelector("tbody").getAttribute("page");
    
    // iterate through selectors to get their values
    selectors.forEach(selector => {
        // get name of table changed
        const table_id = selector.parentNode.parentNode.parentNode.id;
        // pick out just the type that needs filtering
        let data_to_clean = new_data[table_id];
        // get a cleaned list 
        clean_data = clean_inventory_data(data_to_clean, selector.value);
         // replace old data with the clean stuff
        new_data[table_id] = clean_data;

    });
    
    populate_inventory_units(new_data, page);
    if (page == "quote"){
        populate_inv_table(quote, page)
    }
    if (page == "package"){
        populate_inv_table(package, page)
    }
    
}


function clean_inventory_data(data, subtype){
    if (subtype == "full-list"){
        return data
    }
    clean_data = [];
    
    data.forEach(unit => {
        if (unit.model.subtype == subtype){
            clean_data.push(unit)
        }
    });
    return clean_data
}

function populate_inv_table(data, page){
    
    if (page == "quote") {
        // if coming from the quote page, the inventory table needs to look one element deeper to find the units in the quote
        var contents = data.contents.units;
        
        
        populate_buttons(contents, ".inventory-button-column", "quote");
        
    } else {

        var contents = data.contents;
        populate_buttons(contents, ".inventory-button-column", "package");
    }
    
    

    // grab all tabs
    const tabs = document.querySelectorAll(".inv-tab > a");
    // check if tab contents have any package quantity
    
    // look through each tab to see if it's contents are in the quote/package to add red line above tab
    tabs.forEach(tab => {
        var tab_id = tab.id;
        // remove "Tab from end of id"
        tab_id = tab_id.slice(0, -3);
        var table_contents = document.querySelectorAll(`#${tab_id}Content > tr`);

        let in_package = false;
        
        for (let i=0; i<table_contents.length; i++){
            const pack_qty = table_contents[i].getAttribute("pack_qty");
            const quote_qty = table_contents[i].getAttribute("quote_qty");
            if (pack_qty != 0 || quote_qty != 0){
                in_package = true;
            }
           
        }
        
        // mark tabs that have contents in the quote/package
        if (in_package){
            tab.parentNode.classList.add('happy');
        } else{
            tab.parentNode.classList.remove("happy");
        }

    });
    

    
}

function inventory_table_dropdown(){
    // make variable from the dropdown selector 
    const catSelector = document.getElementById("inventory-list-select");
    // grab all of the gear tables
    const inventoryTables = document.querySelectorAll(".inventoryTable");
    // listen for change on selector
    catSelector.addEventListener('change', function(e){
        e.preventDefault();
        //get the value from the selector tag
        const value = catSelector.value;
        // make all inventoryTables invisible
        inventoryTables.forEach(table => {table.classList.add("d-none")});
        // find selected table
        const selectedTable = document.getElementById(value);
        // find accessory table for selected item
        const accessoryTable = document.getElementById(`${value}_accessory`)
        // make selected table visible - keep accessories with it. 
        if (selectedTable){
            selectedTable.classList.remove('d-none');
        if (accessoryTable){
            accessoryTable.classList.remove('d-none');
            }
        }
        // Full list was selected, so make all tables visible
        else{inventoryTables.forEach(table => {table.classList.remove("d-none")})}
    });
}
