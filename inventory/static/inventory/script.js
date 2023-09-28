(function(){
    //console.log("link up is good");

    const formatter = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: 'USD'
    })
    

}());


function titleFix(str){
    str = str.toString();
    //const re = /\s([A-Z][a-z])\s|^([A-Z][a-z])\s|\s([A-Z][a-z])$/;
    //remove underscore
    str = str.replace("_", " ");
    // split up string by spaces
    string_array = str.split(/\s/);
    for (let i=0; i < string_array.length; i++){
        if (string_array[i] == "dslr" || string_array[i].length < 4 && string_array[i] != "box" && string_array[i] != "jaw" && string_array[i] != "end" && string_array[i] != 'pro' && string_array[i] != "arm" && string_array[i] != "hat" && string_array[i] != "kit"){
            string_array[i] = string_array[i].toUpperCase()
        } 
       
        else {
            string_array[i] = capitalizeFirstLetter(string_array[i]);
        }
        
    }
    return string_array.join(" ");

}
function capitalizeFirstLetter(str){
    if (!str){
        str = "";
        return str;
    }
    return str[0].toUpperCase() + str.slice(1);
}

var formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: 'USD'
})

function unix_convert(unix_time){
    const time = new Date(unix_time * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = time.getFullYear()
    const month = months[time.getMonth()];
    const date = time.getDate();

    var return_time = `${month} ${date}, ${year}`
    return return_time

}

function str_time_convert(str_time){
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const time_split = str_time.split("-");

    var return_time = `${months[(time_split[1] - 1)]} ${time_split[2]}, ${time_split[0]}`;
    return return_time

}
function tabSwitch(self, evt){
    // stop link from going to page
    evt.preventDefault();
    // populate tables when tabs are clicked. use contents variable which is being manipulated by user
    if (self.id == "packageTab" || self.id == "inventoryTab"){
        //populate_edit_package_table(clientside_contents);
        //populate_inv_buttons(clientside_contents);
    }
    
    // grab the container for the tabs and divs to be displayed
    var container = self.parentNode.parentNode.parentNode.parentNode;
    
    // grab each of the tabs in the header
    var tabs = container.querySelectorAll(".selectTab")
    // blank out header tabs and set clicked one to active
    tabs.forEach(tab => tab.classList.remove('active'));
    self.classList.add("active");
    // grab each div/page to be displayed
    var pages = container.querySelectorAll(".selectedPage");
    

    // blank out each page
    pages.forEach(page => page.classList.add('d-none'));
    // display the selected page by reading the href from the selected link.
    var heroPage = container.querySelector(self.getAttribute("href"));
    heroPage.classList.remove('d-none');

    // go through hero page to make sure first items are visible ul1 to active, tbody1 to visible
    var linkTabs = heroPage.querySelectorAll("li > a.first");
    
    if (linkTabs){
        linkTabs.forEach(link => link.classList.add('active'));
    }
    
    var tbodys = heroPage.querySelectorAll("tbody.first");
    tbodys.forEach(row => row.classList.remove('d-none'));
    
}


function packageButtonPress(self, evt){
    // stop the submit mechanism
    evt.preventDefault();
    // grab the page label
    const page = self.parentNode.parentNode.getAttribute("page");
    // grab the quote quantity
    let quote_qty = parseInt(self.parentNode.parentNode.getAttribute("quote_qty"));
    // grab the quantity that sits inside the button
    let pack_qty = parseInt(self.parentNode.parentNode.getAttribute("pack_qty"));
    // grab the inventory quantity
    const inv_qty = parseInt(self.parentNode.parentNode.getAttribute("inv_qty"));
    // grab the inventory number
    const product_id = parseInt(self.parentNode.parentNode.getAttribute("product"));
    
    // let contents = quote.contents;
    // let package_list = contents.packages;
    // let unit_list = contents.units;

    // set increment unit based on page
    if (page == "package") {
        // update client side contents
        if (self.classList.contains("plusButton")){
            
            pack_qty++;
            // update client side contents and re-populate the page
        
            if (pack_qty <= inv_qty){
                update_package_contents(product_id, pack_qty);
            }
            
        }

        if (self.classList.contains("minusButton")){
            
            pack_qty--;
            if (pack_qty >= 0){
                update_package_contents(product_id, pack_qty);
            }  
        }
    }

    if (page == "quote"){
        if (self.classList.contains("plusButton")){
            quote_qty++;

            if (quote_qty <= inv_qty) {
                console.log("quote page plus")
                update_quote_contents(product_id, quote_qty);
            }
        }

        if (self.classList.contains("minusButton")){
            quote_qty --;
            if (quote_qty >=0){
                console.log("quote page minus")
                update_quote_contents(product_id, quote_qty);
            }
        }
    }

    if (page == "pack-quote"){
        if (self.classList.contains('plusButton')){
            quote_qty ++;
            if (quote_qty <= pack_qty){
                update_quote_contents_package(product_id, quote_qty);
            }
        }

        if (self.classList.contains('minusButton')){
            quote_qty --;
            if (quote_qty >=0){
                update_quote_contents_package(product_id, quote_qty);
            }
        }
    }


}



async function update_db_totals(discount, unit, total){
    const URL = update_db_totals_url.replace("DISC", discount).replace("UNIT", unit).replace("TOTAL", total);
    const fetchPromise = await fetch(URL).then(res => res.json()).then(data => {
        
    });

}




function populate_buttons(contents, className, page){
    if (page == "quote"){var page_qty = "quote_qty"}
    if (page == "package"){var page_qty = "pack_qty"}

    // look for any columns set up by html for where to put our buttons
    const button_columns = document.querySelectorAll(className);
    //console.log(className)
    //console.log(contents);
    

    if (button_columns){
        button_columns.forEach(column => {

             // get inventory unit's info from row
            const inventory_id = parseInt(column.parentNode.getAttribute("product"));
            const inventory_qty = parseInt(column.parentNode.getAttribute("inv_qty"));
            const quote_qty = parseInt(column.parentNode.getAttribute("quote_qty"));

            // dom element that shows how many inventory units are in a package or quote
            const inv_table_package_qty = column.parentNode.querySelector('.package-quantity');
            

            // working with quote page, add a package module
            const package_id = parseInt(column.parentNode.getAttribute("pack_id"));
            const pack_qty = parseInt(column.parentNode.getAttribute("pack_qty"));

            //clear out column on refresh
            column.innerHTML = "";

            if (contents.length > 0){
                // iterate through contents 
                for (let i=0; i<contents.length; i++){
                    // create variables to check if package or inventory units are being sent to function
                    var inventory = contents[i].inventory;
                    var package = contents[i].package;
                    
                    // check for inventory id in quote or package and assign it to variable
                    if (inventory){
                        var quote_unit_id = inventory.id;
                        
                    }
                    if (package){
                        var quote_package_id = package.id;
                        //console.log(inventory_id, quote_unit_id);
                    }
                    
                    // check for match between button's inventory item and items in quote
                    let matches = 0;
                    if (inventory_id == quote_unit_id || inventory_id == quote_package_id){
                        // update table row quote quantity attribute with current quantity
                        const quote_unit_qty = contents[i].quantity;
                        column.parentNode.setAttribute(page_qty, quote_unit_qty);
                        
                        // update DOM of inventory table with current "in Quote" number
                        if (inv_table_package_qty){inv_table_package_qty.innerHTML = quote_unit_qty}
                        matches ++;
                        break;
                    } 
                    // no match is found between button's item and items in quote
                    else{
                        // update DOM of inventory table with zero
                        if (inv_table_package_qty){inv_table_package_qty.innerHTML = 0}
                        // set columns row information to match
                        if (matches == 0){
                            column.parentNode.setAttribute(page_qty, 0);
                        }
                        
                    }
                }
            }

            // If quote has no contents at all yet
            else {
                // update DOM of inventory table with zero
                if (inv_table_package_qty){inv_table_package_qty.innerHTML = 0}
                // set columns row information to match
                column.parentNode.setAttribute(page_qty, 0);
            }
            column.appendChild(makeMinusButton("-"));
            column.appendChild(makePlusButton("+"));
            
        });
        remove_useless_buttons(className, page)
    }
    
}





function makePlusButton(text){
    // create plus button
    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "btn btn-primary plusButton")
    plusButton.setAttribute("onclick", "packageButtonPress(this, event)");
    plusButton.innerHTML = text;

    return plusButton;
}

