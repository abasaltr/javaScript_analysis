// from data.js
var tableData = data;

// YOUR CODE HERE!
console.log('This is the UFO-level 2b js file - Reza Abasaltian');

// function that appends a table to html page and adds new rows of data for each UFO sighting per index positions
// Passing parameters are html table, and tableData assigned from data.js,
// Search parameters are the actual index value(s) for each matched record passed in as a single list array - iUFO
function createUFO(table, data, iUFO) {
    // loop through the contents of data based on total index array length and create a new row in html table (<tr>) for each using method insertRow(),
    // assign each iteration of index within actual data record to a new variable as an object type 
    for (var i = 0; i < iUFO.length; i++) {
        var row = table.insertRow();
        var ufo = data[iUFO[i]];
        // loop through each column of the object record and set its values iteratively
        for (var j = 0; j < Object.keys(ufo).length; j++) {
            // assign cell for each row using method insertCell() to insert a new column in the html table (<td>)
            var cell = row.insertCell();
            // assign text using html document object model to create a new text node for each object value per column data
            var text = document.createTextNode(Object.values(ufo)[j]);
            // method to append a node as the last child of a node passing in text value assigned above
            // appendChild() moves from its current position to the new position
            cell.appendChild(text);
        }
    }
}

// function to retrieve data index value(s) as a list array based on passing filter search parameters
// Passing parameters are tableData assigned from data.js
// Search parameters are sighting date filter as date type, and a list array of potential miscellaneous filters
// miscellaneous consists of sighting filters by city, state, country, and/or UFO shape  
function getUFO_index(data, date, misc) {

    // initialize an empty x array used for reducing the misc array passed to corresponding index positions 
    var x = [];
    // initialize a bound tally used for determining how many date and/or misc filters are within the list being passed
    var bound = 0;

    // loop through the contents of misc array and append its corresponding index position to x array
    for (var y = 0; y < 4; y++) {
        if (misc[y] !== "") {
            x.push(y);
        }
    }

    // set bound to the total length of the x array
    bound = x.length;

    // check if date is valid then increment bound by one; non null and not equal to the default date assigned in filterUFO function (1/11/2011)
    // the date value is checked against the default date's hard coded numerical representation '1294725600000'
    if (isNaN(date.valueOf()) == false && date.valueOf() !== 1294725600000) {
        bound = bound + 1;
    }

    // initialize an empty list array used for storing lists of only true and false results stored in a match array
    // this is based on conditional checks for equalness on each filter passed compared to the actual data values (if both are equal then its a true match)    
    var list = []
    // loop through each content of the tableData and determine a match for the filters (either a true or false result)
    for (var i = 0; i < data.length; i++) {

        // assign each iteration of record to a new variable as an object type 
        var ufo = data[i];
        
        // re-initialize match array and all its corresponding filter variables back to false on each iteration
        var match = [];
        var datem = false;
        var citym = false;
        var statem = false;
        var countrym = false;
        var shapem = false;

        // check if the dates are equal then assign its match variable to true
        if (new Date(Object.values(ufo)[0]).valueOf() == date.valueOf()) {
            datem = true;
        }

        // loop through each content of x array which consists of miscellaneous filters index positions,
        // determine comparison match against tableData value then assign its corresponding match variable to true
        for (var j = 0; j < x.length; j++) {
            if (x[j] == 0) {
                if (Object.values(ufo)[1].valueOf() == misc[0]) {
                    citym = true;
                }
            }
            if (x[j] == 1) {
                if (Object.values(ufo)[2].valueOf() == misc[1]) {
                    statem = true;
                }
            }
            if (x[j] == 2) {
                if (Object.values(ufo)[3].valueOf() == misc[2]) {
                    countrym = true;
                }
            }
            if (x[j] == 3) {
                if (Object.values(ufo)[4].valueOf() == misc[3]) {
                    shapem = true;
                }
            }
        }

        // append each iteration index, date and miscellaneous match variables, and total bound tally to match array
        match.push(i, datem, citym, statem, countrym, shapem, bound);
        // append match array to overall list array for each record in the tableData 
        list.push(match);
    }

    // initialize data index array used for storing all index values of matched filtered data based on the overall list array and its bound
    var iUFO = [];

    // loop through each content of list array based on its total length
    for (var i = 0; i < list.length; i++) {
        // convert list array to string and count the occurance for true values
        var trueCount = (Object.values(list)[i]).toString().split("true").length - 1;
        // check if the count of only true values equals list bound tally then append its index to the data index array - iUFO
        if (trueCount == Object.values(list)[i][6]) {
            iUFO.push(Object.values(list)[i][0]);
        }
    }

    // return a full list of only index positions of matched data based on the filtered search parameters passed
    return iUFO;
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

// function to filter data by calling another function passing in search parameter of date and/or misc criteria selected by dropdown options
// retrieve index positions of all matched data in a list array - getUFO_index()
// replace html contents with only filtered datasets on the page in a table format - creatUFO() 
function filterUFO() {
    // assign variable using querySelector() method to return the first element that matches a specified CSS selector in the document
    // these are used to select html elements based on their id, classes, types, attributes, values of attributes, etc.
    var table = document.querySelector("table");
    
    // assign date filter variable of date type to the option selected on the html form
    var dateFilter = new Date(document.getElementById("datetime").value);
    // check if option selected using its placeholder value otherwise set filter to default date (1/11/2011)
    if (dateFilter == "date") {
        dateFilter = "1/11/2011";
    }

    // assign city filter variable of string type to the option selected on the html form
    var cityFilter = document.getElementById("cityname").value;
    // check if option selected using its placeholder value otherwise set filter to an empty string value
    if (cityFilter == "city") {
        cityFilter = "";
    }

    // assign state filter variable of string type to the option selected on the html form
    var stateFilter = document.getElementById("stateAbr").value;
    // check if option selected using its placeholder value otherwise set filter to an empty string value
    if (stateFilter == "state") {
        stateFilter = "";
    }
    
    // assign country filter variable of string type to the option selected on the html form
    var countryFilter = document.getElementById("countryAbr").value;
    // check if option selected using its placeholder value otherwise set filter to an empty string value
    if (countryFilter == "country") {
        countryFilter = "";
    }

    // assign shape filter variable of string type to the option selected on the html form
    var shapeFilter = document.getElementById("shapename").value;
    // check if option selected using its placeholder value otherwise set filter to an empty string value
    if (shapeFilter == "shape") {
        shapeFilter = "";
    }
    
    // assign a miscellaneous filter array list storing contents of the filters above
    var miscFilters = [cityFilter, stateFilter, countryFilter, shapeFilter];

    // call function to remove the html table currently on display
    clearRows();

    // call function to retrieve index positions of all matched data passing in tableData, date and miscellaneous filters
    // assign retrieved result to a list array variable - UFOi
    var UFOi = getUFO_index(tableData, dateFilter, miscFilters);

    // check if the index array length is greater than zero representing only matched dataset to replace the html contents on the page
    if (UFOi.length > 0) {
        // call function to append a new table to html page and adds new rows of data for each UFO sighting per index array list
        createUFO(table, tableData, UFOi);
    }
    // if index length is zero, then there aren't any UFO sightings matched, 
    // output a message on the console and call function to reset html page back to default tableData
    else {
        console.log(`UFO sightings on the filtered search entered is unavailable`);
        // call function to display all tableData since there are zero matching filter selected
        resetUFO();
    }
}

// function to reset data by calling another function passing in all default parameters
// either user clicked on reset button or search options selected on html form from filter function resulted in zero match
function resetUFO() {
    // call function to remove the html table currently on display
    clearRows();
    var filterFormDate = document.getElementById("datetime");
    filterFormDate.value = 'Date';
    var filterFormCity = document.getElementById("cityname");
    filterFormCity.value = 'city';
    var filterFormState = document.getElementById("stateAbr");
    filterFormState.value = 'state';
    var filterFormCountry = document.getElementById("countryAbr");
    filterFormCountry.value = 'country';
    var filterFormShape = document.getElementById("shapename");
    filterFormShape.value = 'shape';
    var table = document.querySelector("table");

    // initialize an index array list used for tableData index positions
    var indexUFO = [];
    for (var i = 0; i < tableData.length; i++) {
        indexUFO.push(i);
    }
    // call function to append a new table to html page and adds new rows of data for each UFO sighting per index positions
    createUFO(table, tableData, indexUFO);
}

// function on application startup to initialize dropdown menu options to placeholder text values,
// calls function that populates each filter criteria with tableData values assigned from data.js 
function initDropList() {

    // initiaize an empty array list for each filter criteria
    date = [];
    city = [];
    state = [];
    country = [];
    shape = [];

    // loop through each tableData content appending its corresponding object values per filter criteria to its array list
    for (var i = 0; i < tableData.length; i++) {
        date.push(Object.values(tableData[i])[0]);
        city.push(Object.values(tableData[i])[1]);
        state.push(Object.values(tableData[i])[2]);
        country.push(Object.values(tableData[i])[3]);
        shape.push(Object.values(tableData[i])[4]);
    }

    // call function to populate the form dropdown menu options for each filter criteria in alphabetical order
    createDropList(date, "Date", "datetime", 1);
    createDropList(city, "city", "cityname", 2);
    createDropList(state, "state", "stateAbr", 3);
    createDropList(country, "country", "countryAbr", 3);
    createDropList(shape, "shape", "shapename", 2);

}

// function to populate the form dropdown menu options for each filter criteria in alphabetical order
// passing parameters include the filter array list, html tag select name (placeholder text string), 
// html tag select id name, and select option type
// the select option type is used for formatting purpose as defined numerical value below:
    // 1. date formatted the same as is retrieved from tableData
    // 2. full text string formatted as first character is in upper case
    // 3. partial text abbreviation string formatted as all characters are in upper case
function createDropList(menu, selectname, idname, sType) {

    // check if option type passed is date or string as defined by its numerical value
    if (sType == 1) {
        // assigned only unique data values of the array list without any duplicates, but unsorted for date options 
        var sort_values = menu.filter((e, i, a) => a.indexOf(e) === i);
    }
    else {
        // assigned only unique data values of the array list without any duplicates, 
        // and sorted alphabetically for string options 
        var sort_values = menu.filter((e, i, a) => a.indexOf(e) === i).sort();
    }

    // define a constant statement to append a string at the beginning of an array list
    // do not modify this value during scripts execution
    // used for adding placeholder value on top of the menu options as default value
    // assign result to list array of data values 
    const addElementToBeginningOfArray = (a, e) => [e, ...a]
    values = addElementToBeginningOfArray(sort_values, selectname);

    // createElement() method creates an Element Node with the specified name.
    // create html select tag assigning name and id to the select parameters passed
    var select = document.createElement("select");
    select.name = selectname;
    select.id = idname;

    // loop through contents of data values to format how its displayed and set its placeholder values as selected
    for (const val of values) {

        // create html option tag that will be appended within the select tag
        var option = document.createElement("option");
        // assign option value to each data value iteratively
        option.value = val;

        // check if option type is date, displayed as is and 
        // option selected is set to true for placeholder text string
        if (sType == 1) {
            option.text = val;
            if (val == selectname) {
                option.selected = true;
            }
        }

        // check if option type is full text string, display initial character in upper case and 
        // option selected is set to true for placeholder text string
        if (sType == 2) {
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            if (val == selectname) {
                option.selected = true;
            }
        }

        // check if option type is partial text string abbreviation, display all characters in upper case and
        // option selected is set to true for placeholder text string
        if (sType == 3) {
            if (val == selectname) {
                option.selected = true;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
            }
            else {
                option.text = val.charAt(0).toUpperCase() + val.charAt(1).toUpperCase();
            }
        }

        // append the html option tag within the html select tag using appendChild() method
        // method to append a node as the last child of a node passing in text value assigned above
        // appendChild() moves from its current position to the new position
        select.appendChild(option);
    }

    // create html label tag assigning name to the select name passed, and id to a concatenated string text
    var label = document.createElement("label");
    label.htmlFor = selectname;
    label.id = selectname + "label";
    
    // insert both html label and select tag including option value to the container of its corresponding form filter
    // the container name is as defined in the html index file within its own div tag id value
    document.getElementById("container" + "-" + selectname).appendChild(label).appendChild(select);
}

// call function on application startup to initialize dropdown menu options to placeholder text values
// further calls another function that populates each filter criteria with tableData values assigned from data.js 
initDropList();
// call function on application startup to reset all data to default values of tableData assigned from data.js
resetUFO();

// using document object model, attach a click event handler to the specified button elements on the html form
// when the user clicks on the button call the appropriate function specified by passing it as a parameter
document.getElementById("filter-btn").addEventListener("click", filterUFO);
document.getElementById("reset-btn").addEventListener("click", resetUFO);