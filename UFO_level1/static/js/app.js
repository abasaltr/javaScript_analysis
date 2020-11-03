// from data.js
var tableData = data;

// YOUR CODE HERE!
console.log('This is my UFO js file - Reza Abasaltian');

// Appends a table to page and then adds new rows of data for each UFO sighting.

function createUFO(table, data, date, filter) {
    var errormsg = true;
    for (var i = 0; i < data.length; i++) {
        var row = table.insertRow();
        var ufo = data[i];
        for (var j = 0; j < Object.keys(ufo).length; j++) {
            if (filter == true) {
                if (new Date(Object.values(ufo)[0]).valueOf() == date.valueOf()) {
                    var cell = row.insertCell();
                    var text = document.createTextNode(Object.values(ufo)[j]);
                    cell.appendChild(text);
                    errormsg = false;
                }
            }
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
    if (errormsg == true) {
        console.log(`UFO sightings on ${date} is unavailable`);
    }
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
    clearRows();
    createUFO(table, tableData, dateFilter, true);
}

function resetUFO() {
    clearRows();
    var filterForm = document.getElementById("datetime");
    filterForm.value = '';
    var table = document.querySelector("table");
    var dateDefault = new Date(filterForm.placeholder);
    createUFO(table, tableData, dateDefault, false);
}

resetUFO();

document.getElementById("filter-btn").addEventListener("click", filterUFO);
document.getElementById("reset-btn").addEventListener("click", resetUFO);
