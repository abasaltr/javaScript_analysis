// from data.js
var tableData = data;

// YOUR CODE HERE!
console.log('This is the UFO-level 2 js file - Reza Abasaltian');

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
    var cityFilter = document.getElementById("cityname").value;
    var stateFilter = document.getElementById("stateAbr").value;
    var countryFilter = document.getElementById("countryAbr").value;
    var shapeFilter = document.getElementById("shapename").value;
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
    filterFormDate.value = '';
    var filterFormCity = document.getElementById("cityname");
    filterFormCity.value = '';
    var filterFormState = document.getElementById("stateAbr");
    filterFormState.value = '';
    var filterFormCountry = document.getElementById("countryAbr");
    filterFormCountry.value = '';
    var filterFormShape = document.getElementById("shapename");
    filterFormShape.value = '';
    var table = document.querySelector("table");
    var indexUFO = [];
    for (var i = 0; i < tableData.length; i++) {
        indexUFO.push(i);
    }
    createUFO(table, tableData, indexUFO);
}

resetUFO();

document.getElementById("filter-btn").addEventListener("click", filterUFO);
document.getElementById("reset-btn").addEventListener("click", resetUFO);