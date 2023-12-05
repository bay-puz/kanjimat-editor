document.getElementById("table").addEventListener("click", clickTable);
document.getElementById("table").oncontextmenu = function() {rightClickTable(event); return false};
document.getElementById("setSize").addEventListener("click", changeSise);
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
    var theadElement = createTableHeaderHtml(row);
    var tbodyElement = document.createElement("tbody");
    for (let index = 1; index <= column; index++) {
        tbodyElement.append(createRowHtml(index, row));
    }
    tableElement.append(theadElement, tbodyElement);
};

function changeSise() {
    const newRow = getTableRow()
    const newColumn = getTableColumn()
    const hintChar = getHintChar()
    const answerChar = getAnswerChar()
    const answerPart = getAnswerPart()
    const oldRow = answerPart.length
    const hintNum = getHintNum(oldRow)
    setProblem(newRow, newColumn);
    setHint(hintChar, hintNum, newRow)
    setAnswer(answerChar, answerPart)
}

function showProblem() {
    var params = new URLSearchParams(document.location.search);
    if (!params.has("r") || !params.has("c")) {
        setProblem(8, 9);
        return
    }
    const rowInput = parseInt(params.get("r"))
    const columnInput = parseInt(params.get("c"))
    setProblem(rowInput, columnInput);
    const hintChar = params.has("h") ? stringToArray(params.get("h")) : []
    const hintNum = params.has("i") ? stringToArray(params.get("i")) : []
    const anserChar = params.has("j") ? stringToArray(params.get("j")) : []
    const answerPart = params.has("k") ? stringToArray(params.get("k")) : []
    setHint(hintChar, hintNum)
    setAnswer(anserChar, answerPart)
}
showProblem();

function showUrl(mode) {
    var params = new URLSearchParams();
    if (mode === "solve") {
        params.append("m", mode);
    } else {
        params.append("m", "edit")
    }
    params.append("r", getTableRow());
    params.append("c", getTableColumn());
    params.append("h", arrayToString(getHintChar()))
    params.append("i", arrayToString(getHintNum()))
    if (mode !== "solve") {
        params.append("j", arrayToString(getAnswerChar()))
        params.append("k", arrayToString(getAnswerPart()))
    }
    const url = new URL(location.href)
    url.search = params;

    var urlElement = document.getElementById("showURL")
    urlElement.href = url
    urlElement.innerText = url.toString()
    var detailElement = document.getElementById("URLErea")
    detailElement.open = true
    var lineElement = document.getElementById("URLLine")
    lineElement.classList.remove("hidden")
}

function getTableRow() {
    return parseInt(document.getElementById("setRow").value);
}

function getTableColumn() {
    return parseInt(document.getElementById("setColumn").value);
}