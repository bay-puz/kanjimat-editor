function getTableHeaderHtml(row) {
    var theadElement = document.createElement("thead");
    var trElement = document.createElement("tr");
    trElement.id = "row0";
    var thElement = document.createElement("th");
    thElement.classList.add("leftProblem");
    trElement.append(thElement);
    thElement = document.createElement("th");
    thElement.classList.add("leftAnswer");
    trElement.append(thElement);
    for (let index = 0; index < row; index++) {
        var tdElement = document.createElement("td");
        tdElement.classList.add("charUp");
        tdElement.append(getAnswerCharHtml());
        trElement.append(tdElement);
    }
    theadElement.append(trElement);
    return theadElement;
}

function getRowHtml(num, row) {
    var trElement = document.createElement("tr");
    trElement.id = "row" + num;

    var thElement = document.createElement("th");
    thElement.classList.add("leftProblem");
    thElement.append(getProblemCharHtml());
    trElement.append(thElement);

    thElement = document.createElement("th");
    thElement.classList.add("leftAnswer");
    thElement.append(getAnswerCharHtml());
    trElement.append(thElement);

    for (let index = 0; index < row; index++) {
        var tdElement = document.createElement("td");
        tdElement.append(getProblemNumberHtml());
        trElement.append(tdElement);
    }
    return trElement;
}

function getAnswerCharHtml() {
    var element = document.createElement("span");
    element.classList.add("answerChar", "char");
    return element;
}

function getProblemCharHtml() {
    var element = document.createElement("span");
    element.classList.add("problemChar", "char");
    return element;
}

function getProblemNumberHtml() {
    var element = document.createElement("span");
    element.classList.add("problemNumber");
    return element;
}

function clickTable(event) {
    var element = document.elementFromPoint(event.pageX, event.pageY);
    if (element.classList.contains("problemNumber")) {
        upProblemNumber(element);
        return;
    }
    if (element.classList.contains("char")) {
        writeChar(element);
        return;
    }
    var cellElements = element.getElementsByClassName("problemNumber");
    if (cellElements.length > 0) {
        upProblemNumber(cellElements[0]);
        return;
    }
    var cellElements = element.getElementsByClassName("char");
    if (cellElements.length > 0) {
        writeChar(cellElements[0]);
        return;
    }
}

function upProblemNumber(element) {
    if (! isProblemMode()) {
        return;
    }
    var number = parseInt(element.innerText);
    if (number) {
        element.innerText = number + 1;
    } else {
        element.innerText = 1;
    }
}

function rightClickTable(event) {
    var element = document.elementFromPoint(event.pageX, event.pageY);
    if (element.classList.contains("problemNumber")) {
        downProblemNumber(element);
        return;
    }
    var cellElements = element.getElementsByClassName("problemNumber");
    for (const cellElement of cellElements) {
        downProblemNumber(cellElement);
        return;
    }
}

function downProblemNumber(element) {
    if (! isProblemMode()) {
        return;
    }
    var number = parseInt(element.innerText);
    if (number) {
        element.innerText = number > 1 ? number - 1: "";
    }
}

function writeChar(element) {
    const char = document.getElementById("inputChar").value;
    className = isProblemMode() ? "problemChar": "answerChar";
    if (! element.classList.contains(className)) {
        return;
    }
    if (element.innerText === char) {
        element.innerText = "";
    } else {
        element.innerText = char;
    }
}

function isProblemMode() {
    return document.getElementById("problemInput").checked;
}