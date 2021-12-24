document.getElementById("table").addEventListener("click", clickTable);
document.getElementById("table").oncontextmenu = function() {rightClickTable(event); return false};
document.getElementById("setSize").addEventListener("click", setSize);

function setProblem(row, column) {
    var tableElement = document.getElementById("table");
    if (tableElement.innerText.length > 0) {
        tableElement.innerText = "";
    }
    var theadElement = getTableHeaderHtml(row);
    var tbodyElement = document.createElement("tbody");
    for (let index = 1; index <= column; index++) {
        tbodyElement.append(getRowHtml(index, row));
    }
    tableElement.append(theadElement, tbodyElement);
};

function showProblem() {
    var params = new URLSearchParams(document.location.search);
    if (!params.has("r") || !params.get("c")) {
        var rowNew = parseInt(document.getElementById("setRow").value);
        var columnNew = parseInt(document.getElementById("setColumn").value);
        setProblem(rowNew, columnNew);
        return
    }
    const rowInput = parseInt(params.get("r"))
    const columnInput = parseInt(params.get("c"))
    setProblem(rowInput, columnInput);
    if (params.has("p")) {
        decodeHint(params.has("p"));
    }
    if (params.has("a")) {
        decodeAnswer(params.has("a"));
    }
}
showProblem();