function makeMinusButton(text){
    //create minus button
    const minusButton = document.createElement("button");
    minusButton.setAttribute("class", "btn btn-danger minusButton");
    minusButton.setAttribute("onclick", "packageButtonPress(this, event)");
    minusButton.innerHTML = text;

    return minusButton;
}


function remove_useless_buttons(className, page){  
    // get inventory quantity
    button_columns = document.querySelectorAll(className);
    button_columns.forEach(column => {
        const inv_qty = column.parentNode.getAttribute("inv_qty");
        const pack_qty = column.parentNode.getAttribute("pack_qty");
        const quote_qty = column.parentNode.getAttribute("quote_qty");
        const minusButton = column.querySelector(".minusButton");
        const plusButton = column.querySelector(".plusButton");
        

        if (page == "quote"){var page_qty = quote_qty}
        if (page == "package"){var page_qty = pack_qty}

        // make the buttons disappear
        if (inv_qty == page_qty){
            plusButton.setAttribute("class", "d-none");
            plusButton.setAttribute("onclick", "")
            plusButton.innerHTML = "";
            
        }
        if (page_qty == 0){
            minusButton.setAttribute("class", "d-none");
            minusButton.setAttribute("onclick", "");
            minusButton.innerHTML = "";
        }

    });

}

function sortPackage(contents){
    let contents1 = contents.sort(compare_type);
    let contents2 = contents1.sort(compare_subtype);
    return contents2;
}

