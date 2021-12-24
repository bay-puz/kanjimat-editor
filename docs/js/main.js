document.getElementById("table").addEventListener("click", clickTable);
document.getElementById("table").oncontextmenu = function() {rightClickTable(event); return false};
document.getElementById("setSize").addEventListener("click", setSize);
document.getElementById("showEditUrl").addEventListener("click", function(){showUrl("edit")} );
document.getElementById("showSolveUrl").addEventListener("click", function(){showUrl("solve")} );
document.getElementById("showSolveCheckUrl").addEventListener("click", function(){showUrl("solveCheck")} );

function setProblem(row, column) {
    document.getElementById("setRow").value = row;
    document.getElementById("setColumn").value = column;

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

function setSize() {
    setProblem(getTableRow(), getTableColumn());
}

function showProblem() {
    var params = new URLSearchParams(document.location.search);
    if (!params.has("r") || !params.has("c")) {
        setSize();
        return
    }
    const rowInput = parseInt(params.get("r"))
    const columnInput = parseInt(params.get("c"))
    setProblem(rowInput, columnInput);
    if (params.has("p")) {
        decodeHint(params.get("p"));
    }
    if (params.has("a")) {
        decodeAnswer(params.get("a"));
    }
}
showProblem();

function showUrl(mode) {
    var params = new URLSearchParams();
    if (mode === "edit") {
        params.append("m", mode);
    } else {
        params.append("m", "solve")
    }
    params.append("r", getTableRow());
    params.append("c", getTableColumn());
    params.append("p", encodeHint());
    if (mode != "solve") {
        params.append("a", encodeAnswer())
    }
    const url = new URL(location.href)
    url.search = params;
    alert(url)
}

function getTableRow() {
    return parseInt(document.getElementById("setRow").value);
}

function getTableColumn() {
    return parseInt(document.getElementById("setColumn").value);
}