function getTableHeaderHtml(length) {
    var theadElement = document.createElement("thead");
    var trElement = document.createElement("tr");
    var thElement = document.createElement("th");
    thElement.innerText = "";
    trElement.append(thElement);
    for (let index = 0; index < row; index++) {
        var tdElement = document.createElement("td");
        tdElement.append(getInputCharHtml(true));
        trElement.append(tdElement);
    }
    theadElement.append(trElement);
    return theadElement;
}

function getInputRowHtml(num, length) {
    var trElement = document.createElement("tr");
    var thElement = document.createElement("th");
    thElement.append(getInputCharHtml(false), getInputCharHtml(true));
    trElement.append(thElement);
    for (let index = 0; index < row; index++) {
        var tdElement = document.createElement("td");
        tdElement.append(getInputNumberHtml());
        trElement.append(tdElement);
    }
    return trElement;
}

function getInputCharHtml(answer) {
    var inputElement = document.createElement("input");
    if (answer) {
        inputElement.classList.add("answerChar");
    } else {
        inputElement.classList.add("problemChar");
    }
    return inputElement;
}

function getInputNumberHtml() {
    var inputElement = document.createElement("span");
    inputElement.classList.add("problemNumber");
    return inputElement;
}

function clickTable(event) {
    var element = document.elementFromPoint(event.pageX, event.pageY);
    if (element.classList.contains("problemNumber")) {
        upProblemNumber(element);
        return;
    }
    var cellElements = element.getElementsByClassName("problemNumber");
    for (const cellElement of cellElements) {
        upProblemNumber(cellElement);
        return;
    }
}

function upProblemNumber(element) {
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
    var number = parseInt(element.innerText);
    if (number) {
        element.innerText = number > 1 ? number - 1: "";
    }
}