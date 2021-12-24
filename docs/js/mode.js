function setEditMode() {
    var elements = document.getElementsByClassName("displaySolveMode");
    for (const element of elements) {
        element.classList.add("hidden")
    }
}

function setSolveMode() {
    var elements = document.getElementsByClassName("displayEditMode");
    for (const element of elements) {
        element.classList.add("hidden")
    }
}

function setMode() {
    var params = new URLSearchParams(document.location.search);
    if (params.has("m") && params.get("m") === "solve") {
        setSolveMode();
    } else {
        setEditMode();
    }
}
setMode();

function encodeHint() {
    var hintString = ""
    var hintElements = document.getElementsByClassName("problemChar");
    for (const hintElement of hintElements) {
        var hint = hintElement.innerHTML;
        hintString += hint
        hintString += "+"
    }
    var hintElements = document.getElementsByClassName("problemNumber");
    for (const hintElement of hintElements) {
        var hint = hintElement.innerHTML;
        hintString += hint != "" ? hint : "0"
    }
    return hintString
}

function decodeHint(hintString) {
    var count = 0
    var hintElements = document.getElementsByClassName("problemChar");
    for (const hintElement of hintElements) {
        var hint = ""
        while (count < hintString.length) {
            const hintNext = hintString.substring(count, count+1)
            if ( hintNext === "+") {
                break;
            }
            hint += hintNext
            count += 1
        }
        hintElement.innerHTML = hint
        count += 1
    }
    var hintElements = document.getElementsByClassName("problemNumber");
    for (const hintElement of hintElements) {
        const hintNext = parseInt(hintString.substring(count, count+1))
        if (hintNext > 0) {
            hintElement.innerHTML = hintNext
        }
        count += 1
    }
    return
}

function encodeAnswer() {
    var answerString = ""
    var answerElements = document.getElementsByClassName("answerChar");
    for (const answerElement of answerElements) {
        var answer = answerElement.innerHTML;
        answerString += answer
        answerString += "+"
    }
    return answerString
}

function decodeAnswer(answerString) {
    var count = 0
    var answerElements = document.getElementsByClassName("answerChar");
    for (const answerElement of answerElements) {
        var answer = ""
        while (count < answerString.length) {
            const answerNext = answerString.substring(count, count+1)
            if ( answerNext === "+") {
                break;
            }
            answer += answerNext
            count += 1
        }
        answerElement.innerHTML = answer
        count += 1
    }
    return
}