function createTableHeaderHtml(row) {
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
        tdElement.append(createAnswerPartHtml());
        trElement.append(tdElement);
    }
    theadElement.append(trElement);
    return theadElement;
}

function createRowHtml(num, row) {
    var trElement = document.createElement("tr");
    trElement.id = "row" + num;

    var thElement = document.createElement("th");
    thElement.classList.add("leftProblem");
    thElement.append(createHintCharHtml());
    trElement.append(thElement);

    thElement = document.createElement("th");
    thElement.classList.add("leftAnswer");
    thElement.append(createAnswerCharHtml());
    trElement.append(thElement);

    for (let index = 0; index < row; index++) {
        var tdElement = document.createElement("td");
        tdElement.append(createHintNumberHtml());
        trElement.append(tdElement);
    }
    return trElement;
}

function createAnswerCharHtml() {
    var element = document.createElement("span");
    element.classList.add("answerChar", "char");
    return element;
}

function createAnswerPartHtml() {
    var element = document.createElement("span");
    element.classList.add("answerPart", "char");
    return element;
}

function createHintCharHtml() {
    var element = document.createElement("span");
    element.classList.add("hintChar", "char");
    return element;
}

function createHintNumberHtml() {
    var element = document.createElement("span");
    element.classList.add("hintNumber");
    return element;
}