function compare_type(a, b){
    if (a.inventory.model.type < b.inventory.model.type){
        return -1;
    }
    if (a.inventory.model.type > b.inventory.model.type){
        return 1;
    }
    return 0;
}

function compare_subtype(a,b){
    if (a.inventory.model.type == b.inventory.model.type){
        if (a.inventory.model.subtype < b.inventory.model.subtype){
            return -1;
        }
        if (a.inventory.model.subtype > b.inventory.model.subtype){
            return 1;
        }
    }
    
    return 0;
}
    

function daysBetween(date1, date2){
    // get 1 day in milliseconds
    const one_day = 1000*60*60*24;

    // convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // calculate difference
    const difference_ms = date2_ms - date1_ms;

    //convert back to days and return
    return Math.round(difference_ms/one_day);
}


 // allow user to click on each dropdown when forms initiate searches
 // work with the search dropdown elements now that they are created
 function dropdownChooser(element, elementResult){
    
    // select all the search result elements
    let dropdowns = document.querySelectorAll(".matchpopup");
        
        // listen for click on search result
        dropdowns.forEach(listItem => {
            listItem.addEventListener('click', function(){
                // grab parent node to check which element it is from. must be done first
                const parent = this.parentNode;
                // clear out input field
                element.value = "";
                
                // add selected search result to the input field
                // first check if the element has an h4 tag. If so, find the text in there
                if (this.querySelector("h4")){
                    element.value = this.querySelector("h4").innerHTML
                } else{element.value = this.innerHTML;}
                
                // clear the search result dropdowns
                elementResult.innerHTML = "";

                // if click happened on the make input dropdown, fill out country
                if (parent.id == "result-make-list"){
                    queryCountry(parent);
                }
                
            });
        
        });
}
// listen for up, down, tab and hover for dropdown search result elements
let counter = -1
function keyDownListener(field, fieldResult){
    
    // add event listener for certain form keystrokes to desired element field
    field.addEventListener("keydown", function(evt){

    let dropdowns = document.querySelectorAll(".matchpopup");
        
    // LISTEN FOR DOWN ARROW
    if (evt.which === 40){ 
        // add one to the counter
        counter ++;
        // have the highlighted color follow the movement of the keydown
        // check if counter extends past length of dropdown list
        if (counter == dropdowns.length){
            // clear all highlighting from dropdown list
            dropdowns.forEach(element => {element.classList.remove("highlighted");
            // reset the counter
            counter = -1
            });
        }
        else{
            // clear highlighting from all dropdowns
            dropdowns.forEach(element => {
                
                element.classList.remove("highlighted");
            });
             // add highlighting to dropdown +1
            dropdowns[counter].classList.add("highlighted");
        }  
    }

    // LISTEN FOR UP ARROW
    if (evt.which === 38){
        
        if (counter != -1){
            // reduce the counter by one
            counter --;
            // have the highlighted color follow the movement of the keydown
            // check if counter extends short of dropdown list
            if (counter < 0){
                // clear all highlighting from dropdown list
                dropdowns.forEach(element => {element.classList.remove("highlighted")});
                // reset the counter
                counter = -1;
            }
            else {
                // clear highlighting from all dropdowns
                dropdowns.forEach(listItem => {
                listItem.classList.remove("highlighted");
            });
                // add highlighting to dropdown -1
                dropdowns[counter].classList.add("highlighted");
            }
        }
    }
    // LISTEN FOR TAB
    if (evt.which === 9){
        // grab the dom element in the search result list that is highlighted
        selected = document.querySelector(".highlighted");
        // if there is a highlighted element fill the field with that data and move on
        if (selected){
            const parent = selected.parentNode;
            // empty the form field
            field.value = "";
            // push the text from highlighted element to the text field
            // first search for an h4 tag to grab the correct innerhtml
            if (selected.querySelector("h4")){
                field.value = selected.querySelector("h4").innerHTML
            } else{field.value = selected.innerHTML;}
            
            // clear out the search results
            fieldResult.innerHTML = "";
            //reset count for if the user goes back to edit
            counter = -1;
            // if click happened on the make input dropdown, fill out country
            if (parent.id == "result-make-list"){
                queryCountry(parent);
            }
            
            }
        else {
            // clear the search result and reset the counter
            fieldResult.innerHTML = "";
            counter = -1;
            }          
        
        }
    });

     // mouseover the list tochange the class
    fieldResult.addEventListener('mouseover', function(evt){
        evt.target.classList.add('highlighted');
    });
    fieldResult.addEventListener('mouseout', function(evt){
        evt.target.classList.remove('highlighted');
    });
}
