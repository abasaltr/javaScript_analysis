// from data.js
var tableData = data;

// YOUR CODE HERE!
console.log('This is UFO-level 1 js file - Reza Abasaltian');

// function that appends a table to html page and adds new rows of data for each UFO sighting.
// Passing parameters are html table, and tableData assigned from data.js,
// Search parameters are date field from user input html form, and a boolean flag based on user clicking 'Filter' or 'Reset' button   
function createUFO(table, data, date, filter) {
    // variable used to display error message if no data is found by search criteria, by default set to true
    var errormsg = true;
    // loop through the contents of data based on total records and create a new row in html table (<tr>) for each using method insertRow(),
    // assign each iteration of record to a new variable as an object type 
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        var ufo = data[i];
        // loop through each column of the object record and check for matching search parameter using conditional statement
        for (var j = 0; j < Object.keys(ufo).length; j++) {
            // if 'Filter' button, conditional statement checked against date field being equal to the first column in each record at index 0  
            if (filter == true) {
                // if date search parameter is equal then do the following
                if (new Date(Object.values(ufo)[0]).valueOf() == date.valueOf()) {
                    // assign cell for each row using method insertCell() to insert a new column in the html table (<td>)
                    var cell = row.insertCell();
                    // assign text using html document object model to create a new text node for each object value per column data
                    var text = document.createTextNode(Object.values(ufo)[j]);
                    // method to append a node as the last child of a node passing in text value assigned above
                    // appendChild() moves from its current position to the new position
                    cell.appendChild(text);
                    // change error message variable to false 
                    errormsg = false;
                }
            }
            // if 'Reset' button, conditinal statement checked against date field greater than default date provided (placeholder value in html input tag) 
            else {
                if (new Date(Object.values(ufo)[0]).valueOf() <= date.valueOf()) {
                    var cell = row.insertCell();
                    var text = document.createTextNode(Object.values(ufo)[j]);
                    cell.appendChild(text);
                    errormsg = false;
                }
            }
        }
    }
    // display error message in the console if no data is found after looping through each record above
    if (errormsg == true) {
        console.log(`UFO sightings on ${date} is unavailable`);
    }
}

// function to remove the current html table on display, row by row iteratively except for the column headers
function clearRows() {
    // assign variable using getElementById() method to return the element that has the ID attribute of the html table
    var table = document.getElementById("ufo-table");
    // assign variable to the number of rows displayed in the html page
    var rowCount = table.rows.length;
    // loop through each row on the html table and remove except for the first row (index 0) which are the column headers
    for (var i = 0; i < rowCount - 1; i++) {
        document.getElementById("ufo-table").deleteRow(1);
    }
}

// function to filter data by calling another function passing in search parameter of date criteria entered,
// user clicked filter button and therefore filter flag is set and passed as true within createUFO()
function filterUFO() {
    // assign variable using querySelector() method to return the first element that matches a specified CSS selector in the document
    // these are used to select html elements based on their id, classes, types, attributes, values of attributes, etc.
    var table = document.querySelector("table");
    // assign filter variable of date type to the criteria value entered on the html form
    var dateFilter = new Date(document.getElementById("datetime").value);
    // call function to remove the html table currently on display
    clearRows();
    // call function to append a new table to html page and adds new rows of data for each UFO sighting per date criteria
    createUFO(table, tableData, dateFilter, true);
}

// function to reset data by calling another function passing in all default parameters
// user clicked on reset button and therefore filter flag is set and passed as false within createUFO()
function resetUFO() {
    clearRows();
    var filterForm = document.getElementById("datetime");
    filterForm.value = '';
    var table = document.querySelector("table");
    // assign default variable of date type to the placeholder value specified on the html form for date input
    var dateDefault = new Date(filterForm.placeholder);
    createUFO(table, tableData, dateDefault, false);
}

// call function on application startup to reset all data to default values of tableData assigned from data.js
resetUFO();

// using document object model, attach a click event handler to the specified button elements on the html form
// when the user clicks on the button call the appropriate function specified by passing it as a parameter
document.getElementById("filter-btn").addEventListener("click", filterUFO);
document.getElementById("reset-btn").addEventListener("click", resetUFO);
