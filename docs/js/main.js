var row = 0;
var column = 0;

document.getElementById("table").addEventListener("click", clickTable);
document.getElementById("table").oncontextmenu = function() {rightClickTable(event); return false};
document.getElementById("setSize").addEventListener("click", setSize);

function setProblem() {
    var tableElement = document.getElementById("table");
    if (tableElement.innerText.length > 0) {
        tableElement.innerText = "";
    }
    var theadElement = getTableHeaderHtml(column);
    var tbodyElement = document.createElement("tbody");
    for (let index = 1; index <= column; index++) {
        tbodyElement.append(getRowHtml(index));
    }
    tableElement.append(theadElement, tbodyElement);
};

function setSize() {
    var rowNew = parseInt(document.getElementById("setRow").value);
    var columnNew = parseInt(document.getElementById("setColumn").value);
    if ( rowNew !== row || columnNew !== column ) {
        row = rowNew;
        column = columnNew;
        setProblem();
    }
}

setSize();