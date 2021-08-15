function getTableHeaderHtml(length) {
    var theadElement = document.createElement("thead");
    var trElement = document.createElement("tr");
    var thElement = document.createElement("th");
    thElement.innerText = "";
    trElement.append(thElement);
    for (let index = 0; index < 3; index++) {
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
    for (let index = 0; index < 3; index++) {
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
    var inputElement = document.createElement("input");
    inputElement.classList.add("problemNumber");
    inputElement.type = "number";
    inputElement.min = "0";
    return inputElement;
}