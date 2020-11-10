// from data.js
var tableData = data;

// YOUR CODE HERE!
console.log('This is the UFO-level 2b js file - Reza Abasaltian');

// Appends a table to page and then adds new rows of data for each UFO sighting.
function createUFO(table, data, iUFO) {
    for (var i = 0; i < iUFO.length; i++) {
        var row = table.insertRow();
        var ufo = data[iUFO[i]];
        for (var j = 0; j < Object.keys(ufo).length; j++) {
            var cell = row.insertCell();
            var text = document.createTextNode(Object.values(ufo)[j]);
            cell.appendChild(text);
        }
    }
}

function getUFO_index(data, date, misc) {

    var x = [];
    var bound = 0;

    for (var y = 0; y < 4; y++) {
        if (misc[y] !== "") {
            x.push(y);
        }
    }

    bound = x.length;

    if (isNaN(date.valueOf()) == false && date.valueOf() !== 1294725600000) {
        bound = bound + 1;
    }

    var list = []
    for (var i = 0; i < data.length; i++) {
        var ufo = data[i];
        var match = [];
        var datem = false;
        var citym = false;
        var statem = false;
        var countrym = false;
        var shapem = false;

        if (new Date(Object.values(ufo)[0]).valueOf() == date.valueOf()) {
            datem = true;
        }

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

        match.push(i, datem, citym, statem, countrym, shapem, bound);
        list.push(match);
    }

    var iUFO = [];
    for (var i = 0; i < list.length; i++) {
        // convert list array to string and count the occurance for true values
        var trueCount = (Object.values(list)[i]).toString().split("true").length - 1;
        if (trueCount == Object.values(list)[i][6]) {
            iUFO.push(Object.values(list)[i][0]);
        }
    }
    return iUFO;
}

function clearRows() {
    var table = document.getElementById("ufo-table");
    var rowCount = table.rows.length;
    for (var i = 0; i < rowCount - 1; i++) {
        document.getElementById("ufo-table").deleteRow(1);
    }
}

function filterUFO() {
    var table = document.querySelector("table");
    
    var dateFilter = new Date(document.getElementById("datetime").value);
    if (dateFilter == "date") {
        dateFilter = "1/11/2011";
    }

    var cityFilter = document.getElementById("cityname").value;
    if (cityFilter == "city") {
        cityFilter = "";
    }

    var stateFilter = document.getElementById("stateAbr").value;
    if (stateFilter == "state") {
        stateFilter = "";
    }
    
    var countryFilter = document.getElementById("countryAbr").value;
    if (countryFilter == "country") {
        countryFilter = "";
    }

    var shapeFilter = document.getElementById("shapename").value;
    if (shapeFilter == "shape") {
        shapeFilter = "";
    }
    
    
    var miscFilters = [cityFilter, stateFilter, countryFilter, shapeFilter];
    clearRows();
    var UFOi = getUFO_index(tableData, dateFilter, miscFilters);
    if (UFOi.length > 0) {
        createUFO(table, tableData, UFOi);
    }
    else {
        console.log(`UFO sightings on the filtered search entered is unavailable`);
        resetUFO();
    }
}

function resetUFO() {
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
    var indexUFO = [];
    for (var i = 0; i < tableData.length; i++) {
        indexUFO.push(i);
    }
    createUFO(table, tableData, indexUFO);
}

function initDropList() {

    date = [];
    city = [];
    state = [];
    country = [];
    shape = [];

    for (var i = 0; i < tableData.length; i++) {
        date.push(Object.values(tableData[i])[0]);
        city.push(Object.values(tableData[i])[1]);
        state.push(Object.values(tableData[i])[2]);
        country.push(Object.values(tableData[i])[3]);
        shape.push(Object.values(tableData[i])[4]);
    }

    createDropList(date, "Date", "datetime", 1);
    createDropList(city, "city", "cityname", 2);
    createDropList(state, "state", "stateAbr", 3);
    createDropList(country, "country", "countryAbr", 3);
    createDropList(shape, "shape", "shapename", 2);

}

function createDropList(menu, selectname, idname, sType) {

    if (sType == 1) {
        var sort_values = menu.filter((e, i, a) => a.indexOf(e) === i);
    }
    else {
        var sort_values = menu.filter((e, i, a) => a.indexOf(e) === i).sort();
    }

    const addElementToBeginningOfArray = (a, e) => [e, ...a]
    values = addElementToBeginningOfArray(sort_values, selectname);

    var select = document.createElement("select");
    select.name = selectname;
    select.id = idname;

    for (const val of values) {
        var option = document.createElement("option");
        option.value = val;

        if (sType == 1) {
            option.text = val;
            if (val == selectname) {
                option.selected = true;
            }
        }

        if (sType == 2) {
            option.text = val.charAt(0).toUpperCase() + val.slice(1);
            if (val == selectname) {
                option.selected = true;
            }
        }

        if (sType == 3) {
            if (val == selectname) {
                option.selected = true;
                option.text = val.charAt(0).toUpperCase() + val.slice(1);
            }
            else {
                option.text = val.charAt(0).toUpperCase() + val.charAt(1).toUpperCase();
            }
        }

        select.appendChild(option);
    }

    var label = document.createElement("label");
    label.htmlFor = selectname;
    label.id = selectname + "label";

    document.getElementById("container" + "-" + selectname).appendChild(label).appendChild(select);
}


initDropList();
resetUFO();

document.getElementById("filter-btn").addEventListener("click", filterUFO);
document.getElementById("reset-btn").addEventListener("click", resetUFO);