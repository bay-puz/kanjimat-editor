document.getElementById("table").addEventListener("click", clickBoard);
document.getElementById("table").oncontextmenu = function() {clickBoard(event, true); return false};
document.getElementById("setSize").addEventListener("click", changeSise);
document.getElementById("showEditUrl").addEventListener("click", function(){showUrl("edit")} );
document.getElementById("showSolveUrl").addEventListener("click", function(){showUrl("solve")} );
document.getElementById("showSolveCheckUrl").addEventListener("click", function(){showUrl("solveCheck")} );
document.getElementById("exchangeButton").addEventListener("click", exchangeLines);

function makeNewBoard(row, column) {
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
    makeNewBoard(newRow, newColumn);
    setHint(hintChar, hintNum, newRow)
    setAnswer(answerChar, answerPart)
}

function showProblem() {
    var params = new URLSearchParams(document.location.search);
    if (!params.has("m") || params.get("m") === "edit") {
        setMode("edit")
    } else {
        setMode("solve")
    }
    if (!params.has("r") || !params.has("c")) {
        makeNewBoard(8, 9);
        return
    }
    const rowInput = parseInt(params.get("r"))
    const columnInput = parseInt(params.get("c"))
    makeNewBoard(rowInput, columnInput);
    const hintChar = params.has("h") ? stringToArray(params.get("h")) : []
    const hintNum = params.has("i") ? stringToArray(params.get("i")) : []
    const answerChar = params.has("j") ? stringToArray(params.get("j")) : []
    const answerPart = params.has("k") ? stringToArray(params.get("k")) : []
    setHint(hintChar, hintNum)
    setAnswer(answerChar, answerPart)
    if(params.has("a")) {
        setAnswerCheck()
    }
}
showProblem();

function setMode(mode) {
    const hiddenClass = (mode === "edit") ? "displaySolveMode" : "displayEditMode"
    var elements = document.getElementsByClassName(hiddenClass);
    for (const element of elements) {
        element.classList.add("hidden")
    }
    if (mode === "edit") {
        document.getElementById("URLErea").setAttribute("open", "")
    }
}

function setAnswerCheck() {
    var elements = document.getElementsByClassName("answerCheck")
    for(const element of elements) {
        element.classList.remove("hidden")
    }
    document.getElementById("solveModeLine").classList.add("withCheck")
}

async function showUrl(mode) {
    var params = new URLSearchParams();
    if (mode === "solve" | mode === "solveCheck") {
        params.append("m", "solve");
    } else {
        params.append("m", "edit")
    }
    const answerChar = getAnswerChar()
    const answerPart = getAnswerPart()
    params.append("r", getTableRow());
    params.append("c", getTableColumn());
    params.append("h", arrayToString(getHintChar()))
    params.append("i", arrayToString(getHintNum()))
    if (mode === "edit") {
        params.append("j", arrayToString(answerChar))
        params.append("k", arrayToString(answerPart))
    }
    if (mode === "solveCheck") {
        if (answerChar.includes("") || answerPart.includes("")) {
            sayInvalid()
        }
        const answerHash = await hashAnswer(answerChar, answerPart)
        params.append("a", answerHash)
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

function clickBoard(event, rightClick = false) {
    var element = document.elementFromPoint(event.pageX, event.pageY);
    var types = []
    if (isProblemMode()) {
        types = rightClick ? ["hintNumber"] : ["hintChar", "hintNumber"]
    } else {
        if (rightClick) {
            return
        }
        types = ["answerChar", "answerPart"]
    }
    for(const type of types) {
        if (element.classList.contains(type)) {
            writeCell(element, type, rightClick);
            return;
        }
        var cellElements = element.getElementsByClassName(type);
        if (cellElements.length > 0) {
            writeCell(cellElements[0], type, rightClick);
            return;
        }
    }
}

function writeCell(element, type, rightClick) {
    if (type === "hintNumber") {
        if (rightClick) {
            downHintNumber(element)
        } else {
            upHintNumber(element)
        }
        return
    }
    var input = prompt()
    writeChar(input, element, type)
    checkAnswer()
}

function isProblemMode() {
    var params = new URLSearchParams(document.location.search);
    if(params.get("m") === "solve") {
        return false
    }
    return document.getElementById("problemInput").checked;
}

function exchangeLines() {
    const exchange1 = Number(document.getElementById("exchange1").value)
    const exchange2 = Number(document.getElementById("exchange2").value)
    if(exchange1 <= 0 || exchange2 <= 0 || exchange1 === exchange2) {
        return
    }

    if(isExchangeRow()) {
        exchangeRow(exchange1, exchange2)
    } else {
        exchangeColumn(exchange1, exchange2)
    }
}

function isExchangeRow() {
    return document.getElementById("exchangeRow").checked;
}

async function checkAnswer() {
    var params = new URLSearchParams(document.location.search);
    if (!params.has("a")) {
        return
    }
    const problemHash = params.get("a")
    const ansewrHash = await hashAnswer(getAnswerChar(), getAnswerPart())
    if(problemHash === ansewrHash) {
        setTimeout(sayCompeleted, 200)
    }
}

function sayCompeleted() {
    alert("正解です！")
}

function sayInvalid() {
    alert("解答が入っていないマスがあります")
}