const row = 3;
const column = 5;

function setProblem() {
    var theadElement = getTableHeaderHtml(column);
    var tbodyElement = document.createElement("tbody");
    for (let index = 1; index <= column; index++) {
        tbodyElement.append(getInputRowHtml(index, row));
    }
    var tableElement = document.getElementById("table");
    tableElement.append(theadElement, tbodyElement);
};
setProblem();

document.getElementById("table").addEventListener("click", clickTable);
document.getElementById("table").oncontextmenu = function() {rightClickTable(event); return false